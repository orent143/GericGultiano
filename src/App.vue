<template>
    <div class="main-container">
    <Topbar />
    <router-view />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Topbar from '@/components/Topbar.vue';
import { useRouter } from 'vue-router';
</script>

<style>
.main-container {
    display: flex;
    flex-direction: column;
    font-family: inter, sans-serif;
    padding-top: 50px;
    padding-left: 200px;
    padding-right: 200px;
    max-height: 100%;
    overflow: hidden;
}
</style>
