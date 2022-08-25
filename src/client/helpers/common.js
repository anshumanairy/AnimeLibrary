export const setIsMobile = (window) => {
  const isMobile =
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );
  window.isMobile = isMobile;
};

export const getUrlSearchParams = (search) => {
  return JSON.parse(
    '{"' + search.substring(1).replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value);
    }
  );
};
