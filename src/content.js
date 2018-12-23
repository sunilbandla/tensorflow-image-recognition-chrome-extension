const BIRYANI_SRC = '//upload.wikimedia.org/wikipedia/commons/7/7c/Hyderabadi_Chicken_Biryani.jpg';
const imageMeta = {};

function setImageTitles() {
  const images = document.getElementsByTagName('img');
  const keys = Object.keys(imageMeta);
  for(let u = 0; u < keys.length; u++) {
    const url = keys[u];
    const meta = imageMeta[url];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (img.src === meta.url) {
        // img.title = img.src + `:\n\n${img.title}\n\n` + JSON.stringify(meta.predictions);
        delete keys[u];
        delete imageMeta[url];
        if (meta.isAnimal) {
          img.src = BIRYANI_SRC;
        }
      }
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.payload && message.action === 'IMAGE_PROCESSED') {
    const { payload } = message;
    if (payload && payload.url) {
      imageMeta[payload.url] = payload;
      setImageTitles();
    }
  }
});

window.addEventListener('load', setImageTitles, false);
