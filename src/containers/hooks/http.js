import { useState, useEffect } from "react";
import axios from "axios";

export const useHttp = (url, dependecies) => {
  const [isLoadding, setIsLoadding] = useState(false);
  const [getData, setGetData] = useState(null);

  useEffect(() => {
    setIsLoadding(true);
    console.log("http request to:" + url);

    axios
      .get(url)
      .then((dat) => {
        setIsLoadding(false);
        let { data } = dat;
        setGetData(data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadding(false);
      });
  }, dependecies);

  return [isLoadding, getData];
};
