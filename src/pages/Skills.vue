<template>
    <div class="skills-container">
        <h1>Tools & Skills</h1>
        <div class="tools-section">
            <div class="tools-list">
                <label class="tool-label">
                    <h2>Current Tools & Technologies</h2>
                </label>
                <ul class="tools-ul">
                    <li v-for="tool in tools" :key="tool.name">
                        <img :src="tool.icon" :alt="tool.name" class="tool-icon" />
                        <span>{{ tool.name }}</span>
                    </li>
                </ul>
            </div>
            <div class="learning-list">
                <label class="learning-label">
                    <h2>Currently Learning</h2>
                </label>

                <ul class="learning-ul">
                    <div class="learning-overlay">
                        <ProgressBar mode="indeterminate" style="height: 6px" class="skill-progress"
                            :showValue="false" />
                    </div>
                    <li v-for="learningItem in learning" :key="learningItem.name">
                        <img :src="learningItem.icon" :alt="learningItem.name" class="learning-icon" />
                        <span>{{ learningItem.name }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <h1>Experiences</h1>
        <h1>Education & Certifications</h1>
        <div class="education-section">
            <div class="education-list">
                <h2>Education <span>List of my educational attainments</span></h2>
                <ul>
                    <li v-for="education in education" class="education-item">
                        <h3>
                            <ion-icon name="school-outline" class="education-icon"></ion-icon>{{ education.degree }}
                        </h3>

                        <span class="education-sub-item">
                            {{ education.school }}
                            ({{ education.period }})
                        </span>
                    </li>
                </ul>
            </div>
            <div class="achievements-list">
                <div class="achievements-title">
                    <h2>Certifications <span>List of my certificates</span></h2>
                    <a href="/Certificates" class="view-more"><ion-icon name="chevron-forward-outline"></ion-icon>View more</a>
                </div>
                <ul>
                    <li v-for="certification in certifications" class="certification-item">
                        <h3><ion-icon name="trophy-outline"></ion-icon>{{ certification.title }}</h3>
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
import fastApiIcon from "@/assets/fastapi.webp";
import ProgressBar from "primevue/progressbar";
import vsCodeIcon from "@/assets/vscode.png";
import gitHubIcon from "@/assets/github.png";
import mySQLIcon from "@/assets/mysql.png";
import htmlIcon from "@/assets/html.png";
import cssIcon from "@/assets/css.png";
import jsIcon from "@/assets/js.png";
import supabaseIcon from "@/assets/supabase.webp";
import awsIcon from "@/assets/aws.webp";
import postgreIcon from "@/assets/postgres.png";
import bubbleIcon from "@/assets/bubble.png";
import electronIcon from "@/assets/electron.webp";
import reactIcon from "@/assets/react.webp";
import vueIcon from "@/assets/vue.png";
import nodeIcon from "@/assets/node.png";
import figmaIcon from "@/assets/figma.png";
import azureIcon from "@/assets/azure.png";
import claudeAIIcon from "@/assets/claude.png";
import cypressIcon from "@/assets/cypress.webp";

const tools = ref([
    { name: "VS Code", icon: vsCodeIcon },
    { name: "Git & GitHub", icon: gitHubIcon },
    { name: "Claude AI", icon: claudeAIIcon },
    { name: "Azure Boards", icon: azureIcon },
    { name: "HTML", icon: htmlIcon },
    { name: "CSS", icon: cssIcon },
    { name: "JavaScript", icon: jsIcon },
    { name: "Vue.js", icon: vueIcon },
    { name: "FastAPI", icon: fastApiIcon },
    { name: "MySQL", icon: mySQLIcon },
    { name: "Cypress", icon: cypressIcon },
    { name: "Node.js", icon: nodeIcon },
    { name: "Figma", icon: figmaIcon },
]);

const learning = ref([
    { name: "React.js", icon: reactIcon },
    { name: "Electron Js", icon: electronIcon },
    { name: "Bubble", icon: bubbleIcon },
    { name: "Postgres", icon: postgreIcon },
    { name: "Aws", icon: awsIcon },
    { name: "Supabase", icon: supabaseIcon },
]);

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
    padding-left: 250px;
    padding-right: 250px;
}

.skills-container h1 {
    font-size: 25px;
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-weight: 550;
    color: #333333;
}

.tools-section {
    display: flex;
    margin-bottom: 40px;
    justify-content: center;
    width: 100%;
    gap: 50px;
}

.tools-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-right: 3px solid #e0e0e0;
    padding-right: 50px;
}

.tool-label {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
}

.tools-list h2 {
    font-size: 18px;
    font-weight: 600;
}

.tools-ul {
    display: grid;
    list-style: none;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px;
    padding: 25px;
}

.tools-ul li {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    backdrop-filter: blur(50px);
    padding: 8px;
    gap: 5px;
    border-radius: 8px;
    font-weight: 500;
    color: #333333;
    max-width: 100px;
    font-size: 13px;
    box-shadow:
        0px 1px 2px 0px rgba(164, 172, 185, 0.24),
        0px 0px 0px 1px rgba(18, 55, 105, 0.08);
}

.tool-icon {
    width: 40px;
    height: 40px;
    margin-right: 8px;
}

.learning-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 25px;
}

.learning-overlay {
    position: absolute;
    inset: 0;
    z-index: 20;
    backdrop-filter: blur(1px);
    background: rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
}

.skill-progress {
    width: 50%;
    height: 6px;
    border-radius: 6px;
    background-color: #e2e8f0 !important;
}

.skill-progress .p-progressbar-value {
    background-color: #1f2937;
}

.learning-label {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
}

.learning-list h2 {
    font-size: 18px;
    font-weight: 600;
}

.learning-ul {
    overflow: hidden;
    position: relative;
    display: grid;
    list-style: none;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px;
    padding: 25px;
}

.learning-ul li {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: trasparent;
    backdrop-filter: blur(50px);
    padding: 8px;
    gap: 5px;
    border-radius: 8px;
    font-weight: 500;
    color: #333333;
    max-width: 100px;
    font-size: 13px;
    box-shadow:
        0px 1px 2px 0px rgba(164, 172, 185, 0.24),
        0px 0px 0px 1px rgba(18, 55, 105, 0.08);
}

.learning-icon {
    width: 40px;
    height: 40px;
    margin-right: 8px;
}

.education-section {
    display: flex;
    padding-bottom: 20px;
    gap: 50px;
    width: 100%;
}

.education-icon {
    font-size: 20px;
    margin-right: 10px;
}

.education-list,
.achievements-list {
    flex: 1;
    background-color: transparent;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    box-shadow:
        0px 1px 2px 0px rgba(164, 172, 185, 0.24),
        0px 0px 0px 1px rgba(18, 55, 105, 0.08);
}
.achievements-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.view-more {
    font-size: 14px;
    color: #1f2937;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
}
.education-list h2,
.achievements-list h2 {
    display: flex;
    flex-direction: column;
    font-size: 18px;
    gap: 5px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 0px;
}
.achievements-list span {
    font-size: 12px;
    font-weight: 400;
    color: #666666;
}
.education-list span {
    font-size: 12px;
    font-weight: 400;
    color: #666666;
}
.education-list ul {
    list-style: none;
    padding: 0;
}

.education-item {
    display: grid;
    margin-bottom: 15px;
    font-size: 16px;
    color: #444444;
    border-left: 5px solid #e0e0e0;
    padding-left: 15px;
}
.certification-item {
    margin-bottom: 15px;
    padding: 10px;
    width: fit-content;
    box-shadow:
        0px 1px 2px 0px rgba(164, 172, 185, 0.24),
        0px 0px 0px 1px rgba(18, 55, 105, 0.08);
    border-radius: 8px;
}
.certification-item h3 {
    font-size: 13px;
    font-weight: 500;
    color: #333333;
    gap: 10px;
}
.hydrated {
    display: inline-block;
    margin-right: 5px;
}
.achievements-list ul {
    display: grid;
    list-style: none;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    padding-left: 0px;
    padding-right: 0px;
}
.education-sub-item,
.certification-sub-item {
    font-size: 12px;
    font-weight: 400;
    color: #666666;
}

/* ---- Responsive ---- */
@media (max-width: 1024px) {
  .skills-container {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 768px) {
  .skills-container {
    padding-left: 20px;
    padding-right: 20px;
  }

  .tools-section {
    flex-direction: column;
    gap: 30px;
  }

  .tools-list {
    border-right: none;
    border-bottom: 3px solid #e0e0e0;
    padding-right: 0;
    padding-bottom: 30px;
  }

  .tools-ul,
  .learning-ul {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    padding: 15px;
  }

  .education-section {
    flex-direction: column;
    gap: 30px;
  }

  .achievements-list ul {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .achievements-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .tools-ul,
  .learning-ul {
    grid-template-columns: repeat(2, 1fr);
  }

  .achievements-list ul {
    grid-template-columns: 1fr;
  }
}
</style>
