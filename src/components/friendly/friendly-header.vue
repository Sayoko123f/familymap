<template>
    <header
        class="flex h-11 items-center justify-between bg-gradient-to-r from-[#3bc3af] to-[#5eccf0] px-4 text-white"
    >
        <div>
            <ChevronLeftIcon
                class="inline-block h-6 w-6 cursor-pointer"
                v-show="isPostPage"
                @click="prev"
            />
        </div>
        <div class="text-lg font-bold">
            <router-link :to="{ name: 'friendly-home' }"> 友善食光 </router-link>
        </div>
        <div>
            <router-link
                :to="{ name: 'friendly-favorite' }"
                class="cursor-pointer hover:text-friend-primary"
            >
                已收藏
                <HeartIcon class="inline-block h-6 w-6 align-text-bottom" />
            </router-link>
        </div>
    </header>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ChevronLeftIcon, HeartIcon } from '@heroicons/vue/solid';

const router = useRouter();
const route = useRoute();
const isPostPage = computed(() => route.name === 'friendly-post');

function prev() {
    router.go(-1);
}
</script>
