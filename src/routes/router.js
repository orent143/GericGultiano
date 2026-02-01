import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Skills from "@/pages/Skills.vue";
import Projects from "@/pages/Projects.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/skills", component: Skills },
  { path: "/projects", component: Projects },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

