const axios = require("axios");

const parseYtLink = async url => {
  const URL = "https://www.youtube.com/oembed?url=" + url + "&format=json";
  try {
    const res = await axios.get(URL);
    const data = res.data;
    const thumbnail = data?.thumbnail_url;
    const src = data?.html.match(/src="(.*?)"/)[1];
    const video_id = src.split("embed/")[1].split("?")[0];

    return {
      thumbnail,
      embed: src,
      video_id,
    };
  } catch (e) {
    return null;
  }
};

module.exports = parseYtLink;
