/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */

import InstagramTextFilter, { InstagramTextUnFilter } from './filters/instagram';
import { FilterAllImagesOnPage, UnfilterAllImagesOnPage } from './filters/nsfw';
import { getConfig } from './util/config';

function getCSSPath(el: any, callback: any) {
  let fullPath = '';
  // eslint-disable-next-line no-shadow
  const cssPathFn = (el: any, callback: any) => {
    let elPath = '';

    elPath = $(el).prop('tagName').toLowerCase();

    if (typeof $(el).attr('id') !== 'undefined') {
      elPath = `${elPath}#${$(el).attr('id')}`;
    }

    if (typeof $(el).attr('class') !== 'undefined') {
      elPath = `${elPath}.${$(el).attr('class')!.split(' ').join('.')}`;
    }

    fullPath = `${elPath} ${fullPath}`;

    if (typeof $(el).parent().prop('tagName') !== 'undefined') {
      cssPathFn($(el).parent(), callback);
    } else {
      callback(fullPath);
    }
  };

  cssPathFn(el, callback);
}

const startOverlay = () => {
  $('*').not('body, html').hover(function (e) {
    $(this).css('border', '1px solid #000');
    e.stopPropagation();
  }, function (e) {
    $(this).css('border', '0px');
    e.stopPropagation();
  });

  $(window).click((event) => {
    $('*').not('body,html').hover(function () {
      $(this).css('border', 'none');
    });
    $(window).off('click');
    getCSSPath(event.target, (path: string) => {
      console.log(path);

      $.ajax({
        type: 'POST',

        url: '', // server URL (with https)
        data: {
          userid: '',
          csspath: path,
          url: window.location.href,
        },
        success() {
          alert('successfully reported');
        },
      });
    });

    return false;
  });
};

chrome.runtime.onMessage.addListener((msg) => {
  console.log(msg);
  switch (msg.data) {
    case 'start-overlay':
      startOverlay();
      break;
    default:
      break;
  }
});

chrome.storage.onChanged.addListener(async (changes) => {
  const config = await getConfig();

  if (changes.images) {
    if (changes.images.newValue) {
      FilterAllImagesOnPage(config.level);
    } else {
      UnfilterAllImagesOnPage();
    }
  }

  if (changes.text) {
    if (changes.text.newValue) {
      InstagramTextFilter(config.level);
    } else {
      InstagramTextUnFilter();
    }
  }

  if (changes.level) {
    if (config.images) {
      FilterAllImagesOnPage(changes.level.newValue);
    }

    if (config.text) {
      InstagramTextFilter(changes.level.newValue);
    }
  }
});

window.onload = async () => {
  const config = await getConfig();

  if (config.images) {
    FilterAllImagesOnPage(config.level);
  }

  const page = window.location.href;

  if (page.match(/https:\/\/(www\.|)instagram\.com\/p\/\w+/)) {
    if (config.text) {
      InstagramTextFilter(config.level);
    }
  }
};
