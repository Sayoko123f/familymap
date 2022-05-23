<template>
    <Teleport to="#portal-target">
        <div
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 text-white"
        >
            <div class="" v-if="prop.loading">
                <RefreshIcon class="mr-3 h-6 w-6 animate-spin" />
                讀取中…
            </div>
            <slot></slot>
        </div>
    </Teleport>
</template>
<script lang="ts" setup>
import { RefreshIcon } from '@heroicons/vue/solid';
const prop = defineProps({
    loading: Boolean,
});
</script>
