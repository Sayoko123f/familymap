<template>
    <div
        class="flex h-11 items-center justify-between bg-white px-4 shadow-[inset_0_-1px_1px_#c4c4c4]"
        v-show="!isPostPage"
    >
        <router-link
            class="relative font-medium"
            :class="{ 'text-friend-primary': isAreaPage }"
            :to="{ name: 'friendly-area-select' }"
            >{{ areaText }}
            <ChevronDownIcon class="inline-block h-5 w-5 align-text-bottom" />
            <ArrowUpIcon
                class="absolute -bottom-12 left-0 inline-block h-8 w-8 animate-bounce text-friend-primary"
                v-show="isHomePage"
            />
        </router-link>
        <router-link
            :to="{ name: 'friendly-favorite' }"
            class="cursor-pointer hover:text-friend-primary"
            :class="{ 'text-friend-primary': isFavoritePage }"
        >
            收藏
            <HeartIcon class="inline-block h-6 w-6 align-text-bottom" />
        </router-link>
    </div>
</template>
<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { ChevronDownIcon, ArrowUpIcon, HeartIcon } from '@heroicons/vue/solid';

const route = useRoute();
const isAreaPage = computed(() => route.name === 'friendly-area');
const isPostPage = computed(() => route.name === 'friendly-post');
const isHomePage = computed(() => route.name === 'friendly-home');
const isFavoritePage = computed(() => route.name === 'friendly-favorite');
const areaText = computed(() => {
    return '區域';
});
</script>
