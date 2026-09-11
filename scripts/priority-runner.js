const { execFileSync, spawnSync } = require('child_process');
const path = require('path');

const priorities = ['P1', 'P2', 'P3', 'P4'];
const riskMetadata = require(path.resolve(__dirname, '../config/test-risk'));

function getPlaywrightCommand() {
    return process.platform === 'win32' ? 'npx.cmd' : 'npx';
}

function getShellOption() {
    return process.platform === 'win32' ? process.env.ComSpec : false;
}

function getListedTests() {
    const output = execFileSync(
        getPlaywrightCommand(),
        ['playwright', 'test', '--list', '--reporter=json'],
        { encoding: 'utf8', shell: getShellOption() }
    );
    const jsonStart = output.indexOf('{');
    const jsonEnd = output.lastIndexOf('}');

    if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('Could not parse Playwright test list output.');
    }

    const listing = JSON.parse(output.slice(jsonStart, jsonEnd + 1));
    const tests = [];

    function collectSuites(suites) {
        for (const suite of suites || []) {
            for (const spec of suite.specs || []) {
                tests.push({
                    title: [...(suite.title ? [suite.title] : []), spec.title].join(' '),
                    file: suite.file,
                    line: spec.line
                });
            }
            collectSuites(suite.suites);
        }
    }

    collectSuites(listing.suites);
    return tests;
}

function formatTest(test) {
    return `${test.title} (${test.file}:${test.line})`;
}

function runPriorityGroup(priority, entries) {
    console.log(`\n${priority}`);
    if (entries.length === 0) {
        console.log('Empty');
        return 0;
    }

    for (const entry of entries) {
        console.log(`- ${entry.testCaseId}: ${entry.matchedTest.title}`);
    }

    let groupExitCode = 0;

    for (const entry of entries) {
        const grep = entry.testCaseId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        console.log(`Running ${priority} ${entry.testCaseId} with --grep /${grep}/ and one worker`);
        const result = spawnSync(
            getPlaywrightCommand(),
            ['playwright', 'test', '--grep', grep, '--workers=1'],
            { stdio: 'inherit', env: process.env, shell: getShellOption() }
        );

        const exitCode = result.status === null ? 1 : result.status;
        if (groupExitCode === 0 && exitCode !== 0) {
            groupExitCode = exitCode;
        }
    }

    console.log(`${priority} result: ${groupExitCode === 0 ? 'passed' : `failed (exit code ${groupExitCode})`}`);
    return groupExitCode;
}

function main() {
    const listedTests = getListedTests();
    const mappedEntries = riskMetadata.map((metadata) => ({
        ...metadata,
        matchedTest: listedTests.find((test) => test.title.includes(metadata.testCaseId))
    }));
    const unmappedTests = listedTests.filter(
        (test) => !riskMetadata.some((metadata) => test.title.includes(metadata.testCaseId))
    );
    const groups = Object.fromEntries(
        priorities.map((priority) => [
            priority,
            mappedEntries.filter((entry) => entry.executionPriority === priority && entry.matchedTest)
        ])
    );

    console.log('Risk-based Playwright execution');
    console.log(`Total discovered tests: ${listedTests.length}`);
    console.log(`Mapped tests: ${mappedEntries.filter((entry) => entry.matchedTest).length}`);
    console.log(`Unmapped tests: ${unmappedTests.length}`);
    console.log('\nExecution order: P1 -> P2 -> P3 -> P4');

    for (const priority of priorities) {
        console.log(`${priority} tests: ${groups[priority].length}`);
    }

    console.log('\nUnmapped tests');
    if (unmappedTests.length === 0) {
        console.log('None');
    } else {
        for (const test of unmappedTests) {
            console.log(`- ${formatTest(test)}`);
        }
    }

    let firstFailure = 0;
    for (const priority of priorities) {
        const exitCode = runPriorityGroup(priority, groups[priority]);
        if (firstFailure === 0 && exitCode !== 0) {
            firstFailure = exitCode;
        }
    }

    process.exitCode = firstFailure;
}

main();
