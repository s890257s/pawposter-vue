<script setup>
import { ref } from "vue";
import { createRequest } from "@/tools/AxiosTool";

const img = ref("");

(async () => {
  const getMember = createRequest({
    url: "http://localhost:8080/test/1",
    method: "GET",
  });

  const m = await getMember;
  img.value = m.memberPhoto;
})();
</script>

<template>
  <div>這裡是 poster</div>
  <router-view></router-view>

  <img :src="img" alt="" />
</template>

<style scoped></style>
