<template>
    <div class="">
        <OverlayScreen :loading="true" v-if="isLoading" />
        <div v-if="!isLoading">
            <div v-for="shop in store.cache.post[area].data" :key="shop.oldPKey">
                <ShopPreview :shop="shop" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '../../store/use-store';
import OverlayScreen from '../overlay-screen.vue';
import ShopPreview from './shop-preview.vue';
const route = useRoute();
const store = useStore();
const isLoading = ref(true);
const area = route.params.area as string;

onMounted(async () => {
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
