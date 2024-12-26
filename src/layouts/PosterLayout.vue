<script setup>
import { ref } from "vue";
import { useLoggedInStore } from "@/stores/LoggedInStore";

import router from "@/router";
const loggedInStore = useLoggedInStore();

const drawer = ref(true);

const items = ref([
  {
    title: "Dashboard",
    prependIcon: "mdi-view-dashboard-outline",
    link: true,
  },
  {
    title: "Team",
    prependIcon: "mdi-account-group",
    link: true,
  },
  {
    title: "Projects",
    prependIcon: "mdi-briefcase-outline",
    link: true,
  },
  {
    title: "Calendar",
    prependIcon: "mdi-calendar",
    link: true,
  },
  {
    title: "Reports",
    prependIcon: "mdi-file-chart-outline",
    link: true,
  },
]);

// 標題
const title = import.meta.env.VITE_APP_TITLE;

// 登出
function logout(){
  loggedInStore.logout()
}
</script>

<template>
  <v-layout>
    <!-- === 側邊選單 side bar === -->
    <v-navigation-drawer v-model="drawer">
      <v-list density="compact" item-props :items="items" nav />

      <template #append>
        <v-list-item
          class="ma-2"
          link
          nav
          prepend-icon="mdi-cog-outline"
          title="Settings"
        />
      </template>
    </v-navigation-drawer>

    <!-- === 導覽列 nav bar === -->
    <v-app-bar border="b" class="ps-4" flat>
      <v-app-bar-nav-icon
        v-if="$vuetify.display.smAndDown"
        @click="drawer = !drawer"
      />

      <!-- 網站標題 -->
      <v-app-bar-title>{{ title }}</v-app-bar-title>

      <!-- 未登入按鈕 -->
      <template #append v-if="!loggedInStore.isLoggedIn">
        <v-btn
          class="text-none me-2"
          height="48"
          border="info lg"
          @click="router.push('/login')"
        >
          登入 <v-icon icon="mdi-login" />
        </v-btn>
      </template>

      <!-- 登入頭像 -->
      <template #append v-if="loggedInStore.isLoggedIn">
        <div class="mr-3">{{ loggedInStore.memberName }}</div>
        <v-btn class="text-none me-2" height="48" icon slim>
          <!-- 使用者頭像 -->
          <v-avatar
            color="surface-light"
            :image="loggedInStore.memberPhoto"
            size="40"
          />

          <!-- 頭像次級選單 -->
          <v-menu activator="parent">
            <v-list density="compact" nav>
              <v-list-item append-icon="mdi-logout" link title="Logout" @click="logout"/>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <!-- === 當前主畫面 === -->
    <v-main>
      <div class="pa-4">
        <router-view></router-view>
      </div>
    </v-main>
  </v-layout>
</template>

<style scoped></style>
