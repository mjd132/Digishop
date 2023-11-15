import axios from "axios";
const RequstServer = () => {
  const Get = (url, params) => {
    const response = axios.get(url, params);
    return response;
  };
  const Update = (url, data) => {
    const res = axios.patch(url, data);
    return res;
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
    Update,
    PostData,
  };
};

export default RequstServer;
