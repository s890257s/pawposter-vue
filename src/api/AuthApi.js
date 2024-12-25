import { request } from "@/tools/AxiosTool";

const BASE_API = "/api/auth";

export const POST_LOGIN_API = (params) => {
  return request({
    method: "POST",
    data: params,
    url: `${BASE_API}/login`,
  });
};
