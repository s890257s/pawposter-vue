import { request } from "@/tools/AxiosTool";

export const GET_MEMBERS_API = () => {
  return request({
    method: "GET",
    url: "/api/members",
  });
};
