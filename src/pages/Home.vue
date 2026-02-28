<template>
    <div class="home-container">
        <div class="detail-container">
            <div class="first-section">
                <div class="experience">
                    <h2>Experience</h2>
                    <p>{{homeContent.experience_intro }}</p>
                </div>
                <div class="about-me">
                    <h2>About Me</h2>
                    <p>{{homeContent.about_me}}</p>
                </div>
            </div>
            <div class="second-section">
                <div class="epereience-skills">
                    <h2>Personal Experiences</h2>
                    <div class="timeline-wrapper">
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
        </div>
        <div class="project-container">
            <div class="label">
                <h2>Live Projects</h2>
                <a href="/projects" class="view-more-link">View all projects<ion-icon name="arrow-forward-outline"
                        class="view-icon"></ion-icon></a>
            </div>
            <ul class="project-cards">
                <li v-for="(project, index) in liveProjects" :key="index" class="project-card"
                    :style="getProjectStyle(project.image)">
                    <div class="project-content">
                        <h2>
                            <a :href="getProjectUrl(project.live_url)" target="_blank" rel="noopener noreferrer"
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
import { ref, onMounted } from "vue";
import Timeline from 'primevue/timeline';
import { supabase } from '@/lib/supabase'

const loading = ref(false)
const experiences = ref([])
const homeContent = ref({ about_me: '', experience_intro: '' })
const liveProjects = ref([])
const loadingProjects = ref(false)

const fetchExperiences = async () => {
  loading.value = true
  const { data } = await supabase.from('experiences').select('*').order('created_at', { ascending: false })
  experiences.value = data || []
  loading.value = false
}


const fetchHomeContent = async () => {
  const { data } = await supabase.from('home_content').select('*').limit(1).single()
  if (data) homeContent.value = data
}

const fetchLiveProjects = async () => {
  loadingProjects.value = true
  const { data } = await supabase.from('live_projects').select('*').order('created_at', { ascending: false })
  liveProjects.value = data || []
  loadingProjects.value = false
}


const getProjectStyle = (image) => ({
    backgroundImage: `url('${image}')`,
});

const getProjectUrl = (liveUrl) => {
    return liveUrl;
};

onMounted(() => {
    fetchHomeContent(),
    fetchExperiences(),
    fetchLiveProjects()
})
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
    height: 550px;
}

.first-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-right: 5%;
    width: 100%;
    background-color: #f3f4f6;
    padding: 20px;
    max-height: 100%;
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
    background-color: #f3f4f6;
    width: 40%;
    padding: 20px;
    height: 550px;
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
    overflow: auto;
    padding: 0;
    color: #f5f5f5;
}
.timeline-wrapper {
    max-height: 450px; /* adjust as needed */
    overflow-y: auto;
    padding-right: 10px; 
}

.timeline-wrapper::-webkit-scrollbar {
    width: 6px;
}

.timeline-wrapper::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}

.p-timeline-event-content {
    display: flex;
}
.p-timeline-event-opposite {
  display: none !important;
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
        margin-right: 0;
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
