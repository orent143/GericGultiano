import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Skills from "@/pages/Skills.vue";
import Projects from "@/pages/Projects.vue";
import AllProjects from "@/pages/AllProjects.vue"
import Contact from "@/pages/Contacts.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/skills", component: Skills },
  { path: "/projects", component: Projects },
  { path: "/all-projects", component: AllProjects },
  { path: "/contact", component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

