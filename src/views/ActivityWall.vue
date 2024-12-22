<script setup>
import { GET_POSTS_API } from "@/api/PostApi";
import { onMounted, ref } from "vue";

// === 載入 post ===
const posts = ref([
  {
    postId: -1,
    postText: "",
    memberId: -1,
    memberName: "",
    isDeleted: false,
    resources: [
      {
        postResourceId: -1,
        filePath: "",
        mimeType: "",
        content: "",
      },
    ],
    tagNames: [""],
    replies: [
      {
        replyId: -1,
        replyText: "",
        isDeleted: false,
      },
    ],
  },
]);

onMounted(async () => {
  posts.value = await GET_POSTS_API();
});
</script>

<template>
  <div v-for="post in posts" :key="post.postId">
    <hr />
    <div>貼文者: {{ post.memberName }}</div>
    <div>內容: {{ post.postText }}</div>
    <div>tag: {{ post.tagNames }}</div>
    <div style="background-color: darkgrey">
      <template
        v-for="resource in post.resources"
        :key="resource.postResourceId"
      >
        <img :src="resource.content" width="100px" />
      </template>
    </div>

    <div style="background-color: papayawhip">
      <div>【留言】</div>
      <div v-for="reply in post.replies" :key="reply.replyId">
        <div>{{ reply.memberName }} 說: {{ reply.replyText }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
