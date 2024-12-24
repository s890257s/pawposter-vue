<script setup>
const post = {
  memberName: "Alice",
  memberPhoto: "",
  postText: "今天帶狗狗去公園玩，牠特別喜歡追球球！",
  createdDate: "2024-12-24",
  replies: [
    {
      replyId: "1",
      replyText: "好好好",
      memberName: "Tom",
      createdDate: "2024-12-21",
    },
    {
      replyId: "2",
      replyText: "OK",
      memberName: "Tom",
      createdDate: "2024-12-22",
    },
  ],
};

const { memberName, postText, createdDate, memberPhoto, replies } = post;
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- === 貼文內容 === -->
        <v-card>
          <!-- 貼文者與時間 -->
          <template #title>
            <div class="title">
              <div class="member_home">
                <img src="/src/assets/image/m.png" class="avatar" />
                {{ memberName }}
              </div>
              <div class="createdDate">{{ createdDate }}</div>
            </div>
          </template>

          <!-- 貼文內容 -->
          <template #text>
            <div class="text">{{ postText }}</div>
          </template>

          <!-- 貼文圖片 -->
          <div class="image_home">
            <img src="/src/assets/image/a.jpg" class="post_image" />
            <img src="/src/assets/image/a.jpg" class="post_image" />
            <img src="/src/assets/image/a.jpg" class="post_image" />
            <img src="/src/assets/image/a.jpg" class="post_image" />
          </div>

          <!-- 留言按鈕 -->
          <v-card-actions>
            <div class="end">
              <v-btn rounded="xl" color="primary" variant="outlined">
                留言
              </v-btn>
            </div>
          </v-card-actions>

          <!-- === 分隔線 === -->
          <v-divider
            :thickness="5"
            class="border-opacity-75"
            color="#a8a8a8"
            inset
          ></v-divider>

          <!-- === 留言區 === -->
          <v-container>
            <v-row v-for="reply in replies" :key="reply.replyId">
              <v-col>
                <v-card variant="tonal">
                  <!-- 留言 -->
                  <template #title>
                    <div class="title">
                      <div class="member_home">
                        <img src="/src/assets/image/m.png" class="avatar" />
                        {{ reply.memberName }}
                      </div>
                      <div class="createdDate">{{ reply.createdDate }}</div>
                    </div>
                  </template>

                  <template #text>
                    <div class="text">{{ reply.replyText }}</div>
                  </template>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.member_home {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 50px;
}

.post_image {
  margin: 3px;
  border: 3px solid black;
  width: 200px;
}

.image_home {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  display: flex;
  overflow-x: auto;
  scrollbar-width: thin;
}

.end {
  display: flex;
  width: 100%;
  justify-content: end;
  padding-right: 20px;
  margin-bottom: 10px;
}

.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.createdDate {
  font-size: small;
  padding-top: 10px;
  color: grey;
}

.text {
  font-size: x-large;
}
</style>
