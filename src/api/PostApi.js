import { request } from "@/tools/AxiosTool";

const BASE_API = "/api/posts";

export const GET_POSTS_API = () => {
  return request({
    method: "GET",
    url: `${BASE_API}`
  });
};
