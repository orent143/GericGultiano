<template>
    <div class="home-container">
        <div class="detail-container">
            <div class="first-section">
                <div class="experience">
                    <h2>Experience</h2>
                    <p>
                        Currently a QA & Dev Intern at <span class="highlight">Jairosoft Inc.</span>, I perform
                        functional and exploratory testing, author and manage test cases in Azure Boards, document
                        reproducible defects, and collaborate closely with co-interns to verify fixes. In addition to
                        quality assurance responsibilities, I contribute to development tasks, further strengthening my
                        understanding of the software development lifecycle. This role has enhanced my attention to
                        detail, problem-solving skills, and cross-functional collaboration within an agile environment.
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
                        development and UI/UX design.
                    </p>
                    <p>
                        I believe in writing clean,
                        maintainable code and creating interfaces that are both beautiful
                        and accessible. When I'm not coding, you can find me exploring new
                        design trends on Dribbble, Pinterest, Behance or learning new
                        technologies to expand my toolkit.
                    </p>
                </div>
            </div>
            <div class="second-section">
                <div class="epereience-skills">
                    <h2>Personal Experiences</h2>
                    <Timeline :value="experiences" class="custom-timeline">
                        <template #content="slotProps">
                            <div class="timeline-content">
                                <h4>{{ slotProps.item.title }}</h4>
                                <p>{{ slotProps.item.description }}</p>
                            </div>
                            <p class="exp-date">{{ slotProps.item.date }}</p>
                        </template>
                    </Timeline>
                </div>

            </div>
        </div>
        <div class="project-container">
            <div class="label">
                <h2>Live Projects</h2>
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
import taskwaveImage from "@/assets/taskwave.png"
import Timeline from 'primevue/timeline';

const experiences = ref([
    {
        title: "QA Intern",
        description: "Jairosoft Inc.",
        date: "2026",
    },
    {
        title: "Frontend Developer",
        description: "Togetha App - Capstone Project.",
        date: "2025",
    },
    {
        title: "First Experience as a Full-Stack Developer ",
        description: "Cafe Beata - Sales and Inventory Management System.",
        date: "2024",
    },
    {
        title: "QA Automation tester ",
        description: "School Canteen Management System.",
        date: "2023",
    },
    {
        title: "BS Information Technology",
        description: "University of the Immaculate Conception.",
        date: "2022",
    },
    {
        title: "Hello World",
        description: "Wrote my first line of code using cmd prompt.",
        date: "2020",
    },
])

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
        title: "TaskWave",
        image: taskwaveImage,
        liveUrl: "https://jairo-demo-task.bubbleapps.io/version-test/dashboard?",
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
    padding-left: 250px;
    padding-right: 250px;
}

.detail-container {
    display: flex;
    gap: 20px;
}

.first-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 0 0 45%;
    background-color: #f3f4f6;
    padding: 20px;
    max-height: fit-content;
    border-radius: 20px;
    box-shadow: 0px 1px 2px 0px rgba(164, 172, 185, 0.24), 0px 0px 0px 1px rgba(18, 55, 105, 0.08);
}

.experience {
    border-bottom: #bbbaba4f 1px solid;
}

h2 {
    font-size: 25px;
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-weight: 550;
    color: #333333;
}

p {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    color: #666666;
    font-size: 15px;
    line-height: 1.6;
}

.second-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    background-color: #f3f4f6;
    padding: 20px;
    max-height: fit-content;
    border-radius: 20px;
    box-shadow: 0px 1px 2px 0px rgba(164, 172, 185, 0.24), 0px 0px 0px 1px rgba(18, 55, 105, 0.08);
}

.second-section h2 {
    font-size: medium;
}

.custom-timeline .p-timeline-event-opposite {
    flex: none;
    position: relative;
    width: auto;
    min-width: 0;
    padding: 0;
    color: #f5f5f5;
}

.p-timeline-event-content {
    display: flex;
}

.custom-timeline .p-timeline-event-connector {
    background-color: #d1d5db;
    /* line color */
    width: 2px;
    /* thickness */
}

.custom-timeline .p-timeline-event-marker {
    background-color: #3b82f6;
    border: 2px solid #e0e7ff;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.timeline-content h4 {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    font-weight: 400;
    color: #666666;
    margin: 0;
}

.timeline-content p {
    font-size: 12px;
    width: 90%;
    color: #999999;
    margin-top: 4px;
}

.exp-date {
    display: flex-start;
    font-size: 12px;
    color: #999999;
    margin-left: 10px;
    position: absolute;
    bottom: 8px;
    right: 0px;
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
    background-color: rgba(4, 4, 4, 0.248);
    backdrop-filter: blur(20px);
}

.project-link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;
}

.project-content a {
    color: #ffffff;
    font-size: 18px;
    font-family: "archivo", sans-serif;
    font-weight: 400;
}

/* ---- Responsive ---- */
@media (max-width: 1024px) {
    .home-container {
        padding-left: 40px;
        padding-right: 40px;
    }

    .first-section {
        margin-right: 40px;
    }
}

@media (max-width: 768px) {
    .home-container {
        padding-left: 20px;
        padding-right: 20px;
    }

    .detail-container {
        flex-direction: column;
        gap: 20px;
    }

    .first-section {
        width: 100%;
    }

    .second-section {
        width: 100%;
    }

    .project-cards {
        flex-direction: column;
        gap: 20px;
    }

    .project-card {
        min-height: 180px;
    }

    .label {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
}
</style>
