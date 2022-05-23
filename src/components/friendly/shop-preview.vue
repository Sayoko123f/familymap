<template>
    <div class="bg-white pb-4 shadow-[inset_0_-1px_1px_#ccc]">
        <p class="flex h-12 items-center justify-between px-4">
            <router-link
                class="text-lg"
                :to="{ name: 'friendly-post', params: { post: shop.oldPKey } }"
                >{{ shop.name }}
                <ChevronRightIcon class="inline-block h-6 w-6 align-text-bottom" />
            </router-link>
            <FavoriteButton :old-p-key="shop.oldPKey" />
        </p>
        <CommodityGroup :shop="shop" />
    </div>
</template>
<script lang="ts" setup>
import FavoriteButton from './favorite-button.vue';
import CommodityGroup from './commodity-group.vue';
import { ShopData } from '../../store/i-data';
import { ChevronRightIcon } from '@heroicons/vue/solid';
const prop = defineProps({
    shop: {
        type: Object,
        required: true,
    },
});
const shop = prop.shop as ShopData;
</script>
