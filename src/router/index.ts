import { createRouter, createWebHistory } from "vue-router";
import EyesView from "../views/Eyes.vue";
import FurView from "../views/Furs.vue";
import TailsView from "../views/Tails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: FurView,
    },
    {
      path: "/eyes",
      name: "Eyes",
      component: EyesView,
    },
    {
      path: "/tails",
      name: "Tails",
      component: TailsView,
    },
  ],
});

export default router;
