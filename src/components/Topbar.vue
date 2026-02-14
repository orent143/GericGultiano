<template>
    <div class="topbar-container">
        <div class="topbar">
            <div class="topbar-right">
                <img :src="profPic" alt="Profile Picture" class="image-container" />
                <div class="content">
                    <h1>Geric Gultiano</h1>
                    <ul class="content-info">
                        <li>QA Intern | Aspiring Frontend Developer</li>
                        <li>+63 995-614-0268</li>
                    </ul>
                    <div class="details">
                        <div class="detail-item">
                            <h1>Education</h1>
                            <h2>BS in Information Technology</h2>
                        </div>
                        <div class="detail-item">
                            <h1>Location</h1>
                            <h2>Davao City, PH</h2>
                        </div>
                        <div class="detail-item">
                            <h1>Status</h1>
                            <h2>Intern</h2>
                        </div>
                    </div>
                    <p class="about">
                        I build accessible, pixel-perfect digital experiences for the web
                        and mobile. Currently a
                        <span class="highlight">{{ year }} {{ course }}</span> student at
                        the <span class="highlight">{{ university }}</span>, specializing in Vue.js, Node.js, and
                        UI/UX design.
                    </p>
                </div>
            </div>
            <div class="topbar-left">
                <div class="additional-info">
                    <a v-for="(link, i) in socialLinks" :key="i" :href="link.url" class="social-link"
                        :aria-label="link.name" target="_blank" rel="noopener">
                        <ion-icon :name="link.icon" class="topbar-icons"></ion-icon>
                    </a>
                    <a :href="cvUrl" class="download-cv" download aria-label="Download CV">
                        <ion-icon name="download-outline" class="topbar-icons"></ion-icon>
                    </a>
                </div>
            </div>
        </div>
        <Navbar></Navbar>
        </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";
import cvUrl from "@/assets/GericResume.pdf";
import profPic from "@/assets/pic1.png";
const socialLinks = ref([
    {
        name: "GitHub",
        url: "https://github.com/orent143",
        icon: "logo-github",
    },
    {
        name: "Facebook",
        url: "https://www.facebook.com/kurimaws214",
        icon: "logo-facebook",
    },
    {
        name: "Email",
        url: "mailto:orentgultiano11@gmail.com",
        icon: "mail-outline",
    },
]);

const aboutInfo = ref([
    { icon: "school", label: "Education", value: "BSIT - 4th Year" },
    { icon: "location", label: "Location", value: "Davao City, PH" },
    { icon: "calendar", label: "Status", value: "Open for Internship" },
]);

// optional placeholders referenced in template
const year = ref("4th-year");
const course = ref("BSIT");
const university = ref("University of the Immaculate Conception");
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
    font-weight:500;
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
  align-items: center;
  padding: 40px 0;
}

.additional-info {
    display: flex;
    gap: 20px;
    width: auto;
    height: auto;
    align-items: center;
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

.download-cv .topbar-icons {
    background: #fff7ed;
    color: #c2410c;
}

.download-cv:hover .topbar-icons {
    background: #ffedd5;
    color: #9a3412;
}

.download-cv {
    font-size: 20px;
    color: #555;
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
</style>