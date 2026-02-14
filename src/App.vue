<template>
    <div class="main-container">
    <Topbar />
    <router-view />
    <AppFooter />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import AppFooter from '@/components/Footer.vue';
import Topbar from '@/components/Topbar.vue';
import { useRouter } from 'vue-router';
</script>

<style>
.main-container {
    background-color: rgb(255, 253, 253);
    display: flex;
    flex-direction: column;
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    padding-top: 50px;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
}
</style>
