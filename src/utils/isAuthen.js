export const isAuthen = () => {
  if (localStorage.getItem("data")) {
    let decodeData = atob(localStorage.getItem("data"));
    const data = JSON.parse(decodeData);
    return data;
  }
  return false;
};
