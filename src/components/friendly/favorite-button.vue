<template>
    <span class="cursor-pointer text-friend-primary">
        <HeartOutline
            class="inline-block h-6 w-6"
            v-if="!isFavorite"
            @click="() => store.addFavorite(prop.oldPKey)"
        />
        <HeartSolid
            class="inline-block h-6 w-6"
            v-if="isFavorite"
            @click="() => store.removeFavorite(prop.oldPKey)"
        />
    </span>
</template>
<script lang="ts" setup>
import { HeartIcon as HeartOutline } from '@heroicons/vue/outline';
import { HeartIcon as HeartSolid } from '@heroicons/vue/solid';
import { computed } from 'vue';
import { useStore } from '../../store/use-store';

const prop = defineProps({
    oldPKey: {
        type: String,
        required: true,
    },
});

const store = useStore();
const isFavorite = computed(
    () => store.favorite.friendly.findIndex((e) => e === prop.oldPKey) !== -1
);
</script>
