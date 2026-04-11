<template>
    <div class="all-certificates-container">
        <div class="page-header">
            <h1>All Certificates <span>Complete list of my certificates</span></h1>
            <router-link to="/skills" class="back-btn"><ion-icon name="arrow-back-outline"></ion-icon>
                Back
            </router-link>
        </div>
        <ul class="certificates-grid">
            <!-- <li v-for="(project, index) in projects" :key="index" class="project-card"> -->
                <div class="certificate-info">
                    <!-- <img src="cert" alt="" class="cert-image">-->
                    <a class="certificate-title">
                        title
                        <!-- {{ project.title }} -->
                    </a>
                    <div class="sub-section">
                        <p class="certificate-issuer">
                            <!-- {{ project.description }} -->
                        </p>
                        <div class="certificate-date">
                            <!-- <span v-for="(tech, techIndex) in project.tech_stack" :key="techIndex" class="year">
                                {{ tech }}
                            </span> -->
                        </div>
                    </div>
                </div>
            <!-- </li> -->
        </ul>
    </div>
</template>