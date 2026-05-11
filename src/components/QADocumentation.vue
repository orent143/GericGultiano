<template>
    <div class="qa-documentation">
        <div class="qa-doc-header">
            <div class="qa-doc-title-group">
                <div class="qa-title">
                    <h2>QA Documentation & Testing Artifacts</h2>
                    <div class="qa-doc-title-disclaimer">
                        <ion-icon name="information-circle-outline" class="qa-doc-title-icon"></ion-icon>
                            <p class="qa-doc-header-disclaimer-title">On-going development</p>
                    </div>
                </div>
                <p class="qa-doc-subtitle">Structured testing deliverables, defect reports, and quality assurance
                    evidence</p>
            </div>
            <button v-if="isModal" class="qa-doc-close-btn" @click="closeDocumentation">
                <ion-icon name="close-outline"></ion-icon>
            </button>
        </div>

        <div class="qa-doc-privacy-disclaimer">
            <ion-icon name="information-circle-outline" class="qa-doc-disclaimer-icon"></ion-icon>
            <div class="qa-doc-disclaimer-content">
                <p class="qa-doc-disclaimer-title">Data Privacy Notice</p>
                <p class="qa-doc-disclaimer-text">All project data and artifacts shown are anonymized and de-identified
                    samples for privacy compliance. Real client information, credentials, and sensitive details have
                    been removed.</p>
            </div>
        </div>

        <div class="qa-doc-controls">
            <div class="qa-doc-filters">
                <button v-for="category in categories" :key="category"
                    :class="['qa-filter-btn', { active: activeFilter === category }]" @click="activeFilter = category">
                    {{ category }}
                </button>
            </div>
            <div class="qa-doc-search">
                <ion-icon name="search-outline" class="search-icon"></ion-icon>
                <input v-model="searchQuery" type="text" placeholder="Search documentation..."
                    class="qa-doc-search-input" />
            </div>
        </div>

        <div class="qa-doc-stats">
            <div class="qa-stat">
                <span class="qa-stat-value">{{ filteredDocuments.length }}</span>
                <span class="qa-stat-label">Documents</span>
            </div>
            <div class="qa-stat">
                <span class="qa-stat-value">{{ passRate }}%</span>
                <span class="qa-stat-label">Pass Rate</span>
            </div>
            <div class="qa-stat">
                <span class="qa-stat-value">{{ criticalIssues }}</span>
                <span class="qa-stat-label">Critical Issues</span>
            </div>
            <div class="qa-stat">
                <span class="qa-stat-value">{{ projectsCovered }}</span>
                <span class="qa-stat-label">Projects Covered</span>
            </div>
        </div>

        <div v-if="filteredDocuments.length > 0" class="qa-doc-grid">
            <QADocumentCard v-for="doc in filteredDocuments" :key="doc.id" :document="doc"
                @click="selectedDocument = doc" />
        </div>

        <div v-else class="qa-doc-empty">
            <ion-icon name="document-outline" class="empty-icon"></ion-icon>
            <p>No documents match your search.</p>
        </div>

        <transition name="qa-slide">
            <div v-if="selectedDocument" class="qa-doc-detail-overlay" @click="selectedDocument = null">
                <div class="qa-doc-detail-modal" @click.stop>
                    <div class="qa-doc-detail-header">
                        <div>
                            <span class="qa-doc-detail-category">{{ selectedDocument.category }}</span>
                            <h3>{{ selectedDocument.title }}</h3>
                        </div>
                        <button class="qa-doc-detail-close" @click="selectedDocument = null">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>

                    <div class="qa-doc-detail-content">
                        <div class="qa-doc-detail-section">
                            <h4>Project</h4>
                            <p>{{ selectedDocument.project }}</p>
                        </div>

                        <div class="qa-doc-detail-section">
                            <h4>Scope</h4>
                            <p>{{ selectedDocument.scope }}</p>
                        </div>

                        <div class="qa-doc-detail-section">
                            <h4>Summary</h4>
                            <p>{{ selectedDocument.summary }}</p>
                        </div>

                        <div class="qa-doc-detail-metadata">
                            <div class="qa-metadata-item">
                                <span class="qa-metadata-label">Execution Date</span>
                                <span class="qa-metadata-value">{{ formatDate(selectedDocument.executionDate) }}</span>
                            </div>
                            <div class="qa-metadata-item">
                                <span class="qa-metadata-label">Status</span>
                                <span :class="['qa-status-badge', selectedDocument.status.toLowerCase()]">
                                    {{ selectedDocument.status }}
                                </span>
                            </div>
                            <div class="qa-metadata-item">
                                <span class="qa-metadata-label">Tools Used</span>
                                <div class="qa-tools-list">
                                    <span v-for="tool in selectedDocument.tools" :key="tool" class="qa-tool-tag">
                                        {{ tool }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div v-if="selectedDocument.severity" class="qa-doc-detail-section">
                            <h4>Severity</h4>
                            <span :class="['qa-severity-badge', selectedDocument.severity.toLowerCase()]">
                                {{ selectedDocument.severity }}
                            </span>
                        </div>

                        <div v-if="selectedDocument.attachments && selectedDocument.attachments.length"
                            class="qa-doc-detail-section">
                            <h4>Attachments</h4>
                            <div class="qa-attachments-list">
                                <a v-for="attachment in selectedDocument.attachments" :key="attachment.name"
                                    class="qa-attachment-item" href="#">
                                    <ion-icon name="document-attach-outline"></ion-icon>
                                    {{ attachment.name }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import QADocumentCard from './QADocumentCard.vue'

const props = defineProps({
    isModal: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close'])

const activeFilter = ref('All')
const searchQuery = ref('')
const selectedDocument = ref(null)

const categories = ['All', 'Test Case', 'Bug Report', 'E2E Testing', 'UAT', 'Regression', 'API Testing', 'Test Plan']

// Sample QA documents (this would be replaced with API data)
const qaDocuments = [
    {
        id: 1,
        title: 'Finance Dashboard - User Authentication E2E Test Suite',
        category: 'E2E Testing',
        project: 'Enterprise Finance Platform',
        scope: 'User login flows, SSO integration, multi-factor authentication, session management',
        summary: 'Comprehensive end-to-end testing of authentication workflows including OAuth integration, password reset flows, and MFA challenges. All critical paths validated across browsers.',
        executionDate: '2025-11-15',
        status: 'Pass',
        tools: ['Cypress', 'GitHub Actions'],
        severity: null,
        attachments: [
            { name: 'e2e-auth-report.pdf', url: '#' },
            { name: 'test-execution-logs.txt', url: '#' }
        ]
    },
    {
        id: 2,
        title: 'Inventory Management - Stock Calculation Bug Report',
        category: 'Bug Report',
        project: 'Warehouse Management System',
        scope: 'Real-time inventory tracking, stock level calculations, quantity updates',
        summary: 'Identified critical issue in inventory calculation logic during concurrent updates. Stock levels were not properly synchronized when multiple users updated inventory simultaneously. Root cause: database concurrency constraint violation.',
        executionDate: '2025-10-22',
        status: 'Resolved',
        tools: ['Postman', 'Jira'],
        severity: 'Critical',
        attachments: [
            { name: 'bug-reproduction-steps.md', url: '#' },
            { name: 'error-logs.png', url: '#' },
            { name: 'database-trace.zip', url: '#' }
        ]
    },
    {
        id: 3,
        title: 'Payment Gateway Integration - End-to-End UAT',
        category: 'UAT',
        project: 'SaaS Billing Platform',
        scope: 'Payment processing, transaction settlement, refund workflows, reconciliation reporting',
        summary: 'User acceptance testing for payment module including credit card processing, bank transfer handling, refunds, and daily settlement verification. All business requirements and acceptance criteria verified.',
        executionDate: '2025-11-08',
        status: 'Pass',
        tools: ['Manual Testing', 'Jira'],
        severity: null,
        attachments: [
            { name: 'uat-sign-off.xlsx', url: '#' },
            { name: 'stakeholder-approval.pdf', url: '#' }
        ]
    },
    {
        id: 4,
        title: 'REST API - Authentication & Authorization Test Cases',
        category: 'Test Case',
        project: 'Microservices Backend',
        scope: 'API authentication, JWT token validation, role-based access control, permission enforcement',
        summary: 'Comprehensive test cases for API authentication layer including valid/invalid tokens, expired credentials, scope validation, and permission-denied scenarios across all endpoints.',
        executionDate: '2025-11-10',
        status: 'Pass',
        tools: ['Postman', 'Newman'],
        severity: null,
        attachments: [
            { name: 'api-test-cases.json', url: '#' },
            { name: 'postman-collection.json', url: '#' }
        ]
    },
    {
        id: 5,
        title: 'Product Release v2.3.0 - Regression Test Suite',
        category: 'Regression',
        project: 'SaaS Analytics Dashboard',
        scope: 'Core dashboard functionality, report generation, data visualization, export features',
        summary: 'Regression testing following v2.3.0 release including all existing features, UI updates, and new chart components. Tested data accuracy, report calculations, and export functionality.',
        executionDate: '2025-11-05',
        status: 'Pass',
        tools: ['Cypress', 'GitHub Actions'],
        severity: null,
        attachments: [
            { name: 'regression-results.html', url: '#' },
            { name: 'test-summary.md', url: '#' }
        ]
    },
    {
        id: 6,
        title: 'Search Service - Load & Performance Testing',
        category: 'API Testing',
        project: 'E-Commerce Platform',
        scope: 'Database query performance, API response times, concurrent user load, search indexing',
        summary: 'Performance testing of search API endpoints under load including 5000+ concurrent users, large result sets, and complex filter combinations. Identified query optimization opportunities.',
        executionDate: '2025-11-12',
        status: 'Pass',
        tools: ['k6', 'DataDog'],
        severity: null,
        attachments: [
            { name: 'performance-metrics.csv', url: '#' },
            { name: 'load-test-report.pdf', url: '#' }
        ]
    },
    {
        id: 7,
        title: 'Mobile App - Responsive Design Testing',
        category: 'Test Case',
        project: 'Cross-Platform Mobile App',
        scope: 'iOS and Android compatibility, responsive layouts, touch interactions, device-specific features',
        summary: 'Testing mobile application across iOS (Safari) and Android (Chrome) including touch interactions, layout responsiveness, and performance on 3G connections. Validated accessibility features.',
        executionDate: '2025-10-28',
        status: 'Pass',
        tools: ['Manual Testing', 'BrowserStack'],
        severity: null,
        attachments: [
            { name: 'mobile-testing-report.pdf', url: '#' },
            { name: 'device-matrix.xlsx', url: '#' }
        ]
    },
    {
        id: 8,
        title: 'Data Privacy - Compliance & Security Test Plan',
        category: 'Test Plan',
        project: 'Secure Data Platform',
        scope: 'Data encryption, access control, audit logging, regulatory compliance, data residency',
        summary: 'Comprehensive test plan for security and compliance requirements including data encryption validation, role-based access enforcement, audit trail verification, and regulatory compliance checks.',
        executionDate: '2025-11-01',
        status: 'In Progress',
        tools: ['Manual Testing', 'Security Scanner'],
        severity: null,
        attachments: [
            { name: 'security-test-plan.md', url: '#' },
            { name: 'compliance-checklist.md', url: '#' }
        ]
    }
]

const filteredDocuments = computed(() => {
    let result = qaDocuments

    if (activeFilter.value !== 'All') {
        result = result.filter(doc => doc.category === activeFilter.value)
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(doc =>
            doc.title.toLowerCase().includes(query) ||
            doc.project.toLowerCase().includes(query) ||
            doc.scope.toLowerCase().includes(query)
        )
    }

    return result
})

const passRate = computed(() => {
    const passed = qaDocuments.filter(doc => doc.status === 'Pass').length
    return Math.round((passed / qaDocuments.length) * 100)
})

const criticalIssues = computed(() => {
    return qaDocuments.filter(doc => doc.severity === 'Critical').length
})

const projectsCovered = computed(() => {
    const projects = new Set(qaDocuments.map(doc => doc.project))
    return projects.size
})

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-US', options)
}

const closeDocumentation = () => {
    emit('close')
}
</script>

<style scoped>
.qa-documentation {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
}

.qa-doc-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
}

.qa-doc-title-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.qa-title {
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
}

.qa-doc-header h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #1f2937;
}

.qa-doc-title-disclaimer {
    display: flex;
    align-items: flex-start;
    gap: 5px;
    padding: 10px 12px;
    background-color: #fef3c7;
    border: 1px solid #fcd34d;
    border-radius: 6px;
    margin-top: 8px;
}

.qa-doc-title-icon {
    font-size: 18px;
    color: #b45309;
    flex-shrink: 0;
    margin-top: 2px;
}


.qa-doc-header-disclaimer-title {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    color: #b45309;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}
.qa-doc-subtitle {
    margin: 0;
    font-size: 14px;
    color: #6b7280;
    font-weight: 400;
}

.qa-doc-privacy-disclaimer {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 14px;
    background-color: #f0f9ff;
    border: 1px solid #bfdbfe;
    border-radius: 6px;
    margin-top: 8px;
}

.qa-doc-disclaimer-icon {
    font-size: 18px;
    color: #0369a1;
    flex-shrink: 0;
    margin-top: 2px;
}

.qa-doc-disclaimer-content {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.qa-doc-disclaimer-title {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    color: #0369a1;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}

.qa-doc-disclaimer-text {
    margin: 4px 0 0 0;
    font-size: 12px;
    color: #0c4a6e;
    line-height: 1.4;
    font-weight: 400;
}

.qa-doc-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background-color: transparent;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 20px;
}

.qa-doc-close-btn:hover {
    border-color: #d1d5db;
    background-color: #f9fafb;
    color: #374151;
}

.qa-doc-controls {
    display: flex;
    gap: 24px;
    align-items: center;
}

.qa-doc-filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.qa-filter-btn {
    padding: 8px 14px;
    border: 1px solid #e5e7eb;
    border-radius: 5px;
    background-color: #ffffff;
    color: #6b7280;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.qa-filter-btn:hover {
    border-color: #d1d5db;
    background-color: #f9fafb;
    color: #374151;
}

.qa-filter-btn.active {
    background-color: #1f2937;
    color: #ffffff;
    border-color: #1f2937;
}

.qa-doc-search {
    display: flex;
    align-items: center;
    flex: 1;
    max-width: 300px;
    position: relative;
}

.search-icon {
    position: absolute;
    left: 12px;
    font-size: 18px;
    color: #9ca3af;
    pointer-events: none;
}

.qa-doc-search-input {
    width: 100%;
    padding: 8px 12px 8px 36px;
    border: 1px solid #e5e7eb;
    border-radius: 5px;
    font-size: 14px;
    background-color: transparent;
    transition: all 0.2s ease;
}

.qa-doc-search-input:focus {
    outline: none;
    border-color: #d1d5db;
    box-shadow: 0 0 0 3px rgba(31, 41, 55, 0.05);
    background-color: transparent;
}

.qa-doc-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background-color: #fafbfc;
}

.qa-stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: center;
}

.qa-stat-value {
    font-size: 20px;
    font-weight: 700;
    color: #1f2937;
}

.qa-stat-label {
    font-size: 12px;
    color: #6b7280;
    font-weight: 500;
}

.qa-doc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
}

.qa-doc-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
    color: #9ca3af;
}

.empty-icon {
    font-size: 48px;
    margin-bottom: 12px;
    opacity: 0.5;
}

.qa-doc-detail-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.qa-doc-detail-modal {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.qa-doc-detail-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    padding: 24px;
    border-bottom: 1px solid #f3f4f6;
    position: sticky;
    top: 0;
    background-color: #ffffff;
}

.qa-doc-detail-header h3 {
    margin: 4px 0 0 0;
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
}

.qa-doc-detail-category {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    color: #6366f1;
    background-color: #eef2ff;
    padding: 4px 10px;
    border-radius: 12px;
    margin-bottom: 8px;
}

.qa-doc-detail-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background-color: transparent;
    color: #6b7280;
    cursor: pointer;
    font-size: 20px;
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.qa-doc-detail-close:hover {
    color: #1f2937;
    background-color: #f3f4f6;
    border-radius: 6px;
}

.qa-doc-detail-content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.qa-doc-detail-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.qa-doc-detail-section h4 {
    margin: 0;
    font-size: 12px;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.4px;
}

.qa-doc-detail-section p {
    margin: 0;
    font-size: 14px;
    color: #374151;
    line-height: 1.5;
}

.qa-doc-detail-metadata {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    padding: 16px;
    background-color: #fafbfc;
    border-radius: 6px;
}

.qa-metadata-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.qa-metadata-label {
    font-size: 11px;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}

.qa-metadata-value {
    font-size: 14px;
    color: #1f2937;
    font-weight: 500;
}

.qa-status-badge,
.qa-severity-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    width: fit-content;
}

.qa-status-badge.pass {
    background-color: #dcfce7;
    color: #166534;
}

.qa-status-badge.resolved {
    background-color: #dbeafe;
    color: #1e40af;
}

.qa-status-badge.in\ progress {
    background-color: #fef3c7;
    color: #92400e;
}

.qa-severity-badge.critical {
    background-color: #fee2e2;
    color: #991b1b;
}

.qa-severity-badge.high {
    background-color: #fed7aa;
    color: #92400e;
}

.qa-tools-list {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.qa-tool-tag {
    display: inline-block;
    padding: 4px 10px;
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    font-size: 12px;
    color: #374151;
}

.qa-attachments-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.qa-attachment-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background-color: #fafbfc;
    color: #374151;
    text-decoration: none;
    font-size: 13px;
    transition: all 0.2s ease;
}

.qa-attachment-item:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
    color: #1f2937;
}

.qa-attachment-item ion-icon {
    font-size: 16px;
}

/* Transition animations */
.qa-slide-enter-active,
.qa-slide-leave-active {
    transition: all 0.3s ease;
}

.qa-slide-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.qa-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

/* Responsive */
@media (max-width: 768px) {
    .qa-documentation {
        gap: 16px;
    }

    .qa-doc-header {
        flex-direction: column;
    }

    .qa-doc-controls {
        flex-direction: column;
        gap: 12px;
    }

    .qa-doc-filters {
        width: 100%;
    }

    .qa-doc-search {
        max-width: none;
    }

    .qa-doc-stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .qa-doc-grid {
        grid-template-columns: 1fr;
    }

    .qa-doc-detail-overlay {
        padding: 10px;
    }

    .qa-doc-detail-modal {
        border-radius: 12px;
    }

    .qa-doc-detail-metadata {
        grid-template-columns: 1fr;
    }

    .qa-doc-detail-header {
        padding: 16px;
    }

    .qa-doc-detail-content {
        padding: 16px;
    }
}

@media (max-width: 480px) {
    .qa-doc-header h2 {
        font-size: 20px;
    }

    .qa-doc-filters {
        gap: 6px;
    }

    .qa-filter-btn {
        padding: 6px 12px;
        font-size: 11px;
    }

    .qa-doc-stats {
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        padding: 12px;
    }

    .qa-stat-value {
        font-size: 18px;
    }

    .qa-stat-label {
        font-size: 11px;
    }
}
</style>
