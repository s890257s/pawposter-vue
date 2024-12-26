<script setup>
import { GET_POSTS_API } from "@/api/PostApi";
import { onMounted, ref, computed } from "vue";
import { useLoggedInStore } from "../stores/LoggedInStore";
import MemberPost from "@/components/MemberPost.vue";
import CreatePost from "@/components/CreatePost.vue";
const loggedInStroe = useLoggedInStore();

/* === 顯示貼文 === */
const posts = ref([]);

onMounted(async () => {
  posts.value = await loadNextPage();
});

// 分頁資訊
const paginationParams = {
  page: -1,
  size: 5,
  direction: "DESC",
  sort: "createdDate",
};

// 讀取下一頁
async function loadNextPage() {
  paginationParams.page += 1;

  const data = await GET_POSTS_API(paginationParams);

  return data.content;
}

// 給 v-infinite-scroll 元件使用的 callback function
async function fetchData({ done }) {
  const result = await loadNextPage();

  if (result.length == 0) {
    done("empty");
    return;
  }

  posts.value.push(...result);

  done("ok");
}

/* === 新增貼文 === */
</script>

<template>
  <CreatePost v-if="loggedInStroe.isLoggedIn"></CreatePost>

  <v-infinite-scroll :height="'100%'" :onLoad="fetchData">
    <div v-for="post in posts" :key="post.postId">
      <MemberPost :post="post"></MemberPost>
    </div>

    <template #empty>
      <div>沒有更多貼文了</div>
    </template>
  </v-infinite-scroll>
</template>

<style scoped></style>
