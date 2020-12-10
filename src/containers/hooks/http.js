import { useState, useEffect } from "react";
import axios from "axios";

export const useHttp = (url, dependecies, action, object) => {
  const [isLoadding, setIsLoadding] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setIsLoadding(true);
    console.log("http request to:" + url);

    if (action === "GET" && url) get(url);
    else if (action === "POST" && url) post(url, object);
    else if (action === "DELETE" && url) remove(url);
  }, dependecies);

  const get = (url) => {
    axios
      .get(url)
      .then((dat) => {
        setIsLoadding(false);
        setResponse(dat);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadding(false);
      });

    return;
  };

  const post = (url, object) => {
    axios
      .post(url, object)
      .then((data) => {
        setIsLoadding(false);
        setResponse(data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadding(false);
      });

    return;
  };

  const remove = (url) => {
    axios
      .delete(url)
      .then((data) => {
        setIsLoadding(false);
        setResponse(data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadding(false);
      });

    return;
  };

  return [isLoadding, response];
};
