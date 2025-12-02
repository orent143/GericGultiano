<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import emailjs from '@emailjs/browser'
import cvUrl from './assets/GericResume.pdf'
import profilePhoto from './assets/340780198_559536669614885_4900519508961975692_n.jpg'
import solveItImage from './assets/2025-11-27(4).png'
import togethaImage from './assets/2025-11-27(3).png'

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_9v72ket' // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'template_hg82t3s' // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'NnfB3xB6YSAM__5bH' // Replace with your Public Key

// Initialize EmailJS
if (typeof window !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY)
}

const name = ref('Geric')
const title = ref('Frontend Developer')
const university = ref('University of the Immaculate Conception')
const course = ref('BS Information Technology')
const year = ref('4th Year')

// Contact Form State
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})
const isSubmitting = ref(false)
const submitMessage = ref('')

const toast = ref({
  visible: false,
  message: '',
  type: 'success'
})

// Navbar state
const isMenuOpen = ref(false)
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const showToast = (message, type = 'success', duration = 4000) => {
  toast.value = {
    visible: true,
    message,
    type
  }

  setTimeout(() => {
    toast.value.visible = false
  }, duration)
}

const showCvModal = ref(false)

const openCvModal = () => {
  showCvModal.value = true
  // prevent background scroll while modal is open
  if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'
}

const closeCvModal = () => {
  showCvModal.value = false
  if (typeof document !== 'undefined') document.body.style.overflow = ''
}

const handleKeyDownForModal = (e) => {
  if (e.key === 'Escape' && showCvModal.value) closeCvModal()
}

// listen for Escape to close modal
onMounted(() => {
  window.addEventListener('keydown', handleKeyDownForModal)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDownForModal)
})

const skills = ref([
  {
    icon: 'code-slash-outline',
    title: 'Frontend Development',
    description: 'Building responsive and interactive web applications',
    skills: ['Vue.js', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS']
  },
  {
    icon: 'phone-portrait-outline',
    title: 'Mobile Development',
    description: 'Creating cross-platform mobile applications',
    skills: ['React Native', 'Expo', 'Mobile UI/UX', 'App Deployment']
  },
  {
    icon: 'brush-outline',
    title: 'UI/UX Design',
    description: 'Designing intuitive and beautiful interfaces',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'Design Systems']
  },
  {
    icon: 'server-outline',
    title: 'Other Tools',
    description: 'Additional technologies and tools I work with',
    skills: ['Git', 'GitHub', 'VS Code']
  }
])

const projects = ref([
  {
    title: 'Solve IT Tech Solutions',
    description: 'A professional tech solutions website showcasing IT services, software development, and digital solutions for businesses.',
    tags: ['HTML', 'CSS', 'Business', 'Tech Services'],
    icon: 'code-slash-outline',
    image: solveItImage,
    liveUrl: 'https://solveittechsolutions.vercel.app/',
    githubUrl: '#'
  },
  {
    title: 'Togetha - UIC Platform',
    description: 'A collaborative university platform for the University of the Immaculate Conception, fostering student engagement and community connection.',
    tags: ['React Native', 'Vue.js', 'Education', 'Community'],
    icon: 'people-outline',
    image: togethaImage,
    liveUrl: 'https://togetha.uic.edu.ph/',
    githubUrl: '#'
  },
  {
    title: 'Portfolio Website',
    description: 'A responsive portfolio website showcasing projects and skills with modern animations, glassmorphism design, and smooth interactions.',
    tags: ['Vue.js', 'CSS3', 'Vite'],
    icon: 'briefcase-outline',
    image: 'https://placehold.co/600x400/1a1a2e/ef4444?text=Portfolio',
    liveUrl: '#',
    githubUrl: '#'
  }
])

const socialLinks = ref([
  { name: 'GitHub', url: 'https://github.com/orent143', icon: 'logo-github', value: '@yourusername' },
  { name: 'Facebook', url: 'https://www.facebook.com/kurimaws214', icon: 'logo-facebook', value: '@yourusername' },
  { name: 'Email', url: 'orentgultiano11@gmail.com', icon: 'mail', value: 'your.email@example.com' },
])

const aboutInfo = ref([
  { icon: 'school', label: 'Education', value: 'BSIT - 4th Year' },
  { icon: 'location', label: 'Location', value: 'Davao City, PH' },
  { icon: 'calendar', label: 'Status', value: 'Open for Internship' },
])

const education = ref([
  {
    degree: 'Bachelor of Science in Information Technology',
    school: 'University of the Immaculate Conception',
    period: '2022 - Present'
  },
  {
    degree: 'Senior High School',
    school: 'AMA Computer College of Davao',
    period: '2020 - 2022'
  },
  {
    degree: 'Junior High School',
    school: 'Jose Maria College Foundation, Inc.',
    period: '2016-2020'
  },
])
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Send Email Function
const sendEmail = async () => {
  if (!formData.value.name || !formData.value.email || !formData.value.subject || !formData.value.message) {
    submitMessage.value = 'Please fill in all fields'
    return
  }

  isSubmitting.value = true
  submitMessage.value = ''

  try {
    const templateParams = {
      from_name: formData.value.name,
      from_email: formData.value.email,
      subject: formData.value.subject,
      message: formData.value.message,
      to_email: 'orentgultiano11@gmail.com' // Your Gmail address
    }

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)

    showToast('Message sent successfully! I\'ll reply within 48 hours.', 'success', 4000)
    
    // Reset form
    formData.value = { name: '', email: '', subject: '', message: '' }
    
    // Clear message after 5 seconds
    setTimeout(() => {
      submitMessage.value = ''
    }, 5000)
  } catch (error) {
    console.error('Email send failed:', error)
    showToast('Failed to send message. Please try again.', 'error', 4000)
  } finally {
    isSubmitting.value = false
  }
}

</script>

<template>
  <div class="portfolio">
    <!-- Navigation -->
    <header class="navbar" :class="{ scrolled: scrolled }">
      <nav class="nav-container">
        <div class="nav-content">
          <a href="#" class="nav-brand">
            {{ name }}<span class="brand-dot">.</span>
          </a>

          <!-- Desktop Navigation -->
          <ul class="nav-links desktop-nav">
            <li><a @click="scrollToSection('about')">About</a></li>
            <li><a @click="scrollToSection('skills')">Skills</a></li>
            <li><a @click="scrollToSection('projects')">Projects</a></li>
            <li><a @click="scrollToSection('contact')">Contact</a></li>
            <a :href="cvUrl" class="download-cv" download aria-label="Download CV"> <ion-icon name="download-outline"></ion-icon> Download CV </a>
          </ul>

          <!-- Mobile Menu Button -->
          <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
            <span v-if="isMenuOpen" class="menu-icon">?</span>
            <span v-else class="menu-icon">?</span>
          </button>
        </div>

        <!-- Mobile Navigation -->
        <ul v-if="isMenuOpen" class="nav-links mobile-nav">
          <li><a @click="scrollToSection('about'); closeMenu()">About</a></li>
          <li><a @click="scrollToSection('skills'); closeMenu()">Skills</a></li>
          <li><a @click="scrollToSection('projects'); closeMenu()">Projects</a></li>
          <li><a @click="scrollToSection('contact'); closeMenu()">Contact</a></li>
        </ul>
      </nav>
    </header>

    <!-- Hero Section -->
    <section id="hero" class="hero">
      <!-- Animated Background -->
      <div class="hero-bg-animation">
        <div class="gradient-blob blob-1"></div>
        <div class="gradient-blob blob-2"></div>
        <div class="gradient-blob blob-3"></div>
        <div class="particles">
          <span v-for="n in 20" :key="n" class="particle"></span>
        </div>
      </div>

      <div class="hero-container">
        <!-- Left Column - Text Content -->
        <div class="hero-text">
          <div class="hero-intro">
            <p class="greeting">Hello, I'm</p>
            <h1 class="hero-name">{{ name }}</h1>
            <h2 class="hero-title">{{ title }}</h2>
          </div>

          <p class="hero-description">
            I build accessible, pixel-perfect digital experiences for the web and mobile. 
            Currently a <span class="highlight">{{ year }} {{ course }}</span> student at the 
            <span class="highlight">{{ university }}</span>, specializing in Vue.js, React Native, and UI/UX design.
          </p>

          <div class="hero-social">
            <a 
              v-for="link in socialLinks" 
              :key="link.name" 
              :href="link.url" 
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              :aria-label="link.name"
            >
              <ion-icon :name="link.icon"></ion-icon>
            </a>
          </div>

          <div class="hero-buttons">
            <button class="btn btn-primary" @click="scrollToSection('projects')">View My Work</button>
<button type="button" class="btn btn-secondary" @click="openCvModal" aria-label="View CV">
              <ion-icon name="document-text-outline"></ion-icon> View CV
            </button>
          </div>
        </div>

        <!-- Right Column - Profile Photo -->
        <div class="hero-visual">
          <div class="profile-photo-container">
            <div class="photo-glow"></div>
            <div class="photo-ring"></div>
            <img :src="profilePhoto" alt="Geric's Profile Photo" class="profile-photo" />
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <a href="#about" class="scroll-indicator" @click.prevent="scrollToSection('about')" aria-label="Scroll to about section">
        <span class="scroll-arrow">?</span>
      </a>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="about-container">
        <!-- Section Label -->
        <div class="section-label">
          <div class="label-line"></div>
          <h2 class="label-text">About</h2>
        </div>

        <!-- Content -->
        <div class="about-content">
          <div class="about-text">
            <p class="about-intro">
              I'm a passionate frontend developer who loves crafting beautiful, functional user interfaces. 
              My journey in tech started with curiosity about how websites work, and it has grown into a 
              deep passion for creating seamless digital experiences.
            </p>

            <p class="about-body">
              Currently pursuing my <span class="text-highlight">{{ course }}</span> at the 
              {{ university }}, I've been honing my skills in frontend development and UI/UX design. 
              I believe in writing clean, maintainable code and creating interfaces that are both 
              beautiful and accessible.
            </p>

            <p class="about-body">
              When I'm not coding, you can find me exploring new design trends on Dribbble, 
              Pinterest, Behance or learning new technologies to expand my toolkit.
            </p>
          </div>

          <!-- Info Cards -->
          <div class="about-cards">
            <div v-for="info in aboutInfo" :key="info.label" class="info-card">
              <ion-icon :name="info.icon" class="info-icon"></ion-icon>
              <div class="info-text">
                <p class="info-label">{{ info.label }}</p>
                <p class="info-value">{{ info.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="skills">
      <div class="skills-container">
        <!-- Section Label -->
        <div class="section-label">
          <div class="label-line"></div>
          <h2 class="label-text">Skills</h2>
        </div>

        <!-- Content -->
        <div class="skills-grid">
          <div v-for="category in skills" :key="category.title" class="skill-card">
            <div class="skill-card-inner">
              <div class="skill-icon-wrapper">
                <ion-icon :name="category.icon"></ion-icon>
              </div>
              <div class="skill-content">
                <div class="skill-header">
                  <h3 class="skill-title">{{ category.title }}</h3>
                  <p class="skill-description">{{ category.description }}</p>
                </div>
                <div class="skill-tags">
                  <span v-for="skill in category.skills" :key="skill" class="skill-tag">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects">
      <div class="projects-container">
        <!-- Section Label -->
        <div class="section-label">
          <div class="label-line"></div>
          <h2 class="label-text">Recent Projects</h2>
        </div>

        <!-- Content -->
        <div class="projects-content">
          <div class="projects-grid">
            <div 
              v-for="(project, index) in projects" 
              :key="project.title" 
              class="project-card"
              :class="{ 'project-card--featured': index === 1 }"
            >
              <div class="project-card-glow" v-if="index === 1"></div>
              <div class="project-image-wrapper">
                <img :src="project.image" :alt="project.title" class="project-image" />
              </div>
              <div class="project-badge" v-if="index === 1">
                <ion-icon name="star"></ion-icon>
                Featured
              </div>
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
              </div>

              <a :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="project-curve-btn">
                <div class="curve-bg"></div>
                <div class="curve-icon">
                  <ion-icon name="arrow-forward"></ion-icon>
                </div>
              </a>
             
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="education" class="education">
      <div class="education-container">
        <div class="section-label">
          <div class="label-line"></div>
          <h2 class="label-text">Education</h2>
        </div>

        <div class="education-content">
          <div class="education-timeline">
            <div v-for="(edu, index) in education" :key="edu.school" class="timeline-item">
              <div class="timeline-marker">
                <div class="marker-dot"></div>
                <div v-if="index !== education.length - 1" class="marker-line"></div>
              </div>
              <div class="timeline-card">
                <div class="timeline-period">
                  <ion-icon name="calendar-outline"></ion-icon>
                  {{ edu.period }}
                </div>
                <h3 class="timeline-degree">{{ edu.degree }}</h3>
                <div class="timeline-school">
                  <ion-icon name="school-outline"></ion-icon>
                  {{ edu.school }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
      <div class="contact-container">
        <!-- Section Label -->
        <div class="section-label">
          <div class="label-line"></div>
          <h2 class="label-text">Contact</h2>
        </div>

        <!-- Content -->
        <div class="contact-content">
          <div class="contact-text">
            <h3 class="contact-heading">
              If you'd like to discuss an opportunity or just say hi, I'm always down to chat.
            </h3>
            <p class="contact-description">
              I'm currently looking for internship opportunities where I can contribute, learn, and grow. 
              If you have a position that matches my skills or just want to connect, feel free to reach out!
            </p>
          </div>

          <a href="mailto:your.email@example.com" class="contact-btn">
            <ion-icon name="mail"></ion-icon> Get In Touch
          </a>

          <div class="contact-links-section">
            <div class="contact-combined-card">
              <div class="contact-card-content">
                <!-- Left: Header + Form -->
                <div class="contact-form-section">
                  <div class="contact-card-header">
                    <h3 class="contact-card-text">Fill out the Form</h3>
                    <h4 class="contact-card-subtext">I'll usually reply within 48 hours.</h4>
                  </div>
                  <form class="contact-form" @submit.prevent="sendEmail">
                    <input type="text" v-model="formData.name" placeholder="Your name" class="contact-input" required />
                    <input type="email" v-model="formData.email" placeholder="your.email@example.com" class="contact-input" required />
                    <input type="text" v-model="formData.subject" placeholder="Subject" class="contact-input" required />
                    <textarea v-model="formData.message" rows="5" placeholder="Write your message..." class="contact-textarea" required></textarea>
                    <button type="submit" class="contact-submit" :disabled="isSubmitting">
                      {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                    </button>
                    <p v-if="submitMessage" class="submit-message">{{ submitMessage }}</p>
                  </form>
                </div>

                <!-- Right: Map (full height) -->
                <div class="contact-map-wrapper">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56493835084!2d125.54aborada8087!3d7.0706717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d9f519e327f%3A0x6f5f3a0c3b8f0f0!2sDavao%20City%2C%20Davao%20del%20Sur%2C%20Philippines!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%" 
                    height="100%" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"
                    class="contact-map"
                  ></iframe>
                  <div class="map-overlay">
                    <ion-icon name="location"></ion-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="contact-footer">
            <p>© 2025 {{ name }}. Built with Vue.js & ❤️</p>
          </div>
        </div>
      </div>
    </section>
    <Transition name="toast-slide">
      <div v-if="toast.visible" class="toast" :class="`toast-${toast.type}`">
        <div class="toast-content">
          <ion-icon 
            v-if="toast.type === 'success'" 
            name="checkmark-circle" 
            class="toast-icon"
          ></ion-icon>
          <ion-icon 
            v-else-if="toast.type === 'error'" 
            name="alert-circle" 
            class="toast-icon"
          ></ion-icon>
          <ion-icon 
            v-else 
            name="information-circle" 
            class="toast-icon"
          ></ion-icon>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
        <button class="toast-close" @click="toast.visible = false">
          <ion-icon name="close"></ion-icon>
        </button>
      </div>
    </Transition>
        <transition name="modal-fade">
      <div v-if="showCvModal" class="cv-modal-backdrop" @click.self="closeCvModal" role="dialog" aria-modal="true" aria-label="View CV">
        <div class="cv-modal">
          <header class="cv-modal-header">
            <h3>Curriculum Vitae — {{ name }}</h3>
            <button class="cv-modal-close" @click="closeCvModal" aria-label="Close CV viewer">
              <ion-icon name="close"></ion-icon>
            </button>
          </header>

          <div class="cv-modal-body">
            <!-- use iframe so PDF is viewable in-browser -->
            <iframe :src="cvUrl" frameborder="0" class="cv-iframe" title="CV viewer"></iframe>
          </div>

          <footer class="cv-modal-footer">
            <a :href="cvUrl" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">Open in new tab</a>
            <button class="btn btn-primary" @click="closeCvModal">Close</button>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
/* Import Inter Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

/* CSS Variables for theming - Orange/Purple/Red Dark Palette */
:root {
  --primary-color: #f97316;
  --primary-light: #fb923c;
  --primary-dark: #ea580c;
  --secondary-color: #a855f7;
  --accent-color: #ef4444;
  --text-color: #ffffff;
  --text-light: #e5e5e5;
  --text-muted: #a3a3a3;
  --bg-color: #0a0a0a;
  --bg-light: #141414;
  --bg-dark: #000000;
  --card-bg: rgba(20, 20, 20, 0.8);
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -2px rgba(0, 0, 0, 0.5);
  --card-shadow-lg: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
  --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fast: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --gradient-primary: linear-gradient(135deg, #f97316 0%, #a855f7 50%, #ef4444 100%);
  --gradient-secondary: linear-gradient(135deg, #7c3aed 0%, #f97316 100%);
  --gradient-glass: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  --border-color: rgba(255, 255, 255, 0.1);
  --border-radius: 16px;
  --border-radius-lg: 24px;
  --glow-orange: 0 0 40px rgba(249, 115, 22, 0.3);
  --glow-purple: 0 0 40px rgba(168, 85, 247, 0.3);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.portfolio {
  overflow-x: hidden;
}

/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: var(--transition);
  background: transparent;
  padding: 0.75rem 0;
}

.navbar.scrolled {
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.75rem 2rem;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  font-size: 1.6rem;
  font-weight: 800;
  font-family: monospace;
  color: var(--text-color);
  text-decoration: none;
  transition: var(--transition);
  letter-spacing: -0.03em;
  position: relative;
}

.nav-brand:hover {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-dot {
  color: var(--primary-color);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2.5rem;
  align-items: center;
}

.nav-links.desktop-nav {
  display: flex;
}

.nav-links.mobile-nav {
  display: none;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-light);
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  padding: 0.5rem 0;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-primary);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.nav-links a:hover::after {
  width: 100%;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-color);
  transition: var(--transition);
  border-radius: 8px;
}

.menu-toggle:hover {
  color: var(--primary-color);
  background: var(--bg-light);
}

.menu-icon {
  font-size: 1.5rem;
}

/* Responsive Navigation */
@media (max-width: 768px) {
  .nav-links.desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .nav-links.mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
    padding: 1.5rem;
    background: var(--bg-color);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    box-shadow: var(--card-shadow-lg);
  }

  .nav-links.mobile-nav a {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: var(--transition);
  }

  .nav-links.mobile-nav a:hover {
    background: var(--bg-light);
  }
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  padding-top: 7rem;
  position: relative;
  background: radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a0a 100%);
  overflow: hidden;
}

/* Animated Linear Background */
.hero-bg-animation {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(-45deg, rgba(249,115,22,0.15) 0%, rgba(168,85,247,0.12) 25%, rgba(239,68,68,0.1) 50%, rgba(124,58,237,0.08) 75%, rgba(249,115,22,0.15) 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Floating particles with varied colors */
.particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--primary-color);
  border-radius: 50%;
  animation: float-up 8s ease-in-out infinite;
  opacity: 0;
}

.particle:nth-child(odd) {
  background: var(--secondary-color);
}

.particle:nth-child(3n) {
  background: var(--accent-color);
  width: 3px;
  height: 3px;
}

.particle:nth-child(1) { left: 5%; animation-delay: 0s; }
.particle:nth-child(2) { left: 10%; animation-delay: 0.5s; }
.particle:nth-child(3) { left: 15%; animation-delay: 1s; }
.particle:nth-child(4) { left: 20%; animation-delay: 1.5s; }
.particle:nth-child(5) { left: 25%; animation-delay: 2s; }
.particle:nth-child(6) { left: 30%; animation-delay: 0.3s; }
.particle:nth-child(7) { left: 35%; animation-delay: 0.8s; }
.particle:nth-child(8) { left: 40%; animation-delay: 1.3s; }
.particle:nth-child(9) { left: 45%; animation-delay: 1.8s; }
.particle:nth-child(10) { left: 50%; animation-delay: 0.2s; }
.particle:nth-child(11) { left: 55%; animation-delay: 0.7s; }
.particle:nth-child(12) { left: 60%; animation-delay: 1.2s; }
.particle:nth-child(13) { left: 65%; animation-delay: 1.7s; }
.particle:nth-child(14) { left: 70%; animation-delay: 0.4s; }
.particle:nth-child(15) { left: 75%; animation-delay: 0.9s; }
.particle:nth-child(16) { left: 80%; animation-delay: 1.4s; }
.particle:nth-child(17) { left: 85%; animation-delay: 1.9s; }
.particle:nth-child(18) { left: 90%; animation-delay: 0.6s; }
.particle:nth-child(19) { left: 93%; animation-delay: 1.1s; }
.particle:nth-child(20) { left: 97%; animation-delay: 1.6s; }

@keyframes float-up {
  0% { 
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% { 
    opacity: 0.8;
    transform: translateY(90vh) scale(1);
  }
  90% { 
    opacity: 0.6;
  }
  100% { 
    transform: translateY(-10vh) scale(0.5);
    opacity: 0;
  }
}

/* Wavy Background */
.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.15), transparent),
    radial-gradient(ellipse 60% 30% at 80% 50%, rgba(168, 85, 247, 0.12), transparent),
    radial-gradient(ellipse 60% 30% at 20% 80%, rgba(239, 68, 68, 0.1), transparent);
  pointer-events: none;
  z-index: 1;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 150px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%230a0a0a' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom;
  background-size: cover;
  pointer-events: none;
  z-index: 1;
}

.hero-container {
  max-width: 1280px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 3;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.hero-intro {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.greeting {
  color: var(--primary-color);
  font-family: 'Inter', monospace;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
}

.greeting::before {
  content: '< ';
  color: var(--secondary-color);
}

.greeting::after {
  content: ' />';
  color: var(--secondary-color);
}

.hero-name {
  font-size: clamp(3.5rem, 8vw, 5.5rem);
  font-weight: 900;
  color: var(--text-color);
  line-height: 1.05;
  letter-spacing: -0.04em;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 80px rgba(249, 115, 22, 0.3);
  animation: glow-text 3s ease-in-out infinite alternate;
}

@keyframes glow-text {
  from { filter: drop-shadow(0 0 20px rgba(249, 115, 22, 0.3)); }
  to { filter: drop-shadow(0 0 40px rgba(168, 85, 247, 0.4)); }
}

.hero-title {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: var(--text-light);
  font-weight: 500;
  letter-spacing: 0.02em;
  opacity: 0.9;
}

.hero-description {
  color: var(--text-light);
  line-height: 1.8;
  max-width: 36rem;
  font-size: 1.05rem;
}

.hero-description .highlight {
  color: var(--primary-color);
  font-weight: 600;
}

.hero-social {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 0.5rem;
}

.social-icon {
  color: var(--text-muted);
  transition: var(--transition);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--gradient-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.social-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-primary);
  opacity: 0;
  transition: var(--transition);
}

.social-icon:hover {
  color: white;
  border-color: transparent;
  transform: translateY(-4px) scale(1.05);
  box-shadow: var(--glow-orange);
}

.social-icon:hover::before {
  opacity: 1;
}

.social-icon ion-icon {
  font-size: 22px;
  position: relative;
  z-index: 1;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1rem;
}

.btn {
  padding: 1rem 2.25rem;
  border: none;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
  letter-spacing: 0.01em;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 4px 20px -4px rgba(249, 115, 22, 0.5);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: 0.5s;
}

.btn-primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 35px -5px rgba(249, 115, 22, 0.5);
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-secondary {
  background: var(--gradient-glass);
  backdrop-filter: blur(10px);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--gradient-primary);
  border-color: transparent;
  color: white;
  transform: translateY(-3px);
  box-shadow: var(--glow-purple);
}
.btn-secondary ion-icon { 
  margin-right: 0.6rem; 
  font-size: 1.1rem; 
  vertical-align: middle; 
}


/* Hero Profile Photo */
.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
}

.profile-photo-container {
  position: relative;
  width: 400px;
  height: 400px;
  transform-style: preserve-3d;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotateY(0); }
  50% { transform: translateY(-15px) rotateY(5deg); }
}

.photo-glow {
  position: absolute;
  inset: -30px;
  background: conic-gradient(from 0deg, var(--primary-color), var(--secondary-color), var(--accent-color), var(--primary-color));
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0.5;
  animation: rotate-glow 8s linear infinite;
}

@keyframes rotate-glow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.photo-ring {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, var(--primary-color), var(--secondary-color), var(--accent-color), var(--secondary-color), var(--primary-color));
  animation: ringRotate 6s linear infinite;
}

.photo-ring::before {
  content: '';
  position: absolute;
  inset: 6px;
  background: var(--bg-color);
  border-radius: 50%;
}

@keyframes ringRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.profile-photo {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid var(--bg-light);
  box-shadow: 
    0 0 0 1px rgba(255,255,255,0.1),
    0 25px 50px -12px rgba(0, 0, 0, 0.8),
    inset 0 0 30px rgba(0,0,0,0.3);
  z-index: 2;
  transition: var(--transition);
}

.profile-photo-container:hover .profile-photo {
  transform: scale(1.03);
  box-shadow: 
    0 0 0 1px rgba(255,255,255,0.2),
    0 35px 70px -15px rgba(249, 115, 22, 0.4),
    inset 0 0 30px rgba(0,0,0,0.3);
}

.profile-photo-container:hover .photo-glow {
  opacity: 0.7;
  filter: blur(60px);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-muted);
  transition: var(--transition);
  animation: bounce 2s ease-in-out infinite;
  text-decoration: none;
  z-index: 10;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--gradient-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.scroll-indicator:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
  box-shadow: var(--glow-orange);
  transform: translateX(-50%) scale(1.1);
}

.scroll-arrow {
  font-size: 1.5rem;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-8px); }
  60% { transform: translateX(-50%) translateY(-4px); }
}

/* Responsive Hero */
@media (max-width: 1023px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-visual {
    order: -1;
    margin-bottom: 2rem;
  }
  
  .profile-photo-container {
    width: 280px;
    height: 280px;
  }
  
  .hero-text {
    align-items: center;
  }
  
  .hero-description {
    text-align: center;
  }
  
  .hero-social {
    justify-content: center;
  }
  
  .hero-buttons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .profile-photo-container {
    width: 220px;
    height: 220px;
  }
}

/* Section Title */
.section-title {
  font-size: 2.75rem;
  text-align: center;
  margin-bottom: 3.5rem;
  color: var(--text-color);
  position: relative;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: var(--gradient-primary);
  margin: 1.25rem auto 0;
  border-radius: 4px;
}

/* About Section */
.about {
  padding: 7rem 2rem;
  background: var(--bg-color);
  position: relative;
}

.about-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 4rem;
}

.section-label {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.label-line {
  width: 5rem;
  height: 3px;
  background: var(--gradient-primary);
  margin-top: 0.5rem;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
}

.label-text {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--primary-color);
  text-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.about-intro {
  font-size: 1.25rem;
  color: var(--text-color);
  line-height: 1.8;
  font-weight: 500;
}

.about-body {
  color: var(--text-light);
  line-height: 1.85;
  font-size: 1.05rem;
}

.text-highlight {
  color: var(--primary-color);
  font-weight: 600;
}

.about-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  padding-top: 1rem;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.75rem;
  background: var(--gradient-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: var(--gradient-primary);
  transform: scaleY(0);
  transition: var(--transition);
}

.info-card:hover {
  border-color: rgba(249, 115, 22, 0.3);
  box-shadow: var(--glow-orange);
  transform: translateY(-4px) translateX(4px);
}

.info-card:hover::before {
  transform: scaleY(1);
}

.info-icon {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.info-card ion-icon {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.info-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: 0.95rem;
  color: var(--text-color);
  font-weight: 600;
}

/* About Responsive */
@media (max-width: 1023px) {
  .about-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .section-label {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .about-cards {
    grid-template-columns: 1fr;
  }
}

/* Skills Section */
.skills {
  padding: 7rem 2rem;
  background: var(--bg-light);
  position: relative;
}

.skills::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
}

.skills-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 4rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.skill-card {
  padding: 2rem;
  background: var(--gradient-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.skill-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}

.skill-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(249,115,22,0.1), transparent 50%);
  opacity: 0;
  transition: var(--transition);
}

.skill-card:hover {
  border-color: rgba(249, 115, 22, 0.3);
  box-shadow: 
    0 25px 50px -12px rgba(0,0,0,0.5),
    0 0 40px rgba(249, 115, 22, 0.1);
  transform: translateY(-8px);
}

.skill-card:hover::before {
  transform: scaleX(1);
}

.skill-card:hover::after {
  opacity: 1;
}

.skill-card-inner {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}

.skill-icon-wrapper {
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(168, 85, 247, 0.15));
  border-radius: var(--border-radius);
  transition: var(--transition);
  position: relative;
  z-index: 1;
}

.skill-card:hover .skill-icon-wrapper {
  background: var(--gradient-primary);
  transform: scale(1.1) rotate(-5deg);
  box-shadow: var(--glow-orange);
}

.skill-icon {
  font-size: 1.75rem;
  display: block;
  color: var(--primary-color);
}

.skill-card:hover .skill-icon {
  filter: brightness(0) invert(1);
}

.skill-card ion-icon {
  font-size: 1.75rem;
  color: var(--primary-color);
  transition: var(--transition);
}

.skill-card:hover ion-icon {
  color: white;
}

.skill-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.skill-header {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.skill-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-color);
  letter-spacing: -0.01em;
}

.skill-description {
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.5;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  padding: 0.35rem 0.875rem;
  font-size: 0.8rem;
  background: var(--bg-light);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 9999px;
  font-weight: 500;
  transition: var(--transition);
}

.skill-card:hover .skill-tag {
  border-color: var(--primary-light);
  background: rgba(249, 115, 22, 0.1);
}

/* Skills Responsive */
@media (max-width: 1023px) {
  .skills-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}

/* Projects Section */
.projects {
  padding: 7rem 2rem;
  background: var(--bg-color);
  position: relative;
  overflow: hidden;
}

.projects::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.projects-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 4rem;
}

.projects-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* Projects Grid - 3 Cards */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  align-items: stretch;
}

/* Project Card Base */
.project-card {
  padding: 2rem;
  padding-bottom: 2.5rem;
  background: var(--gradient-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 380px;
}

.project-card::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-secondary);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.5s ease;
}

.project-card:hover {
  border-color: rgba(168, 85, 247, 0.3);
  box-shadow: 
    0 25px 50px -12px rgba(0,0,0,0.5),
    0 0 40px rgba(168, 85, 247, 0.15);
  transform: translateY(-8px);
}

.project-card:hover::before {
  transform: scaleX(1);
}

/* Featured/Middle Card - Highlighted */
.project-card--featured {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
  border: 2px solid rgba(249, 115, 22, 0.4);
  transform: scale(1.05);
  z-index: 2;
  padding: 2.5rem 2rem;
  padding-bottom: 3rem;
  min-height: 420px;
}

.project-card--featured .project-curve-btn {
  width: 90px;
  height: 90px;
}

.project-card--featured .curve-icon {
  bottom: 14px;
  right: 14px;
  width: 45px;
  height: 45px;
}

.project-card--featured .curve-icon ion-icon {
  font-size: 1.4rem;
}

.project-card--featured .project-curve-btn:hover .curve-bg {
  width: 100px;
  height: 100px;
}
.project-card--featured::before {
  height: 4px;
  background: var(--gradient-primary);
  transform: scaleX(1);
}

.project-card--featured::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
}

.project-card--featured:hover {
  transform: scale(1.08) translateY(-8px);
  border-color: rgba(249, 115, 22, 0.6);
  box-shadow: 
    0 30px 60px -15px rgba(0,0,0,0.6),
    0 0 60px rgba(249, 115, 22, 0.25),
    0 0 100px rgba(168, 85, 247, 0.15);
}

/* Featured Card Glow */
.project-card-glow {
  position: absolute;
  inset: -50px;
  background: conic-gradient(from 0deg, var(--primary-color), var(--secondary-color), var(--accent-color), var(--primary-color));
  opacity: 0.15;
  filter: blur(60px);
  animation: rotate-glow 10s linear infinite;
  z-index: -1;
}

/* Project Image Wrapper */
.project-image-wrapper {
  width: 100%;
  height: 200px;
  margin: 0 auto 1.5rem;
  border-radius: var(--border-radius);
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-color);
}

.project-image-wrapper::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40%; /* adjust for stronger/weaker fade */
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(10, 10, 10, 0) 0%,
    rgba(10, 10, 10, 0.432) 30%,
    var(--bg-color) 100%
  );
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  transition: opacity 0.35s ease;
  z-index: 3;
}

.project-card--featured .project-image-wrapper::after {
  background: linear-gradient(
    180deg,
    rgba(10, 10, 10, 0) 0%,
    rgba(10, 10, 10, 0.541) 30%,
    var(--bg-color) 100%
  );
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-card--featured .project-image-wrapper {
  height: 200px;
  border: 2px solid rgba(249, 115, 22, 0.3);
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.2);
}

/* Project Icon Wrapper (legacy) */
.project-icon-wrapper {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: var(--gradient-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  position: relative;
}

.project-icon-wrapper::before {
  content: '';
  position: absolute;
  inset: -3px;
  background: var(--gradient-primary);
  border-radius: 50%;
  opacity: 0;
  z-index: -1;
  transition: var(--transition);
}

.project-card:hover .project-icon-wrapper {
  transform: scale(1.1) rotate(-5deg);
}

.project-card:hover .project-icon-wrapper::before {
  opacity: 1;
}

.project-card--featured .project-icon-wrapper {
  width: 90px;
  height: 90px;
  background: var(--gradient-primary);
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.3);
}

.project-icon {
  font-size: 2.5rem;
  color: white;
  transition: var(--transition);
}

.project-card--featured .project-icon {
  font-size: 2.8rem;
}

.project-card:hover .project-icon {
  transform: scale(1.1);
}

/* Project Badge */
.project-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.9rem;
  background: var(--gradient-primary);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 9999px;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
}

.project-badge ion-icon {
  font-size: 0.8rem;
}

/* Project Title */
.project-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-color);
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.project-card--featured .project-title {
  font-size: 1.35rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Project Description */
.project-description {
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.7;
  margin-bottom: 1.25rem;
  flex: 1;
}

.project-card--featured .project-description {
  font-size: 0.95rem;
}

/* Project Tags */
.project-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0;
  padding-bottom: 1rem;
}

.project-tag {
  padding: 0.35rem 0.875rem;
  font-size: 0.75rem;
  background: var(--bg-light);
  color: var(--text-color);
  border-radius: 9999px;
  font-weight: 500;
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.project-card:hover .project-tag {
  border-color: var(--secondary-color);
  background: rgba(168, 85, 247, 0.1);
}

.project-card--featured .project-tag {
  border-color: rgba(249, 115, 22, 0.4);
  background: rgba(249, 115, 22, 0.1);
}

.project-card--featured:hover .project-tag {
  border-color: var(--primary-color);
  background: rgba(249, 115, 22, 0.2);
}

/* Project Links */
.project-links {
  display: none;
}
/* Curved Live Demo Button */
.project-curve-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 80px;
  height: 80px;
  cursor: pointer;
  text-decoration: none;
  z-index: 5;
}

.curve-bg {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-secondary);
  border-top-left-radius: 100%;
  transition: var(--transition);
}

.project-card--featured .curve-bg {
  background: var(--gradient-primary);
}

.curve-icon {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.curve-icon ion-icon {
  font-size: 1.2rem;
  color: var(--primary-color);
  transform: rotate(-45deg);
  transition: var(--transition);
}

.project-card--featured .curve-icon ion-icon {
  color: var(--primary-dark);
}

.project-curve-btn:hover .curve-bg {
  width: 90px;
  height: 90px;
}

.project-curve-btn:hover .curve-icon {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.project-curve-btn:hover .curve-icon ion-icon {
  transform: rotate(0deg);
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-light);
  text-decoration: none;
  transition: var(--transition);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid transparent;
}

.project-link ion-icon {
  font-size: 1rem;
}

.project-link:hover {
  color: var(--primary-color);
  background: rgba(249, 115, 22, 0.1);
  border-color: rgba(249, 115, 22, 0.3);
}

.project-link--primary {
  background: var(--gradient-glass);
  border: 1px solid var(--border-color);
}

.project-link--primary:hover {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
}

.project-card--featured .project-link--primary {
  background: var(--gradient-primary);
  color: white;
  border: none;
}

.project-card--featured .project-link--primary:hover {
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.4);
  transform: translateY(-2px);
}

/* Projects Responsive */
@media (max-width: 1200px) {
  .projects-grid {
    gap: 1.5rem;
  }
  
  .project-card--featured {
    transform: scale(1.03);
  }
  
  .project-curve-btn {
    width: 70px;
    height: 70px;
  }
  
  .curve-icon {
    bottom: 10px;
    right: 10px;
    width: 35px;
    height: 35px;
  }
  
  .curve-icon ion-icon {
    font-size: 1rem;
  }
}


@media (max-width: 1023px) {
  .projects-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .project-card--featured {
    transform: scale(1);
    order: -1;
  }
  
  .project-card--featured:hover {
    transform: translateY(-8px);
  }
  
  .project-curve-btn {
    width: 80px;
    height: 80px;
  }
  
  .curve-icon {
    bottom: 12px;
    right: 12px;
    width: 40px;
    height: 40px;
  }
}

/* Education styles */
.education {
  padding: 7rem 2rem;
  background: var(--bg-light);
  position: relative;
}

.education::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
}

.education-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 4rem;
}

.education-content {
  display: flex;
  flex-direction: column;
}

.education-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-item {
  display: flex;
  gap: 1.5rem;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.5rem;
}

.marker-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--gradient-primary);
  box-shadow: 
    0 0 0 4px rgba(249, 115, 22, 0.2),
    0 0 20px rgba(249, 115, 22, 0.4);
  position: relative;
  z-index: 2;
  transition: var(--transition);
}

.timeline-item:hover .marker-dot {
  transform: scale(1.3);
  box-shadow: 
    0 0 0 6px rgba(249, 115, 22, 0.3),
    0 0 30px rgba(249, 115, 22, 0.5);
}

.marker-line {
  width: 2px;
  flex: 1;
  min-height: 100%;
  background: linear-gradient(180deg, var(--primary-color) 0%, var(--border-color) 100%);
  margin-top: 0.5rem;
}

.timeline-card {
  flex: 1;
  padding: 1.75rem 2rem;
  background: var(--gradient-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  margin-bottom: 1.5rem;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.timeline-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--gradient-primary);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.5s ease;
}

.timeline-item:hover .timeline-card {
  border-color: rgba(249, 115, 22, 0.3);
  box-shadow: 
    0 20px 40px -10px rgba(0,0,0,0.4),
    0 0 30px rgba(249, 115, 22, 0.1);
  transform: translateX(12px);
}

.timeline-item:hover .timeline-card::before {
  transform: scaleY(1);
}

.timeline-period {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(168, 85, 247, 0.1));
  color: var(--primary-color);
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 9999px;
  margin-bottom: 1rem;
  border: 1px solid rgba(249, 115, 22, 0.3);
}

.timeline-period ion-icon {
  font-size: 1rem;
}

.timeline-degree {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
}

.timeline-school {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  font-size: 0.95rem;
  font-weight: 500;
}

.timeline-school ion-icon {
  font-size: 1.1rem;
  color: var(--primary-light);
}

/* Education Responsive */
@media (max-width: 1023px) {
  .education-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 640px) {
  .timeline-item {
    gap: 1rem;
  }

  .timeline-card {
    padding: 1.25rem;
  }

  .timeline-degree {
    font-size: 1.05rem;
  }
}

/* Contact Section */
.contact {
  padding: 7rem 2rem;
  background: var(--bg-color);
  position: relative;
}

.contact::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
}

.contact-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 4rem;
}

.contact-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.contact-text {
  max-width: 48rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-heading {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.4;
  letter-spacing: -0.02em;
}

.contact-description {
  color: var(--text-light);
  line-height: 1.8;
  font-size: 1.05rem;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1.25rem 2.5rem;
  background: var(--gradient-primary);
  color: white;
  font-weight: 700;
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: var(--transition);
  width: fit-content;
  box-shadow: 0 4px 25px -4px rgba(249, 115, 22, 0.5);
  font-size: 1.05rem;
  position: relative;
  overflow: hidden;
}

.contact-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: 0.5s;
}

.contact-btn ion-icon {
  font-size: 1.5rem;
}

.contact-btn:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 
    0 20px 40px -8px rgba(249, 115, 22, 0.5),
    0 0 50px rgba(249, 115, 22, 0.3);
}

.contact-btn:hover::before {
  left: 100%;
}

.contact-links-section {
  padding-top: 2.5rem;
  border-top: 1px solid var(--border-color);
}

/* Combined contact card with form and map */
.contact-combined-card {
  background: var(--gradient-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  color: var(--text-light);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.contact-combined-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: var(--gradient-primary);
  transform: scaleY(0);
  transition: var(--transition);
}

.contact-combined-card:hover {
  border-color: rgba(249, 115, 22, 0.3);
  box-shadow: var(--glow-orange);
}

.contact-combined-card:hover::before {
  transform: scaleY(1);
}

.contact-card-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 450px;
}

/* Left section with header and form */
.contact-form-section {
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

/* Card header with title and subtext */
.contact-card-header {
  margin-bottom: 1.5rem;
}

.contact-card-text {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
  font-family: monospace;
  margin: 0 0 0.5rem 0;
}

.contact-card-subtext {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-light);
  line-height: 1.3;
  opacity: 0.85;
}

.contact-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;;
  gap: 0.75rem;
}

.contact-input,
.contact-textarea {
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border-color);
  color: var(--text-light);
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: 'Inter', monospace;
  transition: var(--transition);
}

.contact-input::placeholder,
.contact-textarea::placeholder {
  color: rgba(255,255,255,0.5);
}

.contact-input:focus,
.contact-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.08);
}

.contact-textarea {
  min-height: 100px;
  resize: vertical;
  flex: 1;
}

.contact-submit {
  align-self: flex-start;
  padding: 0.6rem 1.25rem;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Inter', monospace;
  font-weight: 500;
  margin-top: 0.25rem;
  transition: var(--transition);
}

.contact-submit:hover {
  transform: translateY(-3px);
  box-shadow: var(--glow-orange);
}

/* Map Styles - Full height on right side */
.contact-map-wrapper {
  position: relative;
  overflow: hidden;
  border-top-right-radius: var(--border-radius-lg);
  border-bottom-right-radius: var(--border-radius-lg);
}

.contact-map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: grayscale(0.3) contrast(1.1);
  transition: var(--transition);
}

.contact-combined-card:hover .contact-map {
  filter: grayscale(0) contrast(1);
}

.map-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.5);
  pointer-events: none;
  animation: pulse-location 2s ease-in-out infinite;
}

.map-overlay ion-icon {
  font-size: 1.5rem;
  color: white;
}

@keyframes pulse-location {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 4px 20px rgba(249, 115, 22, 0.5);
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 4px 30px rgba(249, 115, 22, 0.7);
  }
}

.contact-footer {
  padding-top: 4rem;
  text-align: left;
}

.contact-footer p {
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* Contact Responsive */
@media (max-width: 1023px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .contact-heading {
    font-size: 1.5rem;
  }

  .contact-card-content {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .contact-map-wrapper {
    min-height: 300px;
    border-radius: var(--border-radius);
    position: relative;
  }

  .contact-map {
    position: relative;
  }
}

@media (max-width: 640px) {
  .contact-form-section {
    padding: 1.5rem;
  }

  .contact-card-text {
    font-size: 1.4rem;
  }

  .contact-footer {
    text-align: center;
  }
}

/* Responsive Design */
@media (max-width: 1023px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-text {
    align-items: center;
  }

  .hero-description {
    text-align: center;
  }

  .hero-social {
    justify-content: center;
  }

  .hero-buttons {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-name {
    font-size: 2.75rem;
  }

  .hero-title {
    font-size: 1.25rem;
  }

  .section-title {
    font-size: 2.25rem;
  }

  .hero {
    padding: 4rem 1.5rem;
    padding-top: 6rem;
  }

  .about,
  .skills,
  .projects,
  .contact {
    padding: 5rem 1.5rem;
  }
}
.cv-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2,6,23,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 120;
  padding: 1.5rem;
}

.cv-modal {
  width: min(1100px, 96%);
  height: min(820px, 90%);
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
  border-radius: 14px;
  border: 1px solid var(--border-color);
  box-shadow: 0 30px 80px rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cv-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  background: linear-gradient(90deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005));
}

.cv-modal-header h3 {
  margin: 0;
  font-size: 1.05rem;
  color: var(--text-light);
  font-weight: 700;
}

.cv-modal-close {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.25rem;
  padding: 0.35rem;
  border-radius: 8px;
  cursor: pointer;
}

.cv-modal-body {
  flex: 1;
  background: var(--bg-color);
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

.cv-iframe {
  width: 100%;
  height: 100%;
  border: 0;
  background: white;
}

.cv-modal-footer {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem 1rem;
  border-top: 1px solid rgba(255,255,255,0.03);
  background: linear-gradient(90deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005));
}

/* modal transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.995);
}

@media (max-width: 720px) {
  .cv-modal {
    height: calc(100% - 3rem);
  }
  .cv-modal-footer {
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 1rem;
  }
}

.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  max-width: 400px;
  padding: 1rem 1.5rem;
  background: var(--gradient-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  z-index: 100;
  animation: slideInRight 0.3s ease-out;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.toast-success {
  border-left: 4px solid #10b981;
}

.toast-success .toast-icon {
  color: #10b981;
  font-size: 1.5rem;
}

.toast-error {
  border-left: 4px solid #ef4444;
}

.toast-error .toast-icon {
  color: #ef4444;
  font-size: 1.5rem;
}

.toast-info {
  border-left: 4px solid var(--primary-color);
}

.toast-info .toast-icon {
  color: var(--primary-color);
  font-size: 1.5rem;
}

.toast-message {
  color: var(--text-light);
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  flex-shrink: 0;
}

.toast-close:hover {
  color: var(--text-color);
}

.toast-close ion-icon {
  font-size: 1.2rem;
}

@keyframes slideInRight {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: var(--transition);
}

.toast-slide-enter-from {
  transform: translateX(400px);
  opacity: 0;
}

.toast-slide-leave-to {
  transform: translateX(400px);
  opacity: 0;
}

@media (max-width: 640px) {
  .toast {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
}
/* Custom Selection */
::selection {
  background: rgba(249, 115, 22, 0.3);
  color: var(--text-color);
}

/* Smooth transitions for all interactive elements */
a, button, .skill-card, .project-card, .featured-card, .info-card, .contact-link-card {
  -webkit-tap-highlight-color: transparent;
}

/* Focus states for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 3px;
  border-radius: 8px;
}

/* Smooth scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--bg-dark);
}

::-webkit-scrollbar-thumb {
  background: var(--gradient-primary);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-light);
}

/* Page load fade in */
.portfolio {
  animation: fadeInPage 0.8s ease-out;
}

@keyframes fadeInPage {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
