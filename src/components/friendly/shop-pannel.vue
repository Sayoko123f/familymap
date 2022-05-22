<template>
    <div class="bg-white">
        <OverlayScreen :loading="true" v-if="isLoading" />
        <div class="" v-if="!isLoading">
            <div class="flex items-center justify-between px-4 pt-2">
                <span class="text-lg">{{ shop.name }}</span>
                <FavoriteButton :old-p-key="shop.oldPKey" />
            </div>
            <p class="px-4 text-sm text-[#666666]">{{ shop.address }}</p>
            <p class="px-4 pb-2 text-sm text-[#666666]">最後更新於 {{ finialUpdate }}</p>
            <div class="grid grid-cols-4 gap-2 bg-white p-4 shadow-[inset_0_-1px_1px_#c4c4c4]">
                <div
                    class="flex flex-col items-center justify-center border-2 py-2 rounded-lg"
                    :class="{
                        'opacity-40': group.qty === 0,
                        'cursor-pointer': group.qty > 0,
                        'bg-[#dddddd]': route.query.group === group.code,
                        'border-[#c4c4c4]': route.query.group === group.code,
                        'border-transparent':
                            group.qty === 0 || route.query.group !== group.code,
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
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '../../store/use-store';
import { ShopData } from '../../store/i-data';
import OverlayScreen from '../overlay-screen.vue';
import { iconSrc } from '../../assets/group-icon';
import FavoriteButton from './favorite-button.vue';

const store = useStore();
const router = useRouter();
const route = useRoute();
const isLoading = ref(true);
const oldPKey = route.params.post as string;
const showGroups = computed(() => {
    const g = route.query.group?.toString();
    if (!g) {
        return shop.value.info;
    }
    return shop.value.info.filter((e) => e.code === g);
});
const shop = computed(() => store.cache.oldP[oldPKey]);
const finialUpdate = computed(() => new Date(shop.value.updateDate).toLocaleString());
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
    const queryGroup = route.query.group === group.code ? undefined : group.code;

    await router.replace({
        name: 'friendly-post',
        params: { post: oldPKey },
        query: { group: queryGroup },
    });
    console.log(showGroups.value);
}
</script>
