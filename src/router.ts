import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterScrollBehavior,
} from "vue-router";
import Hello from "./components/HelloWorld.vue";
import FriendlyHome from "./components/friendly/friendly-home.vue";
import FriendlySelect from "./components/friendly/friendly-area-select.vue";

const routes = [
  { name: "home", path: "/", redirect: "/friendly" },
  {
    name: "friendly-home",
    path: "/friendly",
    component: FriendlyHome,
    children: [
      { name: "friendly-area-select", path: "a", component: FriendlySelect },
      { name: "friendly-area", path: "a/:area", component: Hello },
      { name: "friendly-post", path: "p/:post", component: Hello },
    ],
  },
] as RouteRecordRaw[];

export const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior: function (to) {
    if (to.hash) {
      return { el: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  } as RouterScrollBehavior,
});
