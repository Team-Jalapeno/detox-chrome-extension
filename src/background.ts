import { nanoid } from 'nanoid';

function polling() {
  // console.log("polling");
  setTimeout(polling, 1000 * 30);
}

polling();
const detoxReport = () => {
  chrome.runtime.sendMessage('hello');
  console.log('selected');
  // $(window).mouseenter(function (event) {
  //   $(event.target).addClass("el-selection");
  // });

  // $(window).mouseleave(function (event) {
  //   $(event.target).removeClass("el-selection");
  // });

  // $(window).click(function (event) {
  //   console.log("selected: ", event.target);
  //   return false;
  // });
};

chrome.contextMenus.create({
  title: 'Report to Detox',
  contexts: ['all'],
  onclick: detoxReport,
});

const uid = nanoid(16);
chrome.storage.sync.get(['userid', 'level', 'text', 'videos', 'images'], (items) => {
  console.log(items);
  if (items.userid === undefined) {
    chrome.storage.sync.set({ userid: uid });
    console.log('generated new user id');
  }

  if (items.level === undefined) {
    chrome.storage.sync.set({ level: 66.666 });
  }

  if (items.text === undefined) {
    chrome.storage.sync.set({ text: true });
  }

  if (items.videos === undefined) {
    chrome.storage.sync.set({ videos: true });
  }

  if (items.images === undefined) {
    chrome.storage.sync.set({ images: true });
  }

  console.log('read from config');
});
