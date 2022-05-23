<template>
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
            <p class="text-sm text-friend-red" :class="{ invisible: group.qty === 0 }">
                {{ group.qty }}
            </p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ShopData } from '../../store/i-data';
import { iconSrc } from '../../assets/group-icon';
const router = useRouter();

const prop = defineProps({
    shop: {
        type: Object,
        required: true,
    },
});
const shop = computed(() => prop.shop as ShopData);

function handleGroupDivClick(group: ShopData['info'][0]) {
    if (group.qty < 1) {
        return;
    }
    router.push({
        name: 'friendly-post',
        params: { post: shop.value.oldPKey },
        query: { group: group.code },
    });
}
</script>
