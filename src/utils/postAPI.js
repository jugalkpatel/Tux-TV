import axios from "axios";
const postAPI = async (url, payload) => {
  try {
    const { data, status } = await axios.post(url, payload);
    return { data, status };
  } catch (error) {
    const { data, status } = error?.response || { data: null, status: 404 };
    return { data, status };
  }
};

export { postAPI };
