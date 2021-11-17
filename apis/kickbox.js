const axios = require("axios");

const axiosGet = async (domainEmail) => {
  const { data } = await axios({
    method: "get",
    url: process.env.KICKBOX_URL + domainEmail,
  });
  return data;
};

module.exports = axiosGet;
