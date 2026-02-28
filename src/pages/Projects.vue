<template>
    <div class="projects-container">
        <div class="github-section">
            <div class="github-title">
                <h1>GitHub Contributions<span>Contribution activity</span></h1>
                <div class="options">
                    <CascadeSelect v-model="options" :options="moreOptions" optionLabel="aname" optionGroupLabel="name"
                        :optionGroupChildren="['accounts']" class="w-56" placeholder=" See Options" />
                </div>
            </div>
            <div class="github-table">
                <div class="github-table-title">
                    <h2>GitHub Calendar</h2>
                    <span>Overview of my coding activity</span>
                </div>
                <div ref="calendar" class="github-calendar"></div>
                <div class="github-redirection">
                        <a href="https://github.com/orent143" target="_blank" rel="noopener noreferrer" >
                            <ion-icon name="logo-github" class="table-icon"></ion-icon><h3>Visit my GitHub for more.</h3>
                        </a>
                </div>
            </div>
        </div>
        <div class="bottom-section">
            <div class="recent-projects">
                <div class="projects-header">
                    <h1>My Recent Projects <span class="description">List of my top projects</span></h1>
                    <router-link to="/all-projects" class="view-all-btn">View all <ion-icon name="arrow-forward-outline"></ion-icon></router-link>
                </div>
                <ul class="top-project-list">
                    <li v-for="(project, index) in topProjects" :key="index" class="project-card"
                        :style="projectStyle(project.image_url)">
                        <div class="project-info">
                            <a :href="project.live_url" target="_blank" rel="noopener noreferrer"
                                class="project-link">
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
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from '@/lib/supabase'
import CascadeSelect from 'primevue/cascadeselect';
import GitHubCalendar from "github-calendar"
import "github-calendar/dist/github-calendar.css"
import Timeline from 'primevue/timeline';

const repository = ref([]);
const calendar = ref(null)
const options = ref();
const topProjects = ref([]);

const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(4)
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

const moreOptions = ref([
    {
        name: 'Github',
        accounts: [
            { aname: 'Orent143' },
            { aname: 'gericgultiano' }
        ]
    },
    {
        name: 'LinkedIn',
        accounts: [
            { aname: 'geric-gultiano' },
            { aname: 'gericdev' }
        ]
    }
]);


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
    max-height: fit-content;
    max-width: fit-content;
    flex-wrap: wrap;
    gap: 5px;
    padding: 0;
    justify-content: flex-start;
}

.project-card {
    display: flex;
    align-items: flex-end;
    height: 20%;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
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
    color: #666666;;
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

/* ---- Responsive ---- */
@media (max-width: 1024px) {
  .projects-container {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 768px) {
  .projects-container {
    padding-left: 20px;
    padding-right: 20px;
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
</style>