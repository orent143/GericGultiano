<template>
    <div class="home-container">
        <div class="detail-container">
            <div class="first-section">
                <div class="experience">
                    <h2>Experience</h2>
                    <p>
                        As a QA Intern at <span class="highlight">Jairosoft Inc.</span>, I
                        performed functional and exploratory testing, authored and managed
                        test cases in Azure Boards, documented reproducible defects, and
                        worked closely with co-interns to verify fixes. This role enhanced
                        my attention to detail and understanding of the software development
                        lifecycle.
                    </p>
                </div>
                <div class="about-me">
                    <h2>About Me</h2>
                    <p>
                        I'm a passionate frontend developer who loves crafting beautiful,
                        functional user interfaces. My journey in tech started with
                        curiosity about how websites work, and it has grown into a deep
                        passion for creating seamless digital experiences. Currently
                        pursuing my BS Information Technology at the University of the
                        Immaculate Conception, I've been honing my skills in frontend
                        development and UI/UX design. I believe in writing clean,
                        maintainable code and creating interfaces that are both beautiful
                        and accessible. When I'm not coding, you can find me exploring new
                        design trends on Dribbble, Pinterest, Behance or learning new
                        technologies to expand my toolkit.
                    </p>
                </div>
            </div>
            <div class="second-section">
                <div class="skills">
                    <h2>Skills / Tech Stack</h2>
                    <ul class="skill-cards">
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>Vue.js</li>
                        <li>Node.js</li>
                        <li>Figma</li>
                    </ul>
                </div>
                <div class="tools-tech">
                    <h2>Tools & Technologies</h2>
                    <ul class="skill-cards">
                        <li>VS Code</li>
                        <li>Git & GitHub</li>
                        <li>Claude AI</li>
                        <li>Azure DevOps</li>
                    </ul>
                </div>
                <div class="help-with">
                    <h2>What I Can Help With?</h2>
                    <ul class="help-cards">
                        <li v-for="(service, index) in services" :key="index">
                            {{ index + 1 }}. {{ service }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="project-container">
            <div class="label">
                <h2>Top Projects</h2>
                <a href="/projects" class="view-more-link">View all projects<ion-icon name="arrow-forward-outline"
                        class="view-icon"></ion-icon></a>
            </div>
            <ul class="project-cards">
                <li v-for="(project, index) in projects" :key="index" class="project-card"
                    :style="getProjectStyle(project.image)">
                    <div class="project-content">
                        <h2>
                            <a :href="getProjectUrl(project.liveUrl)" target="_blank" rel="noopener noreferrer"
                                class="project-link">
                                {{ project.title }}</a>
                        </h2>
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

const services = ref([
    "Building responsive landing pages and web applications",
    "Converting UI designs to code",
    "Improving existing UI/UX",
]);

const projects = ref([
    {
        title: "Solve IT Tech Solutions",
        image: solveItImage,
        liveUrl: "https://solveittechsolutions.vercel.app/",
    },
    {
        title: "Togetha - Academic Platform",
        image: togethaImage,
        liveUrl: "https://togetha.uic.edu.ph/",
    },
    {
        title: "Cafe Beata",
        image: "https://placehold.co/600x400/1a1a2e/ef4444?text=Portfolio",
        liveUrl: "#",
    },
]);
const getProjectStyle = (image) => ({
    backgroundImage: `url('${image}')`,
});

const getProjectUrl = (liveUrl) => {
    return liveUrl;
};
</script>

<style>
.home-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
}

.detail-container {
    display: flex;
}

.first-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-right: 100px;
    background-color: #f3f4f6;
    padding: 20px;
    border-radius: 20px;
}

.experience {
    border-bottom: #bbbaba4f 1px solid;
}

h2 {
    font-family: inter, sans-serif;
    color: #333;
}

p {
    font-family: "inter", sans-serif;
    color: #666666;
    font-size: 15px;
    line-height: 1.6;
}

.second-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #f3f4f6;
    width: 100%;
    padding: 20px;
    border-radius: 20px;
}

.second-section h2 {
    font-size: medium;
}

.skill-cards {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0;
}

.skill-cards li {
    background-color: #ffffff;
    padding: 8px 8px;
    border-radius: 8px;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
    font-size: 13px;
}

.help-cards {
    list-style: none;
    padding: 0;
    font-size: 15px;
    color: #666666;
}

.help-cards li {
    margin-bottom: 6px;
}

.project-container {
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
}

.label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.project-cards {
    list-style: none;
    display: flex;
    gap: 50px;
    padding: 0;
}

.project-cards li {
    background-color: #f3f4f6;
    padding-top: 20px;
    border-radius: 12px;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
    flex: 1;
    text-align: center;
}

.view-more-link {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: "inter", sans-serif;
    font-size: 15px;
    color: #333333;
    text-decoration: none;
    font-weight: 500;
}

.view-icon {
    font-size: 20px;
    color: #333333;
}

.project-card {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 220px;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
}

.project-cards :hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
}

.project-content {
    width: 100%;
    padding: 16px;
    background-color: rgba(255, 255, 255, 0.068);
    backdrop-filter: blur(5px);
}

.project-link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;
}

.project-content h2 {
    color: #eeeeee;
    font-size: 20px;
    font-family: "inter", sans-serif;
    font-weight: 400;
}
</style>
