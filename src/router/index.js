import { createRouter, createWebHistory } from "vue-router";
import MoviesView from "@/views/MoviesView.vue";
import Featured from "@/views/Featured.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "movies",
      component: MoviesView,
    },
    {
      path: "/featured",
      name: "featured",
      component: Featured,
    },
  ],
});

export default router;
