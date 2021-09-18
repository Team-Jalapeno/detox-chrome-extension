/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */

import { FilterAllImagesOnPage, UnfilterAllImagesOnPage } from './filters/nsfw';
import { getConfig } from './util/config';

chrome.storage.onChanged.addListener((changes) => {
  if (changes.images) {
    if (changes.images.newValue) {
      FilterAllImagesOnPage();
    } else {
      UnfilterAllImagesOnPage();
    }
  }
});

window.onload = async () => {
  const config = await getConfig();

  if (config.images) {
    FilterAllImagesOnPage();
  }
};

function nodeInsertedCallback() {
  // Node inserted callback
  // console.log(event.target.querySelectorAll('img'));
}

document.addEventListener('DOMNodeInserted', nodeInsertedCallback);
