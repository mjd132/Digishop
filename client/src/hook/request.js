import axios from "axios";
const RequstServer = () => {
  const Get = (url, query) => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(url, { params: query })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const Put = async (url, data, query) => {
    return await new Promise(async (resolve, reject) => {
      await axios
        .put(url, { data, params: query })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const Delete = async (url, data, query) => {
    return await new Promise(async (resolve, reject) => {
      await axios
        .delete(url, { data: data, params: query })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const PostData = (url, data, query) => {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(url, data, { params: query })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  return {
    Get,
    Put,
    PostData,
    Delete,
  };
};

export default RequstServer;
