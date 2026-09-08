# AI Test Engineer — Repository Instructions

## Project

This repository implements an AI-powered test engineering platform.

The platform will integrate:

* JavaScript
* Node.js
* Playwright
* GitHub Copilot
* Model Context Protocol (MCP)
* Jira
* GitHub
* GitHub Actions

## Target Workflow

The eventual workflow is:

Jira requirement
→ AI analysis
→ test-case generation
→ Jira test-case storage
→ Playwright automation generation
→ GitHub repository
→ GitHub Actions execution
→ AI result analysis
→ Jira execution update
→ Jira defect creation when appropriate.

## Source of Truth

Jira is the source of truth for:

* Requirements
* User stories
* Acceptance criteria
* Test cases
* Test execution information
* Defects

GitHub is the source of truth for:

* Automation code
* Framework code
* Configuration
* CI/CD workflows
* Documentation

Do not create local JSON files as the primary source of test cases.

## Technology

Use JavaScript and Node.js.

Use Playwright Test for browser and API automation.

Do not convert the project to TypeScript unless explicitly requested.

## Playwright Standards

Prefer user-facing locators:

* getByRole()
* getByLabel()
* getByText()
* getByPlaceholder()
* getByTestId()

Avoid brittle XPath and implementation-dependent selectors.

Do not use page.waitForTimeout() unless there is a documented technical reason.

Use Playwright fixtures for reusable setup.

Use Page Objects when they improve maintainability.

Capture trace, screenshot and video evidence for failures where appropriate.

## MCP Architecture

MCP integrations will eventually include:

* Atlassian Jira MCP
* GitHub MCP
* Playwright MCP

MCP should be used to provide controlled access to external systems.

Do not duplicate Jira, GitHub or Playwright MCP functionality inside the framework unless there is a clear architectural reason.

## AI Architecture

AI functionality should be modular.

Potential AI capabilities include:

* Requirement analysis
* Test-case generation
* Test automation generation
* Failure analysis
* Locator analysis
* Flaky-test detection
* Risk-based test selection
* Execution summarization

AI-generated output must be treated as a recommendation unless explicitly approved.

## Safety

Never expose credentials, API tokens or secrets in source code.

Never commit .env files.

Do not allow AI to automatically merge code into main.

Prefer:

AI generation
→ feature branch
→ Pull Request
→ CI validation
→ human approval
→ merge.

## Development Principles

* Keep modules focused.
* Avoid unnecessary abstraction.
* Prefer readable JavaScript.
* Use async/await.
* Avoid duplicated logic.
* Add tests for framework functionality.
* Explain architectural changes before implementing large changes.

## Git Conventions

Use meaningful commits.

Examples:

feat: add Jira requirement retrieval

feat: add AI test case generator

feat: add Playwright automation generator

feat: add GitHub workflow integration

feat: add AI failure analyzer

docs: update architecture documentation
