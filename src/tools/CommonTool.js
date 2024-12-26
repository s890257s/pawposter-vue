/**
 * 將傳入的物件轉換成 QueryString，例如傳入
 *
 * {id:1,name:"Alice",age:26}
 *
 * 會轉換成
 *
 * "id=1&name=Alice&age=26"
 */
export const convertToQueryString = (params) => {
  if (!params) {
    return [];
  }

  const queryParts = [];

  for (const [key, value] of Object.entries(params)) {
    if (!value) continue;

    const trimmedValue = value.toString().trim();

    if (!trimmedValue) continue;

    queryParts.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(trimmedValue)}`
    );
  }

  return queryParts.join("&");
};

