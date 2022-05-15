<template>
  <div class="flex">
    <ul class="w-1/2">
      <li
        class=""
        v-for="(city, i) in CityList"
        :key="city.name"
        @click.self.stop="() => handleCityDivClick(i)"
      >
        {{ city.name }}
      </li>
    </ul>
    <div class="w-1/2">
      <ul class="" v-if="selectedCityIndex !== -1">
        <li class="" v-for="area in CityList[selectedCityIndex].districts">
          {{ area.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { CityList } from "../../store/city";

const selectedCityIndex = ref(-1);

function handleCityDivClick(cityIndex: number) {
  selectedCityIndex.value = cityIndex;
}
</script>
