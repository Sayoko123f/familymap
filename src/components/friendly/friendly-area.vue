<template>
    <div class="">
        <OverlayScreen :loading="true" v-if="isLoading" />
        <h2>{{ area }}</h2>
        <div class="" v-if="!isLoading">
            <div class="" v-for="shop in store.cache.post[area].data">
                <p>
                    <router-link
                        :to="{ name: 'friendly-post', params: { post: shop.oldPKey } }"
                        >{{ shop.name }}</router-link
                    >
                </p>
                <CommodityGroup :shop="shop" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
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
