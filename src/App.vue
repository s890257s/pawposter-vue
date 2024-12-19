<script setup>
import { GET_MEMBERS_API } from "./api/MemberApi";
(async () => {
  console.log(await GET_MEMBERS_API());
})();
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
