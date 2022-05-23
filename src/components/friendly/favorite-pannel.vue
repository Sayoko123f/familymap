<template>
    <div class="">
        <OverlayScreen :loading="true" v-if="isLoading" />
        <div class="" v-if="!isLoading">
            <div class="px-4" v-if="store.favorite.friendly.length === 0">
                目前沒有已收藏的店舖！
            </div>
            <div v-for="oldPKey in store.favorite.friendly" :key="oldPKey">
                <ShopPreview :shop="store.cache.oldP[oldPKey]" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useStore } from '../../store/use-store';
import OverlayScreen from '../overlay-screen.vue';
import { ref, onMounted } from 'vue';
import ShopPreview from './shop-preview.vue';
const store = useStore();
const isLoading = ref(true);

onMounted(async () => {
    try {
        await store.fetchFavoriteShopData();
    } catch (err) {
        console.error(err);
        console.error('獲取資料失敗，請稍後再試');
    } finally {
        isLoading.value = false;
    }
});
</script>
