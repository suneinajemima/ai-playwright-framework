module.exports = [
    {
        testCaseId: 'TC-APA11-001',
        jiraIssue: 'APA-11',
        acceptanceCriteria: ['AC-1'],
        riskLevel: 'High',
        riskScore: 8,
        executionPriority: 'P1',
        reason: 'Required post-login entry point to the Products page; observed as the prerequisite for all product flows.'
    },
    {
        testCaseId: 'TC-APA11-004',
        jiraIssue: 'APA-11',
        acceptanceCriteria: ['AC-4'],
        riskLevel: 'High',
        riskScore: 7,
        executionPriority: 'P1',
        reason: 'Required navigation into product details; failure prevents AC-5 and AC-6 validation.'
    },
    {
        testCaseId: 'TC-APA11-005',
        jiraIssue: 'APA-11',
        acceptanceCriteria: ['AC-5'],
        riskLevel: 'High',
        riskScore: 7,
        executionPriority: 'P1',
        reason: 'Directly validates the required product-details content: name, price, description, and image.'
    },
    {
        testCaseId: 'TC-APA11-006',
        jiraIssue: 'APA-11',
        acceptanceCriteria: ['AC-6'],
        riskLevel: 'Medium',
        riskScore: 6,
        executionPriority: 'P2',
        reason: 'Required return navigation from product details; observed Back to products behavior.'
    },
    {
        testCaseId: 'TC-APA11-003',
        jiraIssue: 'APA-11',
        acceptanceCriteria: ['AC-3'],
        riskLevel: 'Medium',
        riskScore: 5,
        executionPriority: 'P2',
        reason: 'Validates required name, price, and image data for every displayed product.'
    },
    {
        testCaseId: 'TC-APA11-002',
        jiraIssue: 'APA-11',
        acceptanceCriteria: ['AC-2'],
        riskLevel: 'Medium',
        riskScore: 5,
        executionPriority: 'P3',
        reason: 'Confirms available products are displayed; application exploration observed six product cards.'
    },
    {
        testCaseId: 'TC-APA11-007',
        jiraIssue: 'APA-11',
        acceptanceCriteria: ['AC-3', 'AC-4', 'AC-5'],
        riskLevel: 'Medium',
        riskScore: 4,
        executionPriority: 'P4',
        reason: 'Cross-page consistency is useful regression coverage, but Jira does not explicitly require value equality.'
    }
];
