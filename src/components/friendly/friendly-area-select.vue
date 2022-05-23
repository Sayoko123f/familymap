<template>
    <div class="flex py-4">
        <ul class="w-1/2 text-center">
            <li
                class="cursor-pointer"
                :class="{
                    'text-friend-primary': i === selectedCityIndex,
                }"
                v-for="(city, i) in CityList"
                :key="city.name"
                @click.self.stop="() => handleCityDivClick(i)"
            >
                {{ city.name }}
            </li>
        </ul>
        <div class="w-1/2">
            <ul class="" v-if="selectedCityIndex !== -1">
                <li>
                    <router-link
                        class="inline-block w-full hover:bg-yellow-50"
                        :to="{
                            name: 'friendly-area',
                            params: { area: CityList[selectedCityIndex].name },
                        }"
                    >
                        不限
                    </router-link>
                </li>
                <li class="" v-for="area in CityList[selectedCityIndex].districts">
                    <router-link
                        class="inline-block w-full hover:bg-yellow-50"
                        :to="{ name: 'friendly-area', params: { area: area.code } }"
                    >
                        {{ area.name }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { CityList } from '../../store/city';

const selectedCityIndex = ref(-1);

function handleCityDivClick(cityIndex: number) {
    selectedCityIndex.value = cityIndex;
}
</script>
