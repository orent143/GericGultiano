<!-- AppFooter.vue -->
<template>
  <footer class="site-footer">
    <div class="container">
      <p>&copy; {{ currentYear }} Geric Gultiano. All rights reserved.</p>
      <nav>
        <a href="/about">About</a> |
        <a href="/contact">Contact</a> |
        <a href="/privacy">Privacy Policy</a>
      </nav>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
const currentYear = new Date().getFullYear();

</script>

<style scoped>
.site-footer {
  color: white;
  padding: 20px 0;
  text-align: center;
  /* Optional: basic styling to keep the footer at the bottom of the page */
  position: static;
  bottom: 0;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 5px;
}
</style>
