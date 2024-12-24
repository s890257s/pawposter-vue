import { request } from "@/tools/AxiosTool";
import { convertToQueryString } from "@/tools/CommonTool";

const BASE_API = "/api/posts";

export const GET_POSTS_API = (params) => {
  const queryString = convertToQueryString(params);
  
  return request({
    method: "GET",
    url: `${BASE_API}/page?${queryString}`,
  });
};
