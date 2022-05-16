import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterScrollBehavior,
} from "vue-router";
import Hello from "./components/HelloWorld.vue";
import FriendlyHome from "./components/friendly/friendly-home.vue";
import FriendlyAreaSelect from "./components/friendly/friendly-area-select.vue";
import FriendlyArea from "./components/friendly/friendly-area.vue";

const routes = [
  { name: "home", path: "/", redirect: "/friendly" },
  {
    name: "friendly-home",
    path: "/friendly",
    component: FriendlyHome,
    children: [
      {
        name: "friendly-area-select",
        path: "a",
        component: FriendlyAreaSelect,
      },
      { name: "friendly-area", path: "a/:area", component: FriendlyArea },
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
