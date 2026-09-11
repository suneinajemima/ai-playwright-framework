---
description: Run the AI Test Engineer workflow for a Jira issue
agent: agent
---

# AI Test Engineer

Run the complete AI Test Engineering workflow for the Jira issue provided by the user.

The user's input is:

${input:issueKey:Enter Jira issue key, e.g. APA-1}

Follow the workflow defined in:

[AI Test Engineering Workflow](../../ai/prompts/test-engineering-workflow.md)

## Execution Rules

- Use Atlassian Rovo MCP for Jira operations.
- Use Playwright MCP only for application exploration and browser automation.
- Use GitHub MCP for GitHub operations.
- Jira is the source of truth for requirements and acceptance criteria.
- Do not invent requirements.
- Maintain traceability from requirement → acceptance criterion → test case → automation → result → defect.
- Do not modify Jira without explicit user approval.
- Do not create defects without evidence of a genuine product failure.
- Use JavaScript and Playwright for automation.
- Follow the existing project architecture and `copilot-instructions.md`.

## Execution Strategy

Execute the workflow in phases:

1. Retrieve the Jira requirement.
2. Generate test cases.
3. Validate test cases against acceptance criteria.
4. Identify assumptions and duplicates.
5. Optimize the test suite.
6. Present the optimized test suite for user approval.
7. After approval, store approved test cases in Jira.
8. Obtain the application URL before Playwright exploration.
9. Explore the application using Playwright MCP.
10. Generate Playwright automation.
11. Execute the tests.
12. Analyze failures.
13. Create/update Jira defects only when appropriate.
14. Create a GitHub feature branch and Pull Request for automation changes.

Stop and ask the user for approval whenever the workflow reaches a point requiring Jira modification or other consequential external changes.

## Expected User Experience

The user should be able to invoke this prompt with:

`APA-1`

or another Jira issue key.

Do not require the user to manually paste the detailed workflow instructions.