<template>
    <div class="">
        <OverlayScreen :loading="true" v-if="isLoading" />
        <div class="" v-if="!isLoading">
            <div
                class="bg-white pb-4 shadow-[inset_0_-1px_1px_#ccc]"
                v-for="shop in store.cache.post[area].data"
            >
                <p class="flex h-12 items-center justify-between px-4">
                    <router-link
                        class="text-lg"
                        :to="{ name: 'friendly-post', params: { post: shop.oldPKey } }"
                        >{{ shop.name }}
                        <ChevronRightIcon class="inline-block h-6 w-6 align-text-bottom" />
                    </router-link>
                    <span class="text-friend-primary">
                        <HeartOutline class="inline-block h-6 w-6" />
                    </span>
                </p>
                <CommodityGroup :shop="shop" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ChevronRightIcon, HeartIcon as HeartSolid } from '@heroicons/vue/solid';
import { HeartIcon as HeartOutline } from '@heroicons/vue/outline';
import { useStore } from '../../store/use-store';
import OverlayScreen from '../overlay-screen.vue';
import CommodityGroup from './commodity-group.vue';
const route = useRoute();
const store = useStore();
const isLoading = ref(true);
const area = route.params.area as string;

function wait(ms: number) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
    });
}

onMounted(async () => {
    // await wait(300);
    try {
        await store.fetchDataByPost(area);
    } catch (err) {
        console.error(err);
        console.error('獲取資料失敗，請稍後再試');
    } finally {
        console.log(store.cache.post[area]);
        isLoading.value = false;
    }
});
</script>
