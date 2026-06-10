<template>
    <div class="certificates-container">
        <div class="certificates-header">
            <router-link to="/skills" class="back-link">
                <ion-icon name="arrow-back-outline"></ion-icon>
            </router-link>
            <div class="header-content">
                <h1>Certifications <span>Professional credentials and achievements</span></h1>
            </div>
        </div>

        <div v-if="loading" class="loading-state">
            <div class="loading-spinner"></div>
            <p>Loading certificates...</p>
        </div>

        <div v-else-if="certificates.length === 0" class="empty-state">
            <ion-icon name="document-outline" class="empty-icon"></ion-icon>
            <h2>No Certificates Yet</h2>
            <p>Check back soon for updates</p>
        </div>

        <div v-else class="certificates-grid">
            <div
                v-for="(cert, index) in certificates"
                :key="index"
                class="certificate-card"
                :style="{ animationDelay: `${index * 50}ms` }"
            >
                <div class="certificate-header">
                    <div class="certificate-icon">
                        <ion-icon name="medal-outline"></ion-icon>
                    </div>
                    <div class="certificate-meta">
                        <span class="issue-date">{{ formatDate(cert.issue_date) }}</span>
                    </div>
                </div>

                <div class="certificate-body">
                    <h3 class="certificate-name">{{ cert.name }}</h3>
                    <p class="certificate-issuer">{{ cert.issuer }}</p>
                    
                    <div v-if="cert.credential_id" class="certificate-credential">
                        <span class="credential-label">Credential ID</span>
                        <span class="credential-value">{{ cert.credential_id }}</span>
                    </div>

                    <a
                        v-if="cert.credential_url"
                        :href="cert.credential_url"
                        target="_blank"
                        rel="noopener"
                        class="verify-link"
                    >
                        <span>Verify Certificate</span>
                        <ion-icon name="open-outline"></ion-icon>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabase";

const certificates = ref([]);
const loading = ref(true);

const fetchCertificates = async () => {
    try {
        const { data, error } = await supabase
            .from("certificates")
            .select("*")
            .order("issue_date", { ascending: false });

        if (error) {
            console.error("Error fetching certificates:", error);
        } else {
            certificates.value = data || [];
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
    });
};

onMounted(() => {
    fetchCertificates();
});
</script>

<style scoped>
.certificates-container {
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin-top: 20px;
    padding-left: 250px;
    padding-right: 250px;
}

.certificates-header {
    display: flex;
    align-items: flex-start;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 60px;
}

.back-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #f5f5f7;
    color: #1d1d1f;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 20px;
    flex-shrink: 0;
    margin-top: 2px;
}

.back-link:hover {
    background-color: #e8e8ed;
    transform: scale(1.05);
}

.back-link:active {
    transform: scale(0.95);
}

.header-content {
    flex: 1;
}

.header-content h1 {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 25px;
    font-weight: 550;
    color: #333333;
}

.header-content span {
    font-size: 14px;
    font-weight: 400;
    color: #666666;
}

.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120px 20px;
    gap: 20px;
}

.loading-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid #f5f5f7;
    border-top-color: #1d1d1f;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-state p {
    font-size: 16px;
    color: #86868b;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 20px;
    text-align: center;
}

.empty-icon {
    font-size: 64px;
    color: #d2d2d7;
    margin-bottom: 20px;
}

.empty-state h2 {
    font-size: 28px;
    font-weight: 600;
    color: #1d1d1f;
    margin: 0;
}

.empty-state p {
    font-size: 16px;
    color: #86868b;
    margin: 8px 0 0 0;
}

.certificates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 16px;
}

.certificate-card {
    background: #ffffff;
    border: 1px solid #f5f5f7;
    border-radius: 18px;
    padding: 28px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.certificate-card:hover {
    border-color: #e8e8ed;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
}

.certificate-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
}

.certificate-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%);
    border-radius: 12px;
    color: #1d1d1f;
    font-size: 24px;
    border: 1px solid #e8e8ed;
}

.certificate-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.issue-date {
    font-size: 13px;
    font-weight: 500;
    color: #86868b;
    letter-spacing: 0.3px;
}

.certificate-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.certificate-name {
    font-size: 18px;
    font-weight: 600;
    color: #1d1d1f;
    margin: 0;
    letter-spacing: -0.5px;
    line-height: 1.3;
}

.certificate-issuer {
    font-size: 14px;
    color: #86868b;
    margin: 0;
    font-weight: 400;
}

.certificate-credential {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px;
    background: #f9f9fb;
    border-radius: 10px;
    margin-top: 8px;
}

.credential-label {
    font-size: 12px;
    font-weight: 600;
    color: #86868b;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.credential-value {
    font-size: 13px;
    font-weight: 500;
    color: #1d1d1f;
    font-family: "SF Mono", Monaco, "Courier New", monospace;
    word-break: break-all;
}

.verify-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 0;
    color: #0071e3;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    border-bottom: 1px solid transparent;
    margin-top: 8px;
}

.verify-link:hover {
    color: #0077ed;
    border-bottom-color: #0071e3;
    gap: 12px;
}

.verify-link:active {
    opacity: 0.8;
}

.verify-link ion-icon {
    font-size: 16px;
    transition: transform 0.3s ease;
}

.verify-link:hover ion-icon {
    transform: translateX(2px);
}

/* Responsive */
@media (max-width: 1024px) {
    .certificates-container {
        padding: 50px 20px;
    }

    .header-content h1 {
        font-size: 44px;
    }

    .certificates-grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 12px;
    }
}

@media (max-width: 640px) {
    .certificates-container {
        padding: 40px 16px;
    }

    .certificates-header {
        gap: 16px;
        margin-bottom: 40px;
    }

    .header-content h1 {
        font-size: 32px;
    }

    .header-subtitle {
        font-size: 16px;
    }

    .certificates-grid {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .certificate-card {
        padding: 20px;
    }

    .certificate-icon {
        width: 40px;
        height: 40px;
        font-size: 20px;
    }
}
</style>