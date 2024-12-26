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
        memberId: -1,
      },
    };
  },

  actions: {
    login(loggedInMember) {
      this.memberInfo.isLoggedIn = true;
      this.memberInfo.token = loggedInMember.jwtToken;
      this.memberInfo.memberName =  loggedInMember.memberName;
      this.memberInfo.memberPhoto =  loggedInMember.memberPhoto;
      this.memberInfo.memberId =  loggedInMember.memberId;
    },
    logout() {
      this.memberInfo = {
        isLoggedIn: false,
        token: "",
        memberName: "",
        memberPhoto: "",
        memberId: -1,
      };
    },
  },

  getters: {
    isLoggedIn: (state) => state.memberInfo.isLoggedIn,

    memberName: (state) => state.memberInfo.memberName,

    token: (state) => state.memberInfo.token,

    memberPhoto: (state) => state.memberInfo.memberPhoto,

    memberId: (state) => state.memberInfo.memberId,
  },
});
