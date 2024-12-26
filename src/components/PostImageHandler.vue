<script setup>
import { ref, reactive, defineProps, defineEmits } from "vue";

const emit = defineEmits(["update:photos"]);

const props = defineProps(["photos"]);
let localPhotos = reactive(props.photos); // 單向資料流，建立本地變數以呈現與修改

/* === 隱藏的 檔案上傳input === */
const hiddenFileInput = ref(null);

// 模擬點擊 檔案上傳input
function openUploadUi() {
  hiddenFileInput.value.click();
}

/* === 當 檔案上傳input 發生變化時 === */
function handleFileSelection(e) {
  // 元件內部運算
  const photoFiles = e.target.files;

  for (const p of photoFiles) {
    const url = URL.createObjectURL(p);
    localPhotos.push({ p, url });
  }

  e.target.value = "";

  // 通知父元件狀態改變
  emit("update:photos", localPhotos);
}

// === 點擊圖片刪除自己 ===
function removePhoto(photo) {
  // 元件內部運算
  const index = localPhotos.findIndex((p) => p.url === photo.url);
  if (index !== -1) {
    localPhotos.splice(index, 1); // 使用 splice 移除目標
  }

  // 通知父元件狀態改變
  emit("update:photos", localPhotos);
}
</script>

<template>
  <div class="image_home">
    <!-- 圖片們 -->
    <template v-for="p in localPhotos">
      <v-tooltip text="點擊圖片刪除" location="bottom">
        <template v-slot:activator="{ props }">
          <img :src="p.url" v-bind="props" @click="removePhoto(p)" />
        </template>
      </v-tooltip>
    </template>

    <!-- 上傳圖片按鈕 -->
    <div class="upload_button">
      <v-btn
        @click="openUploadUi"
        append-icon="mdi-plus-thick"
        variant="plain"
        size="150"
      >
      </v-btn>
    </div>

    <!-- 隱藏的檔案上傳input -->
    <div hidden>
      <input
        type="file"
        ref="hiddenFileInput"
        @change="handleFileSelection"
        accept="image/*"
        multiple
      />
    </div>
  </div>
</template>

<style scoped>
.upload_button {
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid black;
}

.image_home {
  margin: 15px;
  display: flex;
  overflow-x: auto;
  scrollbar-width: thin;
  gap: 10px;
  align-items: center;
}

img {
  border: 3px solid black;
  width: 150px;
  height: 150px;
  cursor: pointer;
}
</style>
