<template>
    <div class="skills-container">
        <h1>Tools & Skills</h1>
        <div class="tools-section">
            <div class="tools-list">
                <h2>Tools</h2>
                <ul>
                    <li v-for="tool in tools" :key="tool.name">
                        <img :src="tool.icon" :alt="tool.name" class="tool-icon" />
                        <span>{{ tool.name }}</span>
                    </li>
                </ul>
            </div>
            <div class="skills-list">
                <h2>Skills</h2>
                <ul>
                    <li v-for="skill in skills" :key="skill.name">
                        <img :src="skill.icon" :alt="skill.name" class="skill-icon" />
                        <span>{{ skill.name }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <h1>Education & Certifications</h1>
        <div class="education-section">
            <div class="education-list">
                <h2>Education</h2>
                <ul>
                    <li v-for="education in education" class="education-item">
                        <h3><ion-icon name="school-outline" class="education-icon"></ion-icon>{{ education.degree }}</h3>

                        <span class="education-sub-item">
                            {{ education.school }}
                            ({{ education.period }})
                        </span>
                    </li>
                </ul>
            </div>
            <div class="achievements-list">
                <h2>Certifications</h2>
                <ul>
                    <li v-for="certification in certifications" class="certification-item">
                        <h3>{{ certification.title }}</h3>
                        <span class="certification-sub-item">
                            {{ certification.issuer }}
                            ({{ certification.date }})
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import vsCodeIcon from "@/assets/vscode.png";
import gitHubIcon from "@/assets/github.png";
import claudeAIIcon from "@/assets/claude.png";
import azureIcon from "@/assets/azure.png";

import htmlIcon from "@/assets/html.png";
import cssIcon from "@/assets/css.png";
import jsIcon from "@/assets/js.png";
import vueIcon from "@/assets/vue.png";
import nodeIcon from "@/assets/node.png";
import figmaIcon from "@/assets/figma.png";

const tools = ref([
    {
        name: "VS Code",
        icon: vsCodeIcon,
    },
    {
        name: "Git & GitHub",
        icon: gitHubIcon,
    },
    {
        name: "Claude AI",
        icon: claudeAIIcon,
    },
    {
        name: "Azure DevOps",
        icon: azureIcon,
    }
])

const skills = ref([
    {
        name: "HTML",
        icon: htmlIcon,
    },
    {
        name: "CSS",
        icon: cssIcon,
    },
    {
        name: "JavaScript",
        icon: jsIcon,
    },
    {
        name: "Vue.js",
        icon: vueIcon,
    },
    {
        name: "Node.js",
        icon: nodeIcon,
    },
    {
        name: "Figma",
        icon: figmaIcon,
    }
])

const education = ref([
    {
        degree: "Bachelor of Science in Information Technology",
        school: "University of the Immaculate Conception",
        period: "2022 - Present",
    },
    {
        degree: "Senior High School",
        school: "AMA Computer College of Davao",
        period: "2020 - 2022",
    },
    {
        degree: "Junior High School",
        school: "Jose Maria College Foundation, Inc.",
        period: "2016-2020",
    },
]);

const certifications = ref([
    {
        title: "Front-End Web Developer Nanodegree",
        issuer: "Udacity",
        date: "2023",
    },
    {
        title: "JavaScript Algorithms and Data Structures",
        issuer: "freeCodeCamp",
        date: "2022",
    },
]);
</script>

<style>
.skills-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}
.skills-container h1 {
    font-size: 25px;
    font-family: "inter", sans-serif;
    font-weight: 550;
    color: #333333;
}
.tools-section {
    display: flex;
    gap: 100px;
    margin-bottom: 40px;
    width: 100%;
}
.tools-list {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.tools-list h2 {
    font-family: "inter", sans-serif;
    font-size: 18px;
    font-weight: 600;
}
.tools-list ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 40px;
}
.tools-list li {
    display: flex;
    align-items: center;
    background-color:#f9f9f9;
    backdrop-filter: blur(10px);
    padding: 10px 10px;
    border-radius: 8px;
    font-weight: 600;
    color: #333333;
    font-size: 14px;
    box-shadow: 2px 2px 6px rgba(172, 172, 172, 0.1);
}
.tool-icon {
    width: 40px;
    height: 40px;
    margin-right: 8px;
}
.skills-list {
    display: flex;
    align-items: center;
    flex-direction: column;
}
.skills-list h2 {
    font-family: "inter", sans-serif;
    font-size: 18px;
    font-weight: 600;
}
.skills-list ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 40px;
}
.skills-list li {
    display: flex;
    align-items: center;
    background-color:#f9f9f9;
    backdrop-filter: blur(10px);
    padding: 10px 10px;
    border-radius: 8px;
    font-weight: 600;
    color: #333333;
    font-size: 14px;
    box-shadow: 2px 2px 6px rgba(172, 172, 172, 0.1);
}
.skill-icon {
    width: 40px;
    height: 40px;
    margin-right: 8px;
}
.education-section {
    display: flex;
    padding: 20px;
}
.education-icon {
    font-size: 20px;
    margin-right: 10px;
}
.education-list, .achievements-list {
    flex: 1;
    margin: 0 20px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;    
}
.education-list h2, .achievements-list h2 {
    font-family: "inter", sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 10px;
}
.education-list ul, .achievements-list ul {
    list-style: none;
    padding: 0;
}
.education-item, .certification-item {
    margin-bottom: 15px;
    font-size: 16px;
    color: #444444;
    border-left: 5px solid #e0e0e0;
    padding-left: 15px;
}
.education-sub-item, .certification-sub-item {
    font-size: 14px;
    color: #666666;
}

</style>