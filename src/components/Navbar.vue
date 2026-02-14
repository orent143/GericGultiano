<template>
  <nav class="navbar-container">
    <div class="navbar-content">
      <div class="hamburger" @click="toggleMenu"> ☰</div>
      <ul :class="['nav-links', { active: isOpen }]">
        <router-link class="nav-link" to="/" @click="closeMenu">Home</router-link>
        <router-link class="nav-link" to="/skills" @click="closeMenu">Skills & Certifications</router-link>
        <router-link class="nav-link" to="/projects" @click="closeMenu">Projects</router-link>
        <router-link class="nav-link" to="/contact" @click="closeMenu">Contact</router-link>
      </ul>
      <div class="sample"></div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<style>
.navbar-container {
  display: flex;
  background-color: #ffffff;
  border-bottom: 1px solid #d6d6d654;
  position: relative;
  z-index: 100;
}

.navbar-content {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
.sample {
  padding: 10px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 40px;
  margin: 15px 0;
  padding: 0;
}

.nav-link {
  color: #333333;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.nav-link :hover {
  color: #000;
  opacity: 0.7;
  text-decoration: underline;
}

.hamburger {
  display: none;
  font-size: 24px;
  cursor: pointer;
}


@media (max-width: 1024px) {
  .navbar-container {
    padding: 0 40px;
  }
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 0 20px;
  }
}

@media (max-width: 768px) {

  .hamburger {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px 0;
    display: none;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    z-index: 999;
  }

  .nav-links.active {
    display: flex;
  }
}

.nav-link {
  color: #333333;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.nav-link:hover {
  color: #000;
  opacity: 0.7;
}
</style>
