/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */

import { FilterAllImagesOnPage, UnfilterAllImagesOnPage } from './filters/nsfw';
import { getConfig } from './util/config';

chrome.storage.onChanged.addListener(async (changes) => {
  const config = await getConfig();

  if (changes.images) {
    if (changes.images.newValue) {
      FilterAllImagesOnPage(config.level);
    } else {
      UnfilterAllImagesOnPage();
    }
  }

  if (changes.level) {
    if (config.images) {
      FilterAllImagesOnPage(changes.level.newValue);
    }
  }
});

window.onload = async () => {
  const config = await getConfig();

  if (config.images) {
    FilterAllImagesOnPage(config.level);
  }
};

function nodeInsertedCallback() {
  // Node inserted callback
  // console.log(event.target.querySelectorAll('img'));
}

document.addEventListener('DOMNodeInserted', nodeInsertedCallback);
