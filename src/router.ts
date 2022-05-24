import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
    RouterScrollBehavior,
} from 'vue-router';
import FriendlyHome from './components/friendly/friendly-home.vue';
import FriendlyAreaSelect from './components/friendly/friendly-area-select.vue';
import FriendlyArea from './components/friendly/friendly-area.vue';
import ShopPannel from './components/friendly/shop-pannel.vue';
import FavoritePannel from './components/friendly/favorite-pannel.vue';
import MultipleShop from './components/friendly/multiple-shop.vue';

const routes = [
    { name: 'home', path: '/', redirect: '/friendly' },
    {
        name: 'friendly-home',
        path: '/friendly',
        component: FriendlyHome,
        children: [
            {
                name: 'friendly-area-select',
                path: 'a',
                component: FriendlyAreaSelect,
            },
            { name: 'friendly-area', path: 'a/:area', component: FriendlyArea },
            { name: 'friendly-post', path: 'p/:post', component: ShopPannel },
            { name: 'friendly-favorite', path: 'favorite', component: FavoritePannel },
            { name: 'friendly-shops', path: 'shops', component: MultipleShop },
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
