<template>
    <div class="">
        <OverlayScreen :loading="true" v-if="isLoading" />
        <div class="" v-if="!isLoading">
            <CommodityGroup :shop="store.cache.oldP[oldPKey]" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '../../store/use-store';
import OverlayScreen from '../overlay-screen.vue';
import CommodityGroup from './commodity-group.vue';

const store = useStore();
const route = useRoute();
const isLoading = ref(true);
const oldPKey = route.params.post as string;
onMounted(async () => {
    try {
        if (!((oldPKey as string) in store.cache.post)) {
            await store.fetchDataByKey(oldPKey);
        }
    } catch (err) {
        console.error(err);
        console.error('獲取資料失敗，請稍後再試');
    } finally {
        isLoading.value = false;
    }
});
</script>
