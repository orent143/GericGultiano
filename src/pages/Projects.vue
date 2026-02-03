<template>
    <div class="projects-container">
        <div class="recent-projects">
            <h1>My Recent Projects</h1>
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
                            <span v-for="(tech, techIndex) in projects.techStack" :key="techIndex" class="tech-item">
                                {{ tech }}
                            </span>
                        </div>
                    </div>
                </li>
            </ul>

        </div>
        <div class="github-section">
            <div class="github-title">
                <h1>Explore more on my Github<span>List of my Github Repositories</span></h1>
                <div class="options">
                    <CascadeSelect v-model="selectedCity" :options="countries" optionLabel="cname"
                        optionGroupLabel="name" :optionGroupChildren="['states', 'cities']" class="w-56"
                        placeholder="Select a City" />
                </div>
            </div>
            <div class="github-table">
            </div>
        </div>
    </div>
    \
</template>

<script setup>
import { ref, onMounted } from "vue";
import solveItImage from "@/assets/2025-11-27(4).png";
import togethaImage from "@/assets/2025-11-27(3).png";
import CascadeSelect from 'primevue/cascadeselect';

const selectedCity = ref();
const countries = ref([
    {
        name: 'Australia',
        code: 'AU',
        states: [
            {
                name: 'New South Wales',
                cities: [
                    { cname: 'Sydney', code: 'A-SY' },
                    { cname: 'Newcastle', code: 'A-NE' },
                    { cname: 'Wollongong', code: 'A-WO' }
                ]
            },
            {
                name: 'Queensland',
                cities: [
                    { cname: 'Brisbane', code: 'A-BR' },
                    { cname: 'Townsville', code: 'A-TO' }
                ]
            }
        ]
    },
    {
        name: 'Canada',
        code: 'CA',
        states: [
            {
                name: 'Quebec',
                cities: [
                    { cname: 'Montreal', code: 'C-MO' },
                    { cname: 'Quebec City', code: 'C-QU' }
                ]
            },
            {
                name: 'Ontario',
                cities: [
                    { cname: 'Ottawa', code: 'C-OT' },
                    { cname: 'Toronto', code: 'C-TO' }
                ]
            }
        ]
    },
    {
        name: 'United States',
        code: 'US',
        states: [
            {
                name: 'California',
                cities: [
                    { cname: 'Los Angeles', code: 'US-LA' },
                    { cname: 'San Diego', code: 'US-SD' },
                    { cname: 'San Francisco', code: 'US-SF' }
                ]
            },
            {
                name: 'Florida',
                cities: [
                    { cname: 'Jacksonville', code: 'US-JA' },
                    { cname: 'Miami', code: 'US-MI' },
                    { cname: 'Tampa', code: 'US-TA' },
                    { cname: 'Orlando', code: 'US-OR' }
                ]
            },
            {
                name: 'Texas',
                cities: [
                    { cname: 'Austin', code: 'US-AU' },
                    { cname: 'Dallas', code: 'US-DA' },
                    { cname: 'Houston', code: 'US-HO' }
                ]
            }
        ]
    }
]);


const selectedValue = ref(null);

onMounted(() => {
    NodeService.getTreeNodes().then((data) => (nodes.value = data));
});


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
</script>

<style>
.projects-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    padding-left: 250px;
    padding-right: 250px;
}

.projects-container h1 {
    font-size: 28px;
    margin-bottom: 20px;
}

.recent-projects {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.recent-projects h1 {
    font-size: 25px;
    font-family: inter, sans-serif;
    font-weight: 550;
    color: #333333;
}

.top-project-list {
    list-style: none;
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 70px;
}

.project-card {
    width: 350px;
    height: 450px;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: flex-end;
    padding-top: 15px;
    color: #ffffff;
    position: relative;
    overflow: hidden;
}

.project-info {
    background-color: rgba(255, 255, 255, 0.068);
    backdrop-filter: blur(80px);
    padding: 30px;
    width: 100%;
}

.project-link {
    color: #ffffff;
    text-decoration: none;
    font-weight: 400;
    font-size: 18px;
}

.project-description {
    font-size: 14px;
    margin: 10px 0;
    color: #fff2f2;
}

.tech-stack {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
    font-size: 13px;
}

.tech-item {
    background-color: #ffffff33;
    padding: 5px 10px;
    border-radius: 15px;
    font-weight: 250;
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
    font-size: 25px;
    font-weight: 550;
    color: #333333;
}
</style>