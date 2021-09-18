/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */

import filterImage from './filters/nsfw';
import sleep from './util/sleep';

chrome.runtime.onMessage.addListener((msg) => {
  console.log(msg);

  // if (msg.color) {
  //   console.log(`Receive color = ${msg.color}`);
  //   document.body.style.backgroundColor = msg.color;
  //   sendResponse(`Change color to ${msg.color}`);
  // } else {
  //   sendResponse('Color message is none.');
  // }
});

window.onload = async () => {
  const images = [...document.querySelectorAll('img')];
  for (const image in images) {
    try {
      console.log(await filterImage(images[image], 0.5));
      await sleep(50);
    } catch (err) {
      console.log(err);
      // Blank
    }
  }
};

function nodeInsertedCallback(event: any) {
  console.log(event.target.querySelectorAll('img'));
}

document.addEventListener('DOMNodeInserted', nodeInsertedCallback);
