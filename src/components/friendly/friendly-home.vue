<template>
  <FriendlyHeader />
  <FriendlyToolbar />
  <router-view></router-view>
</template>
<script lang="ts" setup>
import FriendlyHeader from "./friendly-header.vue";
import FriendlyToolbar from "./friendly-toolbar.vue";
</script>
