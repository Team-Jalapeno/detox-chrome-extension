chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  console.log(msg);

  // if (msg.color) {
  //   console.log(`Receive color = ${msg.color}`);
  //   document.body.style.backgroundColor = msg.color;
  //   sendResponse(`Change color to ${msg.color}`);
  // } else {
  //   sendResponse('Color message is none.');
  // }
});


