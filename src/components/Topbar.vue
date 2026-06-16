<template>
    <div class="topbar-container">
        <div class="topbar">
            <div class="topbar-right">
                <img :src="profPic" alt="Profile Picture" class="image-container" />
                <div class="content">
                    <h1>{{ profile?.name }}</h1>
                    <ul class="content-info">
                        <li>{{ profile?.role }}</li>
                        <li>{{ profile?.number }}</li>
                    </ul>
                    <div class="details">
                        <div class="detail-item">
                            <h1>Education</h1>
                            <h2>{{ profile?.education }}</h2>
                        </div>
                        <div class="detail-item">
                            <h1>Location</h1>
                            <h2>{{ profile?.location }}</h2>
                        </div>
                        <div class="detail-item-status">
                            <h1>Status</h1>
                            <div class="status-state">
                                <h2 class="status">{{ profile?.status }}</h2>
                            </div>
                        </div>
                    </div>
                    <p class="about">
                        {{ profile?.intro }}
                    </p>
                </div>
            </div>
            <div class="topbar-left">
                <div class="additional-info">
                    <a v-for="(link, i) in socialLinks" :key="i" :href="link.url" class="social-link"
                        :aria-label="link.name" target="_blank" rel="noopener">
                        <ion-icon :name="link.icon" class="topbar-icons"></ion-icon>
                    </a>
                    <button @click="isResumeOpen = true" class="download-cv" aria-label="View Resume" type="button">
                        <ion-icon name="document-outline" class="topbar-icons"></ion-icon>
                    </button>
                </div>
                <div class="cta-buttons">
                    <router-link to="/hire-me" class="cta-btn hire-btn">
                        <ion-icon name="briefcase-outline" class="btn-icon"></ion-icon>
                        Hire Me
                    </router-link>
                    <button @click="openWhatsApp" class="cta-btn message-btn" aria-label="Contact us on WhatsApp">
                        <svg class="whatsapp-icon-btn" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.025 0-2.031.256-2.919.734L7.422 6.769l1.825.452c.86.213 1.67.66 2.375 1.298.701.636 1.218 1.427 1.495 2.298l.443 1.291.474-.96c.297-.604.458-1.249.458-1.895 0-1.024-.256-2.031-.734-2.919"/>
                        </svg>
                        WhatsApp
                    </button>
                </div>
            </div>
        </div>
        <Teleport to="body" v-if="isResumeOpen">
            <div class="resume-modal-backdrop" @click="closeResume" role="presentation"></div>
            <div class="resume-modal-container" role="dialog" aria-modal="true" aria-label="Resume Viewer">
                <div class="resume-modal-header">
                    <h2>Resume</h2>
                    <button 
                        @click="closeResume" 
                        class="resume-close-btn" 
                        aria-label="Close resume viewer"
                        type="button">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                </div>
                <div class="resume-modal-content">
                    <object 
                        :data="profile?.resume" 
                        type="application/pdf" 
                        class="resume-document"
                        aria-label="Resume document">
                        <div class="resume-fallback">
                            <p>PDF viewer not supported. <a :href="profile?.resume" download class="resume-download-link">Download resume instead</a></p>
                        </div>
                    </object>
                </div>
            </div>
        </Teleport>
        <Navbar></Navbar>
</div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { supabase } from "@/lib/supabase";
import cvUrl from "@/assets/GericGultiano_Resume.pdf";
import profPic from "@/assets/pic1.png";

const profile = ref(null);
const socialLinks = ref([]);
const isResumeOpen = ref(false);

const openWhatsApp = () => {
  const phoneNumber = "639956140268";
  const message = encodeURIComponent("Hi! I'm interested in discussing a project with you.");
  
  // Primary method: Use api.whatsapp.com (more stable)
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
  
  console.log("Opening WhatsApp:", whatsappUrl);
  
  try {
    const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    
    if (!popup) {
      // Fallback: Try wa.me if popup blocked
      const fallbackUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      console.log("Popup blocked, using fallback:", fallbackUrl);
    }
  } catch (error) {
    console.error("WhatsApp error:", error);
    // Final fallback: Phone call
    window.location.href = `tel:+${phoneNumber}`;
  }
};

const closeResume = () => {
  isResumeOpen.value = false;
};

const handleKeyDown = (event) => {
  if (event.key === "Escape" && isResumeOpen.value) {
    closeResume();
  }
};

const fetchProfile = async () => {
  const { data, error } = await supabase
    .from('profile') 
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error(error);
  } else {
    profile.value = data;
    socialLinks.value = [
      {
        name: "GitHub",
        icon: "logo-github",
        url: data.github_link || "#",
      },
      {
        name: "Facebook",
        icon: "logo-facebook",
        url: data.fb_link || "#",
      },
      {
        name: "Email",
        icon: "mail-outline",
        url: `mailto:${data.email_link || ""}`,
      },
    ];
  }
};

const getResumeUrl = (filePath) => {
  const { data } = supabase.storage
    .from('resume')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

onMounted(() => {
  fetchProfile();
  window.addEventListener("keydown", handleKeyDown);
});

// Lock body scroll when modal is open
watch(isResumeOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// Cleanup on unmount
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
  document.body.style.overflow = "";
});
</script>

<style>
.topbar-container {
    padding: 0 250px;
}

.topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}

.topbar-right {
    display: flex;
    gap: 30px;
    padding: 40px 0;
    flex: 1;
}

.image-container {
    width: 300px;
    height: 220px;
    border-radius: 10%;
    object-fit: cover;
    max-width: 100%;
    box-shadow: 0px 1px 2px rgba(164, 172, 185, .24),
        0px 0px 0px 1px rgba(18, 55, 105, .08);
}

.content {
    display: flex;
    flex-direction: column;
}

.content-info {
    display: flex;
    list-style: none;
    padding: 0;
    gap: 15px;
    flex-wrap: wrap;
}

.content h1 {
    margin: 0;
    color: #333333;
    font-size: 30px;
    font-weight: 500;
    font-family: "Zalando Sans SemiExpanded", sans-serif;
}

.content-info li {
    font-size: 14px;
    color: #666;
}

.details {
    display: flex;
    gap: 40px;
    margin-top: 10px;
    flex-wrap: wrap;
}

.detail-item h1 {
    font-size: 14px;
    color: #888;
    margin: 0;
}

.detail-item h2 {
    font-size: 15px;
}

.detail-item-status h1 {
    font-size: 14px;
    color: #888;
    margin: 0;
}

.detail-item-status h2 {
    font-size: 15px;
}

.about {
    margin-top: 15px;
    font-size: 16px;
    line-height: 1.5;
    color: #555;
}

.highlight {
    font-weight: bold;
    color: #000;
}

.topbar-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
    gap: 5vh;
}

.additional-info {
    display: flex;
    gap: 20px;
    width: auto;
    height: auto;
    align-items: center;
    justify-content: center;
}

/* Icon styles */
.social-link {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
}

.topbar-icons {
    font-size: 5px;
    width: 34px;
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #374151;
    background: #f3f4f6;
    border-radius: 50px;
    padding: 6px;
    transition: 0.12s ease, background 0.12s ease, color 0.12s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.social-link:hover .topbar-icons {
    transform: translateY(-3px);
    background: #e0e7ff;
    color: #3730a3;
}

.social-link:focus .topbar-icons {
    transform: translateY(-3px);
    background: #e0e7ff;
    color: #3730a3;
}

.download-cv {
    font-size: 20px;
    color: #555;
    background: transparent;
    border: none;
    padding: 0;
}

.download-cv .topbar-icons {
    font-size: 5px;
    width: 34px;
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #374151;
    background: #f3f4f6;
    border-radius: 50px;
    padding: 6px;
    transition: 0.12s ease, background 0.12s ease, color 0.12s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.download-cv:hover .topbar-icons {
    transform: translateY(-3px);
    background: #e0e7ff;
    color: #3730a3;
}

@media (max-width: 1024px) {
    .topbar-container {
        padding: 0 40px;
    }
}

@media (max-width: 768px) {
    .topbar-container {
        padding: 0 20px;
    }
}

@media (max-width: 768px) {
    .topbar-right {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
}

@media (max-width: 768px) {
    .image-container {
        width: 200px;
        height: auto;
    }
}

@media (max-width: 768px) {
    .content-info {
        justify-content: center;
    }
}

@media (max-width: 768px) {
    .details {
        justify-content: center;
        gap: 20px;
    }
}

@media (max-width: 768px) {
    .topbar-left {
        width: 100%;
        justify-content: center;
        padding-top: 0;
    }
}

/* CTA Buttons Styles */
.cta-buttons {
    display: flex;
    gap: 12px;
    margin-left: 30px;
    align-items: center;
}

.cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.hire-btn {
    background-color: #020617;
    color: #ffffff;
}

.hire-btn:hover {
    background-color: #111827;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(31, 41, 55, 0.15);
}

.hire-btn:active {
    transform: translateY(0);
}

.message-btn {
    background-color: #f0f4f8;
    color: #1f2937;
    border: 1.5px solid #e0e7f1;
}

.message-btn:hover {
    background-color: #e5ecf4;
    border-color: #d0d9e8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.message-btn:hover .whatsapp-icon-btn {
    color: #25D366;
}

.message-btn:active {
    transform: translateY(0);
}

.btn-icon {
    font-size: 18px;
    width: 18px;
    height: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.whatsapp-icon-btn {
    font-size: 18px;
    width: 18px;
    height: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #1f2937;
    transition: color 0.2s ease;
}

@media (max-width: 1024px) {
    .cta-buttons {
        margin-left: 15px;
    }
}

@media (max-width: 768px) {
    .cta-buttons {
        width: 100%;
        justify-content: center;
        margin-left: 0;
        margin-top: 20px;
    }

    .cta-btn {
        flex: 1;
        max-width: 150px;
    }
}

/* Resume Modal Styles */
.resume-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(15, 23, 42, 0.6);
    z-index: 999;
    animation: fadeIn 0.2s ease-out;
}

.resume-modal-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    max-width: 64rem;
    width: 90%;
    height: 85vh;
    background-color: #ffffff;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    animation: scaleIn 0.2s ease-out;
}

.resume-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid #e2e8f0;
    flex-shrink: 0;
}

.resume-modal-header h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
}

.resume-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: #6b7280;
    transition: all 0.2s ease;
    font-size: 24px;
    padding: 0;
}

.resume-close-btn:hover {
    background-color: #f3f4f6;
    color: #1f2937;
}

.resume-close-btn:active {
    transform: scale(0.95);
}

.resume-close-btn:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.resume-modal-content {
    flex: 1;
    overflow: hidden;
    padding: 16px;
    background-color: #fafafa;
}

.resume-document {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.resume-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    padding: 20px;
    color: #6b7280;
}

.resume-fallback p {
    margin: 0;
    font-size: 14px;
}

.resume-download-link {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
}

.resume-download-link:hover {
    color: #1d4ed8;
    text-decoration: underline;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

@media (max-width: 768px) {
    .resume-modal-container {
        width: 95%;
        height: 90vh;
        max-width: none;
    }

    .resume-modal-header h2 {
        font-size: 18px;
    }

    .resume-modal-header {
        padding: 16px 20px;
    }

    .resume-modal-content {
        padding: 12px;
    }
}
</style>