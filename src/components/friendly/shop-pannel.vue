<template>
    <div class="bg-white">
        <OverlayScreen :loading="true" v-if="isLoading" />
        <div class="" v-if="!isLoading">
            <div class="grid grid-cols-4 gap-2 bg-[#F5F5F5] p-4">
                <div
                    class="flex flex-col items-center justify-center border py-2"
                    :class="{
                        'opacity-40': group.qty === 0,
                        'border-transparent': group.qty === 0,
                        'border-white': group.qty > 0,
                        'cursor-pointer': group.qty > 0,
                    }"
                    v-for="group in shop.info"
                    :key="group.code"
                    @click="() => handleGroupDivClick(group)"
                >
                    <div class="">
                        <img
                            class="h-8 w-[33px]"
                            :src="iconSrc[group.code as keyof typeof iconSrc]"
                            alt=""
                        />
                    </div>
                    <p class="text-sm font-medium text-[#4A4A4A]">{{ group.groupName }}</p>
                    <p
                        class="text-sm text-friend-red"
                        :class="{ invisible: group.qty === 0 }"
                    >
                        {{ group.qty }}
                    </p>
                </div>
            </div>
            <div class="">
                <div class="" v-for="group in showGroups" :key="group.code">
                    <div class="" v-for="category in group.categories" :key="category.code">
                        <p class="text-sm text-friend-gray pt-3 pl-6">
                            {{ category.categoryName }}
                        </p>
                        <div class="divide-y divide-friend-gray divide-opacity-40">
                            <div
                                class="flex justify-between mx-8 py-2"
                                v-for="product in category.products"
                                :key="product.code"
                            >
                                <span>
                                    {{ product.productName }}
                                </span>
                                <span class="text-friend-primary font-bold">{{ product.qty }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '../../store/use-store';
import { ShopData } from '../../store/i-data';
import OverlayScreen from '../overlay-screen.vue';
import { iconSrc } from '../../assets/group-icon';

const store = useStore();
const router = useRouter();
const route = useRoute();
const isLoading = ref(true);
const oldPKey = route.params.post as string;
const showGroups = computed(() => {
    const g = route.query.group?.toString();
    if (!g || g === 'all') {
        return shop.value.info;
    }
    return shop.value.info.filter((e) => e.code === g);
});
const shop = computed(() => store.cache.oldP[oldPKey]);
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

async function handleGroupDivClick(group: ShopData['info'][0]) {
    if (group.qty < 1) {
        return;
    }
    let queryGroup = group.code;
    if (route.query.group === group.code) {
        queryGroup = 'all';
    }
    await router.replace({
        name: 'friendly-post',
        params: { post: oldPKey },
        query: { group: queryGroup },
    });
    console.log(showGroups.value);
}
</script>
