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
    </div>
</template>

<script setup>
import { ref } from "vue";
import solveItImage from "@/assets/2025-11-27(4).png";
import togethaImage from "@/assets/2025-11-27(3).png";

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
    font-family: inter , sans-serif;
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
</style>