const axios = require("axios");

const axiosPost = async (expr) => {
  const { data } = await axios({
    method: "post",
    url: process.env.MATHJS_URL,
    headers: {
      "content-type": "application/json"
    },
    data: {expr, precision: 14},
  });
  return data;
};

module.exports = axiosPost;
