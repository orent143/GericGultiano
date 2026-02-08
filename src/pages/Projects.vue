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
                <div ref="calendar" class="github-calendar"></div>
            </div>
        </div>
        <div class="bottom-section">
            <div class="recent-projects">
                <h1>My Recent Projects <span class="description">List of my top projects</span></h1>
                <ul class="top-project-list">
                    <li v-for="(projects, index) in topProjects" :key="index" class="project-card"
                        :style="projectStyle(projects.image)">
                        <div class="project-info">
                            <a :href="getProjectUrl(projects.liveUrl)" target="_blank" rel="noopener noreferrer"
                                class="project-link">
                                {{ projects.title }}
                            </a>
                            <p class="project-description">{{ projects.description }}</p>
                            <div class="tech-stack">
                                <span v-for="(tech, techIndex) in projects.techStack" :key="techIndex"
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
                                <span class="timeline-lang" v-if="slotProps.item.technology !== 'N/A'">{{ slotProps.item.technology }}</span>
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
import solveItImage from "@/assets/2025-11-27(4).png";
import togethaImage from "@/assets/2025-11-27(3).png";
import CascadeSelect from 'primevue/cascadeselect';
import GitHubCalendar from "github-calendar"
import "github-calendar/dist/github-calendar.css"
import Timeline from 'primevue/timeline';

const repository = ref([]);
const calendar = (ref(null))
const options = ref();


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


const topProjects = ref([
    {
        title: "Solve IT Tech Solutions",
        description: "A responsive landing page for a tech solutions company offering IT services.",
        image: solveItImage,
        liveUrl: "https://solveittechsolutions.vercel.app/",
        techStack: ["HTML", "CSS", "JavaScript", "EmailJS"],
    },
    {
        title: "Togetha - Academic Platform",
        description: "A responsive landing page for an academic platform offering educational resources.",
        image: togethaImage,
        liveUrl: "https://togetha.uic.edu.ph/",
        techStack: ["VueJS", "EmailJS"],
    },
    {
        title: "Cafe Beata",
        description: "A sales and inventory management system for a cafe business.",
        image: "https://placehold.co/600x400/1a1a2e/ef4444?text=Portfolio",
        liveUrl: "#",
        techStack: ["VueJS", "Python-FASTapi", "MySQL"]
    },
]);

const projectStyle = (image) => ({
    backgroundImage: `url('${image}')`,
});

const getProjectUrl = (liveUrl) => {
    return liveUrl;
};

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
    width: 100%;
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
    background-color: rgba(255, 255, 255, 0.068);
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



.github-calendar {
    height: 100%;
    width: 100%;
    background: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}

.github-calendar:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.github-calendar .calendar-graph-header {
    display: none;
}

.github-calendar .js-calendar-graph {
    margin: 0;
}

.github-calendar .ContribColor {
    border-radius: 3px;
    transition: all 0.2s ease;
}

.github-calendar .ContribColor:hover {
    transform: scale(1.2);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.github-calendar .calendar-graph-footer {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #e1e4e8;
}

.github-calendar text {
    color: #333333;
    ;
    font-size: 11px;
}

.github-calendar span {
    color: #666666;
}

.github-calendar a {
    color: #666666;
    text-decoration: none;
    display: none !important;
}

.github-calendar h2 {
    display: none;
}

.github-section {
    margin-top: 50px;
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
    padding: 10px;
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
</style>