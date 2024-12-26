<script setup>
import { ref } from "vue";
import router from "@/router";
import { POST_LOGIN_API } from "@/api/AuthApi";
import { useLoggedInStore } from "../stores/LoggedInStore";
const loggedInStore = useLoggedInStore();

const email = ref("alice@mail.com");
const password = ref("1234");

// 登入
async function login() {
  const emailAndPassword = {
    email: email.value,
    password: password.value,
  };

  const loggedInMember = await POST_LOGIN_API(emailAndPassword);

  if (!loggedInMember) {
    return;
  }

  loggedInStore.login(loggedInMember);

  router.replace("/");
}

// 取消導回首頁
function goHome() {
  router.push("/");
}
</script>

<template>
  <v-container class="center">
    <v-row>
      <v-col>
        <v-sheet class="mx-auto" width="400">
          <v-form fast-fail @submit.prevent>
            <v-text-field
              v-model="email"
              label="Email"
              autocomplete="email"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="密碼"
              type="password"
              autocomplete="current-password"
            ></v-text-field>

            <v-btn class="mt-2" color="info" type="submit" block @click="login"
              >登入</v-btn
            >
            <v-btn class="mt-4" block @click="goHome">取消</v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.center {
  display: flex;
  align-items: center;
  height: 80vh;
}
</style>
