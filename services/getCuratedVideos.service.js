const axios = require("axios");

const categories = ["vim", "arch linux", "system76", "pop os"];

async function getData(query) {
  try {
    const response = await axios.get(`http://youtube-scrape.herokuapp.com/api/search?q=${query}
`);
    if (response.status === 200) {
      const {
        data: { results },
      } = response;
      const videos = results.map((item) => {
        if (item.video) {
          return { ...item.video, category: query };
        }
      });
      console.log(videos);
    }
  } catch (error) {
    console.log(error);
  }
}

categories.forEach((category) => {
  getData(category);
});
