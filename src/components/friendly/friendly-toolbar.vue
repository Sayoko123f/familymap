<template>
    <div
        class="flex h-11 items-center justify-between bg-white px-4 shadow-[inset_0_-1px_1px_#c4c4c4]"
    >
        <router-link
            class="font-medium"
            :class="{ 'text-friend-primary': isAreaPage }"
            :to="{ name: 'friendly-area-select' }"
            >{{ areaText }}
            <ChevronDownIcon class="inline-block h-5 w-5 align-text-bottom" />
        </router-link>
    </div>
</template>
<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { ChevronDownIcon } from '@heroicons/vue/solid';

const route = useRoute();
const isAreaPage = computed(() => route.name === 'friendly-area');
const areaText = computed(() => {
    if (isAreaPage.value) {
        return route.params.area;
    }
    return '區域';
});
</script>
