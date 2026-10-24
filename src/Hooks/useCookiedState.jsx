import React from "react";
import { useCookies } from "react-cookie";

const useCookiedState = (key, initial = null) => {
  const [cookies, setCookie] = useCookies([key]);
  const [cookiedState, setCookiedState] = React.useState(null);

  React.useEffect(() => {
    if (cookies[key]) {
      setCookiedState(cookies[key]);
    }
  }, [cookies, key]);

  const setAndSaveCookie = React.useCallback((value) => {
    setCookiedState(value);
    setCookie(key, value);
  }, [key, setCookie]);

  return [cookiedState, setAndSaveCookie];
};

export default useCookiedState;
