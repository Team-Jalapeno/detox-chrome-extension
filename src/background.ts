function polling() {
  // console.log("polling");
  setTimeout(polling, 1000 * 30);
}

polling();
const detoxReport = function (selection: any) {
  chrome.runtime.sendMessage('hello');
  console.log(`selected`);
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
  title: "Report to Detox",
  contexts: ["all"],
  onclick: detoxReport,
});
