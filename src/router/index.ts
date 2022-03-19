import { createRouter, createWebHistory } from "vue-router";
import EyesView from "../views/Eyes.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: EyesView,
      props: {
        trait: "Fur"
      }
    },
    {
      path: "/eyes",
      name: "Eyes",
      component: EyesView,
      props: {
        trait: "Eyes"
      }
    },
  ],
});

export default router;
