/* eslint-disable func-names */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */

import axios from 'axios';
import getCssSelector from 'css-selector-generator';
import InstagramTextFilter, { InstagramTextUnFilter } from './filters/instagram';
import { FilterAllImagesOnPage, UnfilterAllImagesOnPage } from './filters/nsfw';
import { } from './util/overlay';
import { getConfig } from './util/config';
import popoverCss from './util/popoverCss';
import filterCommunityReports, { blurFlaggedItem } from './filters/community';

jQuery.fn.extend({
  getPath() {
    let path; let
      node: any = this;
    while (node.length) {
      console.log(node);
      const realNode = node[0]; let
        { name } = realNode;
      if (!name) break;
      name = name.toLowerCase();

      const parent = node.parent();

      const sameTagSiblings = parent.children(name);
      if (sameTagSiblings.length > 1) {
        const allSiblings = parent.children();
        const index = allSiblings.index(realNode) + 1;
        if (index > 1) {
          name += `:nth-child(${index})`;
        }
      }

      path = name + (path ? `>${path}` : '');
      node = parent;
    }
    console.log('inside path fn');
    console.log(path);
    return path;
  },
});

const reportDetox = async (propName: string, path: string, selection: JQuery<HTMLImageElement>, type: string) => {
  // console.log($(event.target).prop('tagName'));
  // const selection = $(event.target).find('img');
  let contentType = 'text';
  console.log(path);
  console.log('sending')
  // console.log($(event.target).find('img'));
  if (selection.length > 0 || propName === 'IMG') {
    // its an image
    contentType = 'image';
  }

  // let URL = type === 'report' ? 'https://eng-hack.herokuapp.com/community/report' : 'https://eng-hack.herokuapp.com/community/unreport';
  let URL = `https://eng-hack.herokuapp.com/community/${type === 'report' ? 'report' : 'unreport'}`;
  try {
    const config = await getConfig();
    const response = await axios.post(URL, {
      url: window.location.href,
      contentType,
      vote: 0,
      selector: path,
      userId: config.userid,
    });
    console.log(response.data);

    if (response.data.error) {
      alert(response.data.msg);
    } else {

      if (type === 'unreport') {
        alert("Selected item has been unreported. Refresh page to see changes");
      }
      else {
        blurFlaggedItem({ selector: path, contentType }, config.text, config.images);
        alert('The content was flagged successfully!');
      }
    }
  } catch (e) {
    console.log('error');
    console.log(e);
  }
};

const startOverlay = (type: string) => {
  console.log('starting overlay');
  $('*').not('body, html').hover(function (e) {
    $(this).css('border', '1px solid #000');
    e.stopPropagation();
  }, function (e) {
    $(this).css('border', '0px');
    e.stopPropagation();
  });

  $(window).click((event: any) => {
    $('*').not('body,html').on('mouseenter', function () {
      $(this).css('border', 'none');
    });
    $(window).off('click');

    const selPath = getCssSelector((event.target as any), { selectors: ['tag', 'class'] });
    reportDetox($(event.target).prop('tagName'), selPath, $(event.target).find('img'), type);
    return false;
  });
};

chrome.runtime.onMessage.addListener((msg) => {
  console.log(msg);
  switch (msg.data) {

    case 'start-unreport-overlay':
      startOverlay('unreport');
      break;

    case 'start-overlay':
      startOverlay('report');
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

  filterCommunityReports(config.text, config.images);
});

window.onload = async () => {
  popoverCss();

  const config = await getConfig();

  if (config.images) {
    FilterAllImagesOnPage(config.level);
  }

  const page = window.location.href;

  if (page.match(/https:\/\/(www\.|)instagram\.com\/p\/\w+/)) {
    setTimeout(() => {
      if (config.text) {
        InstagramTextFilter(config.level);
      }
    }, 1000);
  }
  filterCommunityReports(config.text, config.images);
};
