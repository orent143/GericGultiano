<template>
    <section class="projects-section">
        <!-- Section Header -->
        <div class="projects-header">
            <div class="header-label">Portfolio</div>
            <h2 class="header-title">Featured Projects</h2>
            <p class="header-description">
                A curated selection of recent work highlighting clean design,
                thoughtful interaction, and technical precision.
            </p>
        </div>

        <div class="project-list">
            <article v-for="(project, index) in projects" :key="index" class="section-project-card"
                :class="{ 'featured': index === 0 }" :style="{ '--card-delay': `${index * 0.06}s` }"
                @click="openProject(index)" @keydown.enter="openProject(index)" @keydown.space="openProject(index)"
                role="button" tabindex="0" :aria-label="`View ${project.title} project details`">
                <!-- Project Image -->
                <div class="project-image-wrapper">
                    <img :src="project.image" :alt="`${project.title} project preview`" class="project-image" />
                    <!-- Subtle Project Label Overlay -->
                    <div class="project-label-overlay">
                        <div class="project-label-content">
                            <span class="project-number">{{ String(index + 1).padStart(2, '0') }}</span>
                            <span class="project-category" v-if="project.category">{{ project.category }}</span>
                        </div>
                    </div>
                </div>

                <!-- Project Info -->
                <div class="project-info">
                    <h3 class="project-title">{{ project.title }}</h3>
                    <p class="project-excerpt">{{ project.excerpt }}</p>

                    <!-- Quick Tech Tags -->
                    <div class="tech-tags" v-if="project.technologies && project.technologies.length">
                        <span v-for="(tech, tIndex) in project.technologies.slice(0, 2)" :key="tIndex" class="tech-tag">
                            {{ tech }}
                        </span>
                        <span v-if="project.technologies.length > 2" class="tech-tag tech-more">
                            +{{ project.technologies.length - 2 }} more
                        </span>
                    </div>

                    <!-- CTA -->
                    <div class="project-cta">
                        <span class="view-project">Explore</span>
                        <ion-icon name="arrow-forward-outline" class="cta-icon"></ion-icon>
                    </div>
                </div>
            </article>
        </div>


        <!-- Project Details Modal -->
        <Transition name="modal-fade">
            <div v-if="activeProjectIndex !== null" class="modal-backdrop" @click="closeProject">
                <div class="modal-container" @click.stop>
                    <div class="modal-header">
                        <div class="modal-title">
                            <h2>Project Details</h2>
                            <span>Additional Information.</span>
                        </div>
                        <button class="modal-close-btn" @click="closeProject" aria-label="Close project details"
                            title="Close (Esc)">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>

                    <!-- Modal Content -->
                    <div class="modal-content">
                        <!-- Image Section -->
                        <div class="modal-image-placeholder">
                            <div class="modal-image-section">
                                <img :src="activeProject.image" :alt="`${activeProject.title} detailed preview`"
                                    class="modal-image" />
                            </div>
                            <h3>Project description</h3>
                            <p class="modal-description">{{ activeProject.description }}</p>
                        </div>


                        <!-- Details Section -->
                        <div class="modal-details">
                            <!-- Header Info -->
                            <div class="modal-header-block">
                                <span class="modal-category" v-if="activeProject.category">
                                    {{ activeProject.category }}
                                </span>
                                <h2 class="modal-project-title">{{ activeProject.title }}</h2>
                            </div>

                            <!-- Technologies Section -->
                            <div class="modal-block"
                                v-if="activeProject.technologies && activeProject.technologies.length">
                                <h3 class="modal-block-title">Technologies</h3>
                                <div class="modal-tech-grid">
                                    <span v-for="(tech, index) in activeProject.technologies" :key="index"
                                        class="modal-tech-tag">
                                        {{ tech }}
                                    </span>
                                </div>
                            </div>

                            <!-- Features Section -->
                            <div class="modal-block" v-if="activeProject.features">
                                <h3 class="modal-block-title">Key Features</h3>
                                <ul class="modal-features-list">
                                    <li v-for="(feature, index) in activeProject.features" :key="index">
                                        {{ feature }}
                                    </li>
                                </ul>
                            </div>

                            <!-- Links Section -->
                            <div class="modal-block modal-links-block">
                                <h3 class="modal-block-title">View Project</h3>
                                <div class="modal-links">
                                    <a v-if="activeProject.liveurl" :href="activeProject.liveurl" target="_blank"
                                        rel="noopener noreferrer" class="modal-link modal-link-primary">
                                        <ion-icon name="open-outline"></ion-icon>
                                        <span>Live Demo</span>
                                    </a>
                                    <a v-if="activeProject.repourl" :href="activeProject.repourl" target="_blank"
                                        rel="noopener noreferrer" class="modal-link modal-link-secondary">
                                        <ion-icon name="logo-github"></ion-icon>
                                        <span>Repository</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

    </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/lib/supabase'

const activeProjectIndex = ref(null)
const projects = ref([])

const fetchProjects = async () => {
    const { data } = await supabase.from('live_projects').select('*')
    projects.value = data || []
}



const activeProject = computed(() => {
    return activeProjectIndex.value !== null ? projects.value[activeProjectIndex.value] : null
})

const openProject = (index) => {
    activeProjectIndex.value = index
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
}

const closeProject = () => {
    activeProjectIndex.value = null
    // Restore body scroll
    document.body.style.overflow = 'auto'
}

// Close modal on Escape key
const handleKeyDown = (event) => {
    if (event.key === 'Escape' && activeProjectIndex.value !== null) {
        closeProject()
    }
}

onMounted(() => {
    fetchProjects()
    if (typeof window !== 'undefined') {
        window.addEventListener('keydown', handleKeyDown)
    }
})

onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeyDown)
    }
})
</script>

<style scoped>
/* ===================================
   SECTION & HEADER
   =================================== */

.projects-section {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.projects-header {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 600px;
    align-items: flex-start;
}

.header-label {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #999999;
}

.header-title {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 32px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
    line-height: 1.2;
}

.header-description {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 15px;
    color: #666666;
    line-height: 1.7;
    margin: 0;
}

/* ===================================
   PROJECTS GRID
   =================================== */

.project-list {
    display: flex;
    gap: 10px;
    background-color: #ffffff;
    overflow: hidden;
}

/* ===================================
   PROJECT CARD
   =================================== */

.section-project-card {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 40%;
    height: 500px;
    animation: cardFadeIn 0.6s ease-out both;
    animation-delay: var(--card-delay);
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.320, 1), opacity 0.3s ease;
    outline: none;
    border-radius: 0;
    border: solid 1px #33333315;
    padding: 0;
}

@keyframes cardFadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.section-project-card:hover {
    transform: translateY(-6px);
}

.section-project-card:focus-visible {
    outline: 2px solid #0a0a0a;
    outline-offset: 6px;
    border-radius: 2px;
}


/* ===================================
   PROJECT IMAGE
   =================================== */

.project-image-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 66.67%;
    overflow: hidden;
    height: 250px;
    transition: border-color 0.3s ease;
}

.section-project-card:hover .project-image-wrapper {
    border-color: #d0d0d0;
}

.project-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.320, 1);
}

.section-project-card:hover .project-image {
    transform: scale(1.03);
}

.project-label-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 16px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    pointer-events: none;
}

.project-label-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.project-number {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 5px;
    backdrop-filter: blur(6px);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.project-category {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: rgba(255, 255, 255, 0.85);
    padding: 4px 10px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    backdrop-filter: blur(6px);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* ===================================
   PROJECT INFO
   =================================== */

.project-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    background-color: #ffffff;
}

.project-title {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.3px;
    color: #0a0a0a;
    margin: 0;
    line-height: 1.3;
    transition: color 0.3s ease;
}

.section-project-card:hover .project-title {
    color: #333333;
}

.project-excerpt {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    line-height: 1.6;
    margin: 0;
    letter-spacing: 0.1px;
}

/* ===================================
   TECH TAGS
   =================================== */

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
}

.tech-tag {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #555555;
    padding: 4px 10px;
    background-color: #f0f0f0;
    border-radius: 3px;
    border: 1px solid #e0e0e0;
    transition: all 0.2s ease;
}

.tech-tag.tech-more {
    cursor: default;
}

.section-project-card:hover .tech-tag {
    background-color: #f9f9f9;
    border-color: #b0b0b0;
}

/* ===================================
   CTA (Call-to-Action)
   =================================== */

.project-cta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: #0a0a0a;
    transition: color 0.3s ease;
}

.section-project-card:hover .project-cta {
    color: #333333;
}

.cta-icon {
    font-size: 16px;
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.320, 1);
}

.section-project-card:hover .cta-icon {
    transform: translateX(4px);
}

/* ===================================
   MODAL BACKDROP
   =================================== */

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(10, 10, 10, 0.4);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 24px;
    overflow-y: auto;
}

/* ===================================
   MODAL CONTAINER
   =================================== */

.modal-container {
    background-color: #fafafa;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 1000px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: modalSlideIn 0.5s cubic-bezier(0.23, 1, 0.320, 1);
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.96) translateY(24px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

/* ===================================
   MODAL CLOSE BUTTON
   =================================== */

.modal-close-btn {
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #d0d0d0;
    background-color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 20px;
    color: #333333;
    padding: 0;
    font-family: inherit;
}

.modal-close-btn:hover {
    background-color: #f5f5f5;
    border-color: #a0a0a0;
}

.modal-close-btn:focus-visible {
    outline: 2px solid #0a0a0a;
    outline-offset: 2px;
}

/* ===================================
   MODAL CONTENT
   =================================== */

.modal-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    padding: 20px 48px;
}
.modal-image-placeholder {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.modal-image-placeholder h3 {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.5px;
    color: #333333;
    margin: 0;
    line-height: 1.2;
}

.modal-image-section {
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    background-color: #f0f0f0;
    border: 1px solid #e0e0e0;
    height: fit-content;
    position: sticky;
    top: 48px;
}

.modal-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
}

.modal-details {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding-top: 8px;
}

/* ===================================
   MODAL HEADER BLOCK
   =================================== */

.modal-header-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.modal-category {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #666666;
    width: fit-content;
}

.modal-project-title {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 32px;
    font-weight: 600;
    letter-spacing: -0.5px;
    color: #0a0a0a;
    margin: 0;
    line-height: 1.2;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 48px;
    padding-right: 48px;
    padding-top: 20px;
}

.modal-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.modal-title h2 {
    font-size: 28px;
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-weight: 600;
    color: #333333;
    margin: 0;
    line-height: 1.2;
}

.modal-title span {
    font-size: 14px;
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    color: #666666;
    margin-top: 4px;
}

.modal-description {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: #555555;
    line-height: 1.8;
    margin: 0;
    letter-spacing: 0.2px;
}

/* ===================================
   MODAL BLOCKS
   =================================== */

.modal-block {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 8px;
}

.modal-block-title {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #777777;
    margin: 0;
}

.modal-tech-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.modal-tech-tag {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #333333;
    padding: 8px 14px;
    background-color: #f0f0f0;
    border-radius: 3px;
    border: 1px solid #dcdcdc;
    transition: all 0.2s ease;
}

.modal-tech-tag:hover {
    background-color: #e8e8e8;
    border-color: #b0b0b0;
}

.modal-features-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.modal-features-list li {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #555555;
    line-height: 1.7;
    padding-left: 20px;
    position: relative;
    letter-spacing: 0.1px;
}

.modal-features-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #0a0a0a;
    font-weight: 600;
}

.modal-links-block {
    padding-top: 4px;
    border-top: 1px solid #e0e0e0;
    margin-top: 8px;
}

.modal-links {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.modal-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 18px;
    border-radius: 4px;
    border: 1px solid #d0d0d0;
    background-color: #ffffff;
    text-decoration: none;
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: #0a0a0a;
    transition: all 0.3s ease;
    cursor: pointer;
}

.modal-link:hover {
    background-color: #f5f5f5;
    border-color: #666666;
    transform: translateY(-2px);
}

.modal-link:focus-visible {
    outline: 2px solid #0a0a0a;
    outline-offset: 2px;
}

.modal-link ion-icon {
    font-size: 18px;
}

.modal-link-primary {
    background-color: #0a0a0a;
    color: #ffffff;
    border-color: #0a0a0a;
}

.modal-link-primary:hover {
    background-color: #333333;
    border-color: #333333;
}

.modal-link-secondary {
    border-color: #d0d0d0;
}

.modal-link-secondary:hover {
    background-color: #f9f9f9;
    border-color: #555555;
}


.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

@media (max-width: 1024px) {
    .projects-section {
        gap: 48px;
        padding: 60px 0;
    }

    .header-title {
        font-size: 36px;
    }

    .modal-content {
        grid-template-columns: 1fr;
        gap: 32px;
        padding: 40px;
    }

    .modal-image-section {
        position: static;
    }

    .modal-close-btn {
        top: 16px;
        right: 16px;
    }
}


@media (orientation: portrait) and (max-width: 1024px) {
    .project-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        overflow: visible;
    }

    .section-project-card {
        width: 100%;
        height: auto;
    }

    .project-image-wrapper {
        height: 160px;
        padding-bottom: 0;
    }
}


@media (max-width: 768px) {
    .projects-section {
        gap: 40px;
        padding: 50px 0;
    }

    .header-title {
        font-size: 28px;
    }

    .header-description {
        font-size: 15px;
    }

    .project-image-wrapper {
        padding-bottom: 60%;
    }

    .modal-backdrop {
        padding: 16px;
    }

    .modal-container {
        max-height: 95vh;
        border-radius: 6px;
    }

    .modal-content {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 32px;
    }

    .modal-title {
        font-size: 26px;
    }

    .modal-image-section {
        width: 100%;
    }

    .modal-close-btn {
        width: 36px;
        height: 36px;
        font-size: 18px;
    }

    .project-title {
        font-size: 16px;
    }

    .project-excerpt {
        font-size: 13px;
    }

    .modal-description {
        font-size: 14px;
    }

    .modal-block-title {
        font-size: 11px;
    }

    .modal-tech-tag {
        font-size: 12px;
    }

    .modal-link {
        font-size: 12px;
        padding: 10px 14px;
    }

    .modal-link ion-icon {
        font-size: 16px;
    }

    .modal-features-list li {
        font-size: 13px;
    }
}


@media (max-width: 480px) {
    .projects-section {
        gap: 32px;
        padding: 40px 0;
    }

    .header-title {
        font-size: 24px;
    }

    .header-description {
        font-size: 14px;
    }

    .project-info {
        gap: 10px;
    }

    @media (orientation: portrait) {
        .project-list {
            gap: 12px;
        }
    }

    .project-number {
        font-size: 11px;
    }

    .project-category {
        font-size: 10px;
        padding: 3px 8px;
    }

    .project-title {
        font-size: 15px;
    }

    .project-excerpt {
        font-size: 12px;
    }

    .tech-tags {
        gap: 6px;
        margin-top: 2px;
    }

    .tech-tag {
        font-size: 11px;
    }

    .project-cta {
        font-size: 12px;
        margin-top: 6px;
    }

    .cta-icon {
        font-size: 14px;
    }

    .modal-content {
        gap: 20px;
        padding: 24px;
    }

    .modal-title {
        font-size: 22px;
    }

    .modal-header-block {
        gap: 10px;
    }

    .modal-description {
        font-size: 13px;
    }

    .modal-block {
        gap: 12px;
    }

    .modal-links {
        flex-direction: column;
    }

    .modal-link {
        width: 100%;
        justify-content: center;
        padding: 11px 16px;
    }

    .modal-tech-grid {
        gap: 8px;
    }

    .modal-features-list {
        gap: 10px;
    }

    .modal-features-list li {
        font-size: 12px;
    }
}
</style>