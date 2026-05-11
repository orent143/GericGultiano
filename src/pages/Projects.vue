<template>
    <div class="projects-container">
        <div class="github-section">
            <div class="github-title">
                <h1>GitHub Contributions<span>Contribution activity</span></h1>
            </div>
            <div class="github-table">
                <div class="github-table-title">
                    <h2>GitHub Calendar</h2>
                    <span>Overview of my coding activity</span>
                </div>
                <div ref="calendar" class="github-calendar"></div>
                <div class="github-redirection">
                    <a href="https://github.com/orent143" target="_blank" rel="noopener noreferrer">
                        <ion-icon name="logo-github" class="table-icon"></ion-icon>
                        <h3>Visit my GitHub for more.</h3>
                    </a>
                </div>
            </div>
        </div>
        <div class="bottom-section">
            <div class="recent-projects">
                <div class="projects-header">
                    <h1>My Recent Projects <span class="description">List of my top projects</span></h1>
                    <router-link to="/all-projects" class="view-all-btn">View all <ion-icon
                            name="arrow-forward-outline"></ion-icon></router-link>
                </div>
                <ul class="top-project-list">
                    <li v-for="(project, index) in topProjects" :key="index" class="project-card"
                        :style="projectStyle(project.image_url)">
                        <div class="project-info">
                            <a :href="project.live_url" target="_blank" rel="noopener noreferrer" class="project-link">
                                {{ project.title }}
                            </a>
                            <p class="project-description">{{ project.description }}</p>
                            <div class="tech-stack">
                                <span v-for="(tech, techIndex) in project.tech_stack" :key="techIndex"
                                    class="tech-item">
                                    {{ tech }}
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="github-contributions">
                <h1>GitHub Repository<span>List of my Github Repositories</span></h1>
                <Timeline :value="repository" class="github-timeline" align="left">
                    <template #content="slotProps">
                        <div class="timeline-card">
                            <div class="timeline-card-header">
                                <h4>{{ slotProps.item.title }}</h4>
                                <span class="timeline-lang" v-if="slotProps.item.technology !== 'N/A'">{{
                                    slotProps.item.technology }}</span>
                            </div>
                            <p class="updated-date">
                                {{ slotProps.item.dateUpdated.within24h ? 'Updated' : 'Updated at' }}
                                {{ slotProps.item.dateUpdated.displayTime }}
                            </p>
                        </div>
                    </template>
                </Timeline>
            </div>
        </div>

        <!-- QA & Testing Section -->
        <div class="qa-section">
            <div class="qa-header">
                <h1>Quality Assurance & Testing<span>Testing strategy, test automation, and defect prevention that
                        prevents
                        issues before they reach production</span></h1>
            </div>

            <div class="qa-bento-grid">
                <!-- Case Study 1: Colina Health -->
                <div class="qa-card qa-case-study">
                    <div class="qa-card-header">
                        <div class="qa-card-title-group">
                            <h3>Colina Health App</h3>
                            <p class="qa-subtitle">Overseas Healthcare Platform</p>
                            <span class="role-badge">QA Tester Intern</span>
                        </div>
                    </div>
                    <div class="qa-card-content">
                        <div class="qa-problem-impact">
                            <div class="qa-stat-block">
                                <p class="qa-stat-label">The Challenge</p>
                                <p class="qa-stat-value">Ensuring 100% stable releases for critical healthcare workflows
                                    where
                                    accuracy is vital.</p>
                            </div>
                            <div class="qa-stat-block">
                                <p class="qa-stat-label">The Solution</p>
                                <p class="qa-stat-value">Structured exploratory and E2E testing with strict acceptance
                                    criteria
                                    validation.</p>
                            </div>
                            <div class="qa-stat-block">
                                <p class="qa-stat-label">The Impact</p>
                                <p class="qa-stat-value">Identified and documented reproducible defects with logs and
                                    recordings, enabling faster debugging and preventing production issues.</p>
                            </div>
                        </div>
                    </div>
                    <div class="qa-card-footer">
                        <span class="tech-item">Azure Boards</span>
                        <span class="tech-item">Functional Testing</span>
                    </div>
                </div>

                <!-- Case Study 2: Canteen System -->
                <div class="qa-card qa-case-study">
                    <div class="qa-card-header">
                        <div class="qa-card-title-group">
                            <h3>School Canteen System</h3>
                            <p class="qa-subtitle">Inventory & POS Management</p>
                            <span class="role-badge">QA Analyst</span>
                        </div>
                    </div>
                    <div class="qa-card-content">
                        <div class="qa-problem-impact">
                            <div class="qa-stat-block">
                                <p class="qa-stat-label">The Challenge</p>
                                <p class="qa-stat-value">Validating complex business logic to prevent calculation errors
                                    in
                                    real-time inventory tracking.</p>
                            </div>
                            <div class="qa-stat-block">
                                <p class="qa-stat-label">The Solution</p>
                                <p class="qa-stat-value">Designed manual functional tests and automated test scripts
                                    using
                                    Cypress framework.</p>
                            </div>
                            <div class="qa-stat-block">
                                <p class="qa-stat-label">The Impact</p>
                                <p class="qa-stat-value">Achieved high reliability in system performance and accuracy,
                                    significantly increasing overall test coverage.</p>
                            </div>
                        </div>
                    </div>
                    <div class="qa-card-footer">
                        <span class="tech-item">Cypress</span>
                        <span class="tech-item">Automated Testing</span>
                    </div>
                </div>

                <!-- Core Capabilities -->
                <div class="qa-capabilities">
                    <div class="qa-card-header">
                        <div class="qa-card-icon">
                            <ion-icon name="Construct-outline"></ion-icon>
                        </div>
                        <h3>Testing Expertise</h3>
                    </div>
                    <div class="qa-capabilities-grid">
                        <div class="qa-capability">
                            <p class="qa-capability-label">Testing Methodologies</p>
                            <span class="tech-item">Functional Testing</span>
                            <span class="tech-item">Exploratory Testing</span>
                            <span class="tech-item">E2E Testing</span>
                        </div>
                        <div class="qa-capability">
                            <p class="qa-capability-label">Tools & Frameworks</p>
                            <span class="tech-item">Cypress</span>
                            <span class="tech-item">Postman</span>
                            <span class="tech-item">Azure Boards</span>
                        </div>
                        <div class="qa-capability">
                            <p class="qa-capability-label">Quality Practices</p>
                            <span class="tech-item">Test Case Documentation</span>
                            <span class="tech-item">Bug Reporting & Tracking</span>
                            <span class="tech-item">Agile Collaboration</span>
                        </div>
                    </div>
                </div>

            </div>

            <!-- QA Documentation Gateway -->
            <div class="qa-documentation-gateway">
                <button class="qa-doc-gateway-btn" @click="showQADocumentation = true">
                    <span class="qa-doc-gateway-icon">
                        <ion-icon name="document-outline"></ion-icon>
                    </span>
                    <span class="qa-doc-gateway-text">
                        <strong>Explore Testing Documentation</strong>
                        <span>Test cases, defect reports, E2E testing evidence</span>
                    </span>
                    <ion-icon name="chevron-forward-outline" class="qa-doc-gateway-arrow"></ion-icon>
                </button>
            </div>
            <!-- CTA Section -->
            <div class="qa-cta-card">
                <div class="qa-cta-content">
                    <h3>Ready to elevate your testing strategy?</h3>
                    <p>I bring systematic QA practices that reduce defects, improve reliability, and accelerate release
                        cycles.
                    </p>
                </div>
                <router-link to="/contact" class="qa-cta-btn">Let's talk 
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                </router-link>
            </div>
        </div>
    </div>

    <!-- QA Documentation Modal -->
    <transition name="qa-modal">
        <div v-if="showQADocumentation" class="qa-documentation-modal-overlay" @click="showQADocumentation = false">
            <div class="qa-documentation-modal-content" @click.stop>
                <QADocumentation :isModal="true" @close="showQADocumentation = false" />
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from '@/lib/supabase'
import CascadeSelect from 'primevue/cascadeselect';
import GitHubCalendar from "github-calendar"
import "github-calendar/dist/github-calendar.css"
import Timeline from 'primevue/timeline';
import QADocumentation from '@/components/QADocumentation.vue'

const repository = ref([]);
const calendar = ref(null)
const options = ref();
const topProjects = ref([]);
const showQADocumentation = ref(false);

const fetchProjects = async () => {
    const { data } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })
        .limit(4)
    topProjects.value = data || []
}


const formatUpdatedTime = (dateString) => {
    const now = new Date();
    const updated = new Date(dateString);
    const diffMs = now - updated;

    const diffMins = Math.floor(diffMs / 1000 / 60);
    const diffHours = Math.floor(diffMins / 60);

    if (diffHours < 24) {
        // within 24 hours
        if (diffHours > 0) {
            return { displayTime: `${diffHours} hr${diffHours !== 1 ? 's' : ''} ago`, within24h: true };
        } else {
            return { displayTime: `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`, within24h: true };
        }
    }

    // beyond 24 hours → absolute date
    return {
        displayTime: updated.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }),
        within24h: false
    };
};


const fetchRepositories = async () => {
    try {
        const response = await fetch('https://api.github.com/users/orent143/repos?sort=updated&direction=desc&per_page=30');
        const data = await response.json();
        repository.value = data.map(repo => ({
            title: repo.name,
            technology: repo.language || 'N/A',
            dateUpdated: formatUpdatedTime(repo.updated_at),
            liveUrl: repo.html_url
        })
        )
    } catch (err) {
        console.error('Error fetching repositories:', err);
    }
};
onMounted(() => {
    fetchRepositories();
    fetchProjects();
});


// Projects fetched from DB

const projectStyle = (imageUrl) => ({
    backgroundImage: `url('${imageUrl}')`,
});

onMounted(() => {
    if (!calendar.value) {
        console.error("Calendar element not found.");
        return;
    } else {
        GitHubCalendar(calendar.value, "orent143", {
            responsive: true,
            tooltips: true,
        })
    }
})

</script>

<style>
.projects-container {
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin-top: 20px;
    padding-left: 250px;
    padding-right: 250px;
}

.projects-container h1 {
    font-size: 28px;
    margin-bottom: 20px;
}

.bottom-section {
    display: flex;
    width: 100%;
    gap: 20px;
}

.recent-projects {
    display: flex;
    flex-direction: column;
    width: 75%;
}

.recent-projects h1 {
    display: flex;
    flex-direction: column;
    font-size: 25px;
    font-weight: 550;
    color: #333333;
    gap: 10px;
    margin-bottom: 0;
}

.projects-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.view-all-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 8px;
    background-color: #f3f4f6;
    transition: background-color 0.2s ease;
}

.view-all-btn:hover {
    background-color: #e5e7eb;
}

.recent-projects .description {
    font-size: 14px;
    font-weight: 400;
    color: #666666;
}

.top-project-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 100%;
    width: 100%;

    flex-wrap: wrap;
    gap: 5px;
    padding: 0;
    justify-content: flex-start;
}

.project-card {
    display: flex;
    align-items: flex-end;
    height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding-top: 15px;
    color: #ffffff;
    position: relative;
    overflow: hidden;
}

.project-info {
    background-color: rgba(0, 0, 0, 0.358);
    backdrop-filter: blur(80px);
    padding: 15px;
    width: 100%;
}

.project-link {
    color: #ffffff;
    text-decoration: none;
    font-weight: 400;
    font-size: 16px;
}

.project-description {
    font-size: 13px;
    font-weight: 300;
    margin: 10px 0;
    color: #fff2f2;
}

.tech-stack {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
    font-size: 11px;
}

.tech-item {
    background-color: #ffffff33;
    padding: 5px 10px;
    border-radius: 15px;
    font-weight: 150;
}

.github-table {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    padding: 30px;
    padding-top: 10px;
    border-radius: 8px;
    box-shadow:
        0px 1px 2px 0px rgba(164, 172, 185, 0.24),
        0px 0px 0px 1px rgba(18, 55, 105, 0.08);

}

.github-table-title {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
}

.github-table-title h2 {
    font-size: 20px;
    margin-bottom: 0px;
    font-weight: 550;
    color: #333333;
}

.github-table-title span {
    font-size: 14px;
    font-weight: 400;
    color: #666666;
}

.github-redirection {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}

.github-redirection a {
    color: #333333;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.github-redirection .table-icon {
    color: #666666;
    font-size: 20px;
    transition: 0.3s ease;
}

.github-redirection h3 {
    color: #666666;
    ;
    font-size: 15px;
    font-weight: 400;
    transition: 0.3s ease;
}

.github-redirection a:hover .table-icon {
    color: #020617;
}

.github-redirection a:hover h3 {
    color: #020617;
    font-weight: bold;
}

.github-calendar {
    height: 100%;
    width: 100%;
    background: #ffffff00;
}

.github-calendar .calendar-graph-footer {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #e1e4e8;
}

.github-calendar span {
    color: #666666;
}

.github-calendar .position-relative a {
    color: #666666;
    text-decoration: none;
    display: none !important;
}

.github-calendar .table-column {
    display: none !important;
}


.github-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.github-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.github-title h1 {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 25px;
    font-weight: 550;
    color: #333333;
}

.github-title span {
    font-size: 14px;
    font-weight: 400;
    color: #666666;
}

.github-contributions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 350px;
    max-height: fit-content;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow:
        0px 1px 2px 0px rgba(164, 172, 185, 0.24),
        0px 0px 0px 1px rgba(18, 55, 105, 0.08);
}

.github-contributions .project-link {
    color: #333333;
}

.github-contributions h1 {
    display: flex;
    flex-direction: column;
    font-size: 15px;
    font-weight: 550;
    gap: 5px;
    color: #333333;
}

.github-contributions span {
    font-size: 12px;
    font-weight: 400;
    color: #666666;
}

.github-timeline .p-timeline-event-opposite {
    flex: none;
    position: relative;
    width: auto;
    min-width: 0;
    padding: 0;
    color: transparent;
}

.github-timeline {
    overflow: auto;
    max-height: 500px;
    scrollbar-width: thin;
    scrollbar-color: #d1d5db transparent;
    scroll-behavior: smooth;
}

.github-timeline .p-timeline-event-content {
    padding-bottom: 4px;
}

.github-timeline .p-timeline-event-marker {
    background-color: #3b82f6;
    border: 2px solid #e0e7ff;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.github-timeline .p-timeline-event-connector {
    background-color: #e5e7eb;
}


.timeline-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.timeline-card-header h4 {
    font-size: 13px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
}

.timeline-lang {
    font-size: 10px;
    font-weight: 500;
    color: #6366f1;
    background-color: #eef2ff;
    padding: 2px 8px;
    border-radius: 20px;
}

.updated-date {
    font-size: 11px;
    color: #9ca3af;
    margin-top: 6px;
    margin-bottom: 0;
}

/* ---- QA Section Styles ---- */
.qa-section {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
}

.qa-header {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.qa-header h1 {
    display: flex;
    flex-direction: column;
    font-size: 25px;
    font-weight: 550;
    color: #333333;
    gap: 10px;
    margin-bottom: 0;
}

.qa-header span {
    font-size: 15px;
    font-weight: 400;
    color: #6b7280;
    max-width: 680px;
    line-height: 1.6;
}

.qa-bento-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: auto;
    gap: 16px;
}

.qa-card {
    background-color: #ffffff;
    padding: 28px;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    transition: all 0.2s ease;
}

.qa-card:hover {
    border-color: #d1d5db;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}

.qa-card-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 20px;
}

.qa-card-icon {
    font-size: 22px;
    color: #374151;
    background-color: #f3f4f6;
    padding: 10px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 42px;
    height: 42px;
    flex-shrink: 0;
}

.qa-card h3 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
}

.qa-subtitle {
    font-size: 13px;
    color: #9ca3af;
    margin: 0;
    font-weight: 400;
}

.qa-card-title-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
}

.qa-card-title-group h3 {
    margin: 0;
}

.qa-card-title-group p {
    margin: 0;
}

.role-badge {
    display: inline-block;
    font-size: 11px;
    font-weight: 500;
    color: #047857;
    background-color: #ecfdf5;
    border: 1px solid #d1fae5;
    padding: 5px 11px;
    border-radius: 12px;
    margin-top: 6px;
    width: fit-content;
}

.qa-case-study {
    grid-column: span 1;
}

.qa-case-study .qa-card-content {
    flex: 1;
    margin-bottom: 20px;
}

.qa-problem-impact {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.qa-stat-block {
    padding-bottom: 16px;
    border-bottom: 1px solid #f3f4f6;
}

.qa-stat-block:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.qa-stat-label {
    margin: 0 0 6px 0;
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}

.qa-stat-value {
    margin: 0;
    font-size: 14px;
    color: #374151;
    line-height: 1.5;
    font-weight: 400;
}

.qa-card-footer {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 16px;
    border-top: 1px solid #f3f4f6;
    margin-top: auto;
}

.qa-capabilities {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    color: #1f2937;
    padding: 28px;
    border-radius: 6px;
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    gap: 24px;
    transition: all 0.2s ease;
}

.qa-capabilities:hover {
    border-color: #d1d5db;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}

.qa-capabilities-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    flex: 1;
}

.qa-capability {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 0;
}

.qa-capability:not(:last-child) {
    border-right: 1px solid #f3f4f6;
    padding-right: 28px;
}

.qa-capability-label {
    margin: 0;
    font-size: 11px;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.4px;
}

.qa-capability .tech-item {
    background-color: #f3f4f6;
    color: #374151;
    border: 1px solid #e5e7eb;
    padding: 6px 12px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 12px;
    display: inline-block;
    transition: all 0.2s ease;
    line-height: 1.4;
}

.tech-item {
    background-color: #f3f4f6;
    color: #374151;
    border: 1px solid #e5e7eb;
    padding: 6px 12px;
    border-radius: 14px;
    font-weight: 500;
    font-size: 12px;
    display: inline-block;
    transition: all 0.2s ease;
}

.tech-item:hover {
    background-color: #e5e7eb;
    border-color: #d1d5db;
}

.qa-cta-card {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    color: #1f2937;
    padding: 28px;
    border-radius: 6px;
    grid-column: span 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
    transition: all 0.2s ease;
}

.qa-cta-card:hover {
    border-color: #d1d5db;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}

.qa-cta-content {
    flex: 1;
}

.qa-cta-card h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
}

.qa-cta-card p {
    margin: 0;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.5;
}

.qa-cta-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #1f2937;
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: 500;
    font-size: 14px;
    transition: all 0.2s ease;
    border: 1px solid #1f2937;
    white-space: nowrap;
    flex-shrink: 0;
}

.qa-cta-btn:hover {
    background-color: #374151;
    border-color: #374151;
}

.qa-cta-btn ion-icon {
    font-size: 16px;
}

/* ---- QA Documentation Modal ---- */
.qa-documentation-gateway {
    width: 100%;
    padding: 0;
}

.qa-doc-gateway-btn {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 20px 24px;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
}

.qa-doc-gateway-btn:hover {
    border-color: #d1d5db;
    background-color: #fafbfc;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}

.qa-doc-gateway-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    background-color: #f3f4f6;
    border-radius: 6px;
    font-size: 20px;
    color: #374151;
    flex-shrink: 0;
}

.qa-doc-gateway-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
}

.qa-doc-gateway-text strong {
    font-size: 14px;
    font-weight: 600;
    color: #1f2937;
}

.qa-doc-gateway-text span {
    font-size: 12px;
    color: #6b7280;
    font-weight: 400;
}

.qa-doc-gateway-arrow {
    font-size: 18px;
    color: #d1d5db;
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.qa-doc-gateway-btn:hover .qa-doc-gateway-arrow {
    color: #9ca3af;
    transform: translateX(4px);
}

.qa-documentation-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    padding: 20px;
}

.qa-documentation-modal-content {
    background-color: #ffffff;
    border-radius: 8px;
    max-width: 1200px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 32px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.qa-modal-enter-active,
.qa-modal-leave-active {
    transition: all 0.3s ease;
}

.qa-modal-enter-from {
    opacity: 0;
}

.qa-modal-enter-from .qa-documentation-modal-content {
    transform: scale(0.95);
}

.qa-modal-leave-to {
    opacity: 0;
}

.qa-modal-leave-to .qa-documentation-modal-content {
    transform: scale(0.95);
}


/* ---- Responsive ---- */
@media (max-width: 1024px) {
    .projects-container {
        padding-left: 40px;
        padding-right: 40px;
    }

    .qa-capabilities-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
    }

    .qa-capability:not(:last-child) {
        padding-right: 24px;
    }
}

@media (max-width: 768px) {
    .projects-container {
        padding-left: 20px;
        padding-right: 20px;
    }

    .qa-bento-grid {
        grid-template-columns: 1fr;
    }

    .qa-capabilities {
        grid-column: 1;
        grid-row: auto;
    }

    .qa-capabilities-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .qa-capability:not(:last-child) {
        border-right: none;
        padding-right: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #f3f4f6;
    }

    .qa-capability:nth-child(3) {
        grid-column: 1 / -1;
    }

    .qa-cta-card {
        grid-column: 1 / -1;
        flex-direction: column;
        text-align: left;
        gap: 20px;
        align-items: flex-start;
    }

    .qa-cta-btn {
        align-self: flex-start;
    }

    .qa-doc-gateway-btn {
        padding: 16px 20px;
        gap: 12px;
    }

    .qa-doc-gateway-text strong {
        font-size: 13px;
    }

    .qa-doc-gateway-text span {
        font-size: 11px;
    }

    .qa-documentation-modal-content {
        padding: 24px;
        max-height: 85vh;
        border-radius: 12px;
    }

    .qa-header h1 {
        font-size: 22px;
    }

    .qa-header span {
        font-size: 14px;
    }

    .bottom-section {
        flex-direction: column;
    }

    .recent-projects {
        width: 100%;
    }

    .top-project-list {
        grid-template-columns: 1fr;
    }

    .github-contributions {
        width: 100%;
    }

    .github-title {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .github-calendar {
        overflow-x: auto;
    }
}

@media (max-width: 480px) {
    .qa-header h1 {
        font-size: 20px;
    }

    .qa-card {
        padding: 20px;
    }

    .qa-card-header {
        gap: 10px;
        margin-bottom: 16px;
    }

    .qa-card h3 {
        font-size: 15px;
    }

    .qa-stat-label {
        font-size: 11px;
    }

    .qa-stat-value {
        font-size: 13px;
    }

    .tech-item {
        font-size: 11px;
        padding: 5px 10px;
    }

    .qa-capabilities {
        padding: 20px;
        gap: 18px;
    }

    .qa-capabilities-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .qa-capability:not(:last-child) {
        border-right: none;
        padding-right: 0;
        padding-bottom: 16px;
        border-bottom: 1px solid #f3f4f6;
    }

    .qa-capability-label {
        font-size: 10px;
    }

    .qa-cta-card {
        padding: 20px;
    }

    .qa-cta-card h3 {
        font-size: 16px;
    }

    .qa-cta-card p {
        font-size: 13px;
    }

    .qa-cta-btn {
        padding: 9px 16px;
        font-size: 13px;
        width: 100%;
        justify-content: center;
    }

    .qa-doc-gateway-btn {
        padding: 14px 16px;
        gap: 10px;
    }

    .qa-doc-gateway-icon {
        min-width: 36px;
        height: 36px;
        font-size: 18px;
    }

    .qa-doc-gateway-text strong {
        font-size: 12px;
    }

    .qa-doc-gateway-text span {
        font-size: 10px;
    }

    .qa-documentation-modal-content {
        padding: 16px;
        max-height: 95vh;
    }
}
</style>