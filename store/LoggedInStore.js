import { defineStore } from "pinia";

export const useLoggedInStore = defineStore("LoggedInStore", {
  persist: {
    key: "loggedInStore",
    storage: localStorage,
    pick: ["memberInfo"], // 指定需要持久化的 state
  },

  state: () => {
    return {
      memberInfo: {
        isLoggedIn: false,
        token: "",
        memberName: "",
        memberPhoto: "",
      },
    };
  },

  actions: {
    login(token, memberName, memberPhoto) {
      this.memberInfo.isLoggedIn = true;
      this.memberInfo.token = token;
      this.memberInfo.memberName = memberName;
      this.memberInfo.memberPhoto = memberPhoto;
    },
    logout() {
      this.memberInfo = {
        isLoggedIn: false,
        token: "",
        memberName: "",
        memberPhoto: "",
      };
    },
  },

  getters: {
    isLoggedIn: (state) => state.memberInfo.isLoggedIn,

    memberName: (state) => state.memberInfo.memberName,

    token: (state) => state.memberInfo.token,

    memberPhoto: (state) => state.memberInfo.memberPhoto,
  },
});
