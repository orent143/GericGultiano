<template>
    <div class="all-projects-container">
        <div class="page-header">
            <h1>All Projects <span>Complete list of my projects</span></h1>
            <router-link to="/projects" class="back-btn"><ion-icon name="arrow-back-outline"></ion-icon> Back</router-link>
        </div>
        <ul class="projects-grid">
            <li v-for="(project, index) in projects" :key="index" class="project-card"
                :style="projectStyle(project.image_url)">
                <div class="project-info">
                    <a :href="project.live_url" target="_blank" rel="noopener noreferrer" class="project-link">
                        {{ project.title }}
                    </a>
                    <p class="project-description">{{ project.description }}</p>
                    <div class="tech-stack">
                        <span v-for="(tech, techIndex) in project.tech_stack" :key="techIndex" class="tech-item">
                            {{ tech }}
                        </span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from '@/lib/supabase'

const projects = ref([])

const fetchAllProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    projects.value = data || []
}

const projectStyle = (imageUrl) => ({
    backgroundImage: `url('${imageUrl}')`,
});

onMounted(fetchAllProjects)
</script>

<style scoped>
.all-projects-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 20px;
    padding-left: 250px;
    padding-right: 250px;
    padding-bottom: 40px;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.page-header h1 {
    display: flex;
    flex-direction: column;
    font-size: 28px;
    font-weight: 550;
    color: #333333;
    gap: 10px;
}

.page-header span {
    font-size: 14px;
    font-weight: 400;
    color: #666666;
}

.back-btn {
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

.back-btn:hover {
    background-color: #e5e7eb;
}

.projects-grid {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 0;
}

.project-card {
    display: flex;
    align-items: flex-end;
    min-height: 250px;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s ease;
}

.project-card:hover {
    transform: scale(1.02);
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
    font-weight: 500;
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
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 10px;
}

.tech-item {
    background-color: #ffffff33;
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 11px;
    color: #ffffff;
}

/* Responsive */
@media (max-width: 1024px) {
    .all-projects-container {
        padding-left: 40px;
        padding-right: 40px;
    }

    .projects-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .all-projects-container {
        padding-left: 20px;
        padding-right: 20px;
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }

    .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
}
</style>
