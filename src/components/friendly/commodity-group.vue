<template>
    <div class="grid grid-cols-4 gap-2 bg-[#F5F5F5]">
        <div
            class="flex flex-col items-center justify-center border"
            :class="{
                'opacity-40': group.qty === 0,
                'border-transparent': group.qty === 0,
                'border-white': group.qty > 0,
            }"
            v-for="group in shop.info"
            :key="group.code"
        >
            <div class="">
                <img
                    class="h-8 w-[33px]"
                    :src="iconSrc[group.code as keyof typeof iconSrc]"
                    alt=""
                />
            </div>
            <p class="text-sm font-medium text-[#4A4A4A]">{{ group.groupName }}</p>
            <p class="text-sm text-friend-red" :class="{ invisible: group.qty === 0 }">
                {{ group.qty }}
            </p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { ShopData } from '../../store/i-data';

const prop = defineProps({
    shop: {
        type: Object,
        required: true,
    },
});
const shop = computed(() => prop.shop as ShopData);
const iconSrc = {
    A: '/imgs/g1.svg',
    B: '/imgs/g2.svg',
    C: '/imgs/g3.svg',
    D: '/imgs/g4.svg',
    E: '/imgs/g5.svg',
    F: '/imgs/g6.svg',
    G: '/imgs/g7.svg',
    H: '/imgs/g8.svg',
};
</script>
