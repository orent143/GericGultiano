<template>
    <section class="services-section">
        <!-- Section Header -->
        <div class="services-header">
            <div class="header-label">Services</div>
            <h2 class="header-title">What I Offer</h2>
            <p class="header-description">
                Specialized expertise across web development, quality assurance, and no-code solutions. 
                Each service crafted with precision and attention to detail.
            </p>
        </div>

        <!-- Services Grid -->
        <div class="services-grid">
            <div 
                v-for="(service, index) in services" 
                :key="index" 
                class="service-card"
                :style="{ '--card-delay': `${index * 0.1}s` }"
            >
                <!-- Service Number -->
                <div class="service-number">{{ String(index + 1).padStart(2, '0') }}</div>

                <!-- Icon Container -->
                <div class="icon-container">
                    <ion-icon :name="service.icon" class="service-icon"></ion-icon>
                </div>

                <!-- Service Content -->
                <div class="service-content">
                    <h3 class="service-title">{{ service.title }}</h3>
                    <p class="service-description">{{ service.description }}</p>

                    <!-- Service Highlights -->
                    <ul class="service-highlights">
                        <li v-for="(highlight, hIndex) in service.highlights" :key="hIndex">
                            {{ highlight }}
                        </li>
                    </ul>
                </div>

                <!-- Divider (except last item) -->
                <div v-if="index < services.length - 1" class="card-divider"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const services = ref([
    {
        title: 'Website Development',
        icon: 'code-slash-outline',
        description: 'Full-stack web development with modern frameworks and best practices. Building responsive, performant, and accessible web experiences.',
        highlights: [
            'Responsive & mobile-first design',
            'Performance optimization & lazy loading',
            'Basic SEO & metadata implementation',
        ]
    },
    {
        title: 'Software Quality Assurance Testing',
        icon: 'checkmark-circle-outline',
        description: 'Comprehensive testing strategies ensuring product reliability and user experience excellence. Manual and automated testing approaches.',
        highlights: [
            'Manual Testing',
            'Test Automation',
            'Quality Documentation'
        ]
    },
    {
        title: 'Bubble.io Development',
        icon: 'flash-outline',
        description: 'No-code solutions leveraging Bubble.io for rapid prototyping and deployment. Create powerful applications without extensive coding.',
        highlights: [
            'No-Code Development',
            'Rapid Prototyping',
            'Custom Plugins'
        ]
    },
    {
        title: 'SEO Optimization',
        icon: 'analytics-outline',
        description: 'Technical and on-page SEO strategies to improve search engine visibility, site crawlability, and overall web performance.',
        highlights: [
            'Sitemap & robots.txt setup',
            'On-page SEO: meta tags & headings',
            'Performance & mobile optimization'
        ]
    }
])
</script>

<style scoped>
.services-section {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 60px 0;
    width: 100%;
}

/* ---- Header ---- */
.services-header {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 600px;
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

/* ---- Services Grid ---- */
.services-grid {
    display: flex;
    flex-direction: column;
    gap: 0;
    background-color: #ffffff;
    border: 1px solid #efefef;
    border-radius: 8px;
    overflow: hidden;
}

/* ---- Service Card ---- */
.service-card {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;
    padding: 32px 28px;
    position: relative;
    align-items: flex-start;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    animation: slideInCard 0.5s ease-out both;
    animation-delay: var(--card-delay);
}

@keyframes slideInCard {
    from {
        opacity: 0;
        transform: translateY(12px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.service-card:hover {
    background-color: #fafafa;
}

/* ---- Service Number (Left Column Anchor) ---- */
.service-number {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #e5e5e5;
    line-height: 1;
    min-width: 50px;
    text-align: center;
}

/* ---- Icon Container ---- */
.icon-container {
    position: absolute;
    top: 32px;
    right: 28px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    transition: all 0.3s ease;
}

.service-card:hover .icon-container {
    background-color: #ffffff;
    border-color: #d1d5db;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.service-icon {
    font-size: 20px;
    color: #333333;
}

/* ---- Service Content ---- */
.service-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-right: 56px;
}

.service-title {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
    line-height: 1.3;
}

.service-description {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #666666;
    margin: 0;
    line-height: 1.6;
}

/* ---- Service Highlights ---- */
.service-highlights {
    list-style: none;
    margin: 8px 0 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.service-highlights li {
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    font-size: 13px;
    color: #999999;
    padding: 4px 8px;
    background-color: #fafafa;
    border-radius: 4px;
    border: 1px solid #efefef;
}

.service-card:hover .service-highlights li {
    background-color: #ffffff;
    border-color: #e5e7eb;
}

/* ---- Card Divider ---- */
.card-divider {
    position: absolute;
    bottom: 0;
    left: 28px;
    right: 28px;
    height: 1px;
    background-color: #efefef;
}

/* ---- Responsive: Tablet ---- */
@media (max-width: 768px) {
    .services-section {
        gap: 40px;
        padding: 40px 0;
    }

    .header-title {
        font-size: 28px;
    }

    .service-card {
        grid-template-columns: auto 1fr;
        gap: 16px;
        padding: 24px 20px;
    }

    .service-number {
        font-size: 20px;
        min-width: 45px;
    }

    .service-content {
        padding-right: 48px;
    }

    .icon-container {
        width: 36px;
        height: 36px;
        top: 24px;
        right: 20px;
    }

    .service-icon {
        font-size: 18px;
    }

    .service-title {
        font-size: 16px;
    }

    .service-description {
        font-size: 13px;
    }

    .service-highlights {
        gap: 8px;
    }

    .service-highlights li {
        font-size: 12px;
    }
}

/* ---- Responsive: Mobile ---- */
@media (max-width: 480px) {
    .services-section {
        gap: 32px;
        padding: 30px 0;
    }

    .header-title {
        font-size: 24px;
    }

    .header-description {
        font-size: 14px;
    }

    .services-grid {
        border-radius: 6px;
    }

    .service-card {
        grid-template-columns: 1fr;
        gap: 12px;
        padding: 20px 16px;
    }

    .service-number {
        position: absolute;
        top: 20px;
        right: 16px;
        font-size: 18px;
    }

    .service-content {
        padding-right: 44px;
    }

    .icon-container {
        display: none;
    }

    .service-title {
        font-size: 15px;
        padding-top: 8px;
    }

    .service-description {
        font-size: 13px;
    }

    .service-highlights {
        gap: 6px;
        margin-top: 6px;
    }

    .service-highlights li {
        font-size: 11px;
        padding: 3px 6px;
    }
}
</style>
