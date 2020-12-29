require("dotenv/config");
const Youtube = require("youtube-node");
const youtube = new Youtube();
youtube.setKey(process.env.YOUTUBE_API_TOKEN);

function searchVideoURL(message, queryText) {
  console.log("searchVideoURL", queryText);
  return new Promise((resolve, reject) => {
    youtube.search(
      `Execício em casa para ${queryText}`,
      2,
      function (error, result) {
        if (!error) {
          const videoIds = result.items
            .map((item) => item.id.videoId)
            .filter((item) => item);
          const youtubeLinks = videoIds
            .map((videoId) => `https://www.youtube.com/watch?v=${videoId}`)
            .join(", ");
          resolve(`${message} ${youtubeLinks}`);
          console.log("ok", `${message} ${youtubeLinks}`);
        } else {
          console.log("error", error);
          reject(error);
        }
      }
    );
  });
}

module.exports.searchVideoURL = searchVideoURL;
