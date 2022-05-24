<template>
    <div class="">
        <OverlayScreen :loading="true" v-if="isLoading" />
        <div class="flex flex-col divide-y-8 divide-friend-primary" v-if="!isLoading">
            <div class="bg-white" v-for="key in shopKeys" :key="key">
                <div class="flex items-center justify-between px-4 pt-2">
                    <span class="text-lg">{{ store.cache.oldP[key].name }}</span>
                </div>
                <p class="px-4 text-sm text-[#666666]">
                    {{ store.cache.oldP[key].address }}
                </p>
                <p class="px-4 pb-2 text-sm text-[#666666]">
                    最後更新於
                    {{ new Date(store.cache.oldP[key].updateDate).toLocaleString() }}
                </p>
                <CommodityGroup :no-route="true" :shop="store.cache.oldP[key]" />
                <div>
                    <div
                        class=""
                        v-for="group in store.cache.oldP[key].info"
                        :key="group.code"
                    >
                        <div
                            class=""
                            v-for="category in group.categories"
                            :key="category.code"
                        >
                            <p class="pt-3 pl-6 text-sm text-friend-gray">
                                {{ category.categoryName }}
                            </p>
                            <div class="divide-y divide-friend-gray divide-opacity-40">
                                <div
                                    class="mx-8 flex justify-between py-2"
                                    v-for="product in category.products"
                                    :key="product.code"
                                >
                                    <span>
                                        {{ product.productName }}
                                    </span>
                                    <span class="font-bold text-friend-primary">{{
                                        product.qty
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useStore } from '../../store/use-store';
import OverlayScreen from '../overlay-screen.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import CommodityGroup from './commodity-group.vue';
const store = useStore();
const isLoading = ref(true);
const route = useRoute();
const shopKeys = computed((): string[] => {
    if (!route.query.s) {
        return [];
    }
    if (Array.isArray(route.query.s)) {
        return route.query.s as string[];
    }
    return [route.query.s];
});

onMounted(async () => {
    try {
        await store.fetchDataByKey(...shopKeys.value);
    } catch (err) {
        console.error(err);
        console.error('獲取資料失敗，請稍後再試');
    } finally {
        isLoading.value = false;
    }
});
</script>
