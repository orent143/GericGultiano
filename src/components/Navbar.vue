<template>
  <nav class="navbar-container">
    <div class="navbar-content">
      <ul class="nav-links">
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/skills">Skills & Certifications</router-link>
        <router-link class="nav-link" to="/projects">Projects</router-link>
        <router-link class="nav-link" to="/contact">Contact</router-link>
      </ul>
      <div class="sample"></div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

</script>

<style>

.navbar-container {
  display: flex;
  background-color: #ffffff;
  border-bottom: 1px solid #d6d6d654;
}
.navbar-content {
  display: flex;
  align-items: center;
}
.sample {
  padding: 10px;
}
.nav-links {
  list-style: none;
  text-decoration: none;
  display: flex;
  margin: 10px;
  padding: 0;
  gap: 40px;
}
.nav-link {
  color: #333333;
  font-family: "inter", sans-serif;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
}
.nav-link :hover {
  color: #000;
  opacity: 0.7;
  text-decoration: underline;
}
</style>


