---
description: Run the AI Test Engineer workflow for a Jira issue
agent: agent
---

# AI Test Engineer

Run the complete AI Test Engineering Workflow for the Jira issue provided below.

Issue Key:
${input:issueKey:Enter Jira issue key, e.g. APA-1}

Follow the workflow defined in:

[AI Test Engineering Workflow](../../ai/prompts/test-engineering-workflow.md)

## Mandatory Rules

1. Use **Atlassian Rovo MCP** to retrieve the Jira issue.
2. Jira is the source of truth for the requirement and acceptance criteria.
3. Retrieve the **Application URL from Jira** before application exploration.
4. If the Application URL is missing, ask the user for it and pause the workflow.
5. Never guess or infer the Application URL.
6. Use **Playwright MCP** to explore and validate the actual application.
7. Generate test cases only after understanding both:
   - Jira requirements
   - Actual application behavior
8. Maintain traceability:

   Jira Issue
   → Acceptance Criterion
   → Test Case
   → Application Flow
   → Playwright Automation

9. Do not invent application behavior, locators, error messages, navigation,
   or expected results.
10. Use **JavaScript/CommonJS + Playwright** for automation.
11. Validate generated code before execution.
12. Run Playwright tests and analyze failures.
13. Use **GitHub MCP** for GitHub operations.
14. Create a feature branch and Pull Request targeting `main`.
15. Do not merge the Pull Request unless explicitly authorized by the user.
16. Do not modify Jira test cases or create Jira defects without explicit
    user approval.
17. Do not report the workflow as complete while known automation defects
    remain unresolved.

Execute the workflow phase by phase and provide a final completion report
including requirement coverage, application URL, test cases, automation,
test results, failures, GitHub branch, PR, CI status, assumptions, and
blocked scenarios.