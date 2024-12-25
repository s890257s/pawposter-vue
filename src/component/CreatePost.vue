<script setup>
import { ref } from "vue";
import { useLoggedInStore } from "/store/LoggedInStore";
import PostImageHandler from "./PostImageHandler.vue";
import { POST_POST_API } from "@/api/PostApi";

const loggedInStroe = useLoggedInStore();

const postText = ref("");

function post() {
  const fd = new FormData();
  fd.append("text", postText.value);

  photos.forEach((photo) => fd.append("files", photo.p));


  POST_POST_API(fd);
}

const photos = [];
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- === 新增貼文 === -->

        <v-card>
          <!-- 貼文者與時間 -->
          <template #title>
            <div class="title">
              <div class="member_home">
                <img :src="loggedInStroe.memberPhoto" class="avatar" />
                <div>{{ loggedInStroe.memberName }}</div>
              </div>
            </div>
          </template>

          <!-- 貼文內容 -->
          <template #text>
            <v-textarea
              class="new_post"
              clearable
              label="今天心情如何?"
              variant="solo"
              v-model="postText"
            ></v-textarea>
          </template>

          <!-- 貼文圖片 -->
          <PostImageHandler v-model:photos="photos"></PostImageHandler>

          <!-- 功能按鈕組 -->
          <v-card-actions>
            <div class="functional_buttons" v-show="loggedInStroe.isLoggedIn">
              <!-- 貼文 -->
              <v-btn
                @click="post"
                color="info"
                rounded="lg"
                variant="elevated"
                append-icon="mdi-post"
                size="large"
              >
                貼文
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.new_post {
  margin-bottom: -30px;
}

.avatar {
  width: 50px;
}

.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.member_home {
  display: flex;
  align-items: center;
  gap: 10px;
}

.functional_buttons {
  display: flex;
  width: 100%;
  justify-content: end;
  align-items: center;
  padding-right: 20px;
  margin-bottom: 10px;
  gap: 15px;
}
</style>
