import { useState } from "react";
import axios from "axios";

export const useHttpMeth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const http = async (url, action, object) => {
    switch (action) {
      case "GET":
        await get(url);
        break;
      case "POST":
        await post(url, object);
        break;
      case "PUT":
        await update(url, object);
        break;
      case "DELETE":
        await remove(url);
        break;
      default:
        await setResponse(null);
        break;
    }
    return response;
  };

  const get = async (url) => {
    setIsLoading(true);
    await axios
      .get(url)
      .then((dat) => {
        setResponse(dat);
      })
      .catch((err) => {
        console.log(err);
        setResponse({ id: 0, message: `error on get: ${url}` });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const post = async (url, object) => {
    setIsLoading(true);
    await axios
      .post(url, object)
      .then((data) => {
        setResponse(data);
      })
      .catch((err) => {
        console.log(err);
        setResponse({ id: 0, message: `error on post: ${url}` });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const update = async (url, object) => {
    setIsLoading(true);
    await axios
      .put(url, object)
      .then((data) => {
        setResponse(data);
      })
      .catch((err) => {
        console.log(err);
        setResponse({ id: 0, message: `error on update: ${url}` });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const remove = async (url) => {
    setIsLoading(true);
    await axios
      .delete(url)
      .then((data) => {
        setResponse(data);
      })
      .catch((err) => {
        console.log(err);
        setResponse({ id: 0, message: `error on delete: ${url}` });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return [isLoading, http];
};
