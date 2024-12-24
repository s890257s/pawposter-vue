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
