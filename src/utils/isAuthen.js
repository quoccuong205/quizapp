export const isAuthen = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  if (data) return data.tokens;
};
