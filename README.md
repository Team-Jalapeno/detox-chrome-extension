<!-- PROJECT LOGO -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<p align="center">
  <a href="https://github.com/Team-Jalapeno/detox-chrome-extension/">
    <img src="./public/icon.png" alt="Logo" width="80">
  </a>

  <h3 align="center">detox-chrome-extension</h3>

  <p align="center">
    Keep your browsing free from inappropriate content.
    <br />
    <a href="https://github.com/Team-Jalapeno/detox-chrome-extension/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Team-Jalapeno/detox-chrome-extension/">View Demo</a>
    ·
    <a href="https://github.com/Team-Jalapeno/detox-chrome-extension/issues">Report Bug</a>
    ·
    <a href="https://github.com/Team-Jalapeno/detox-chrome-extension/issues">Request Feature</a>
  </p>
</p>




<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Community Flagging](#community-flagging)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)



<!-- ABOUT THE PROJECT -->
## About The Project

`Detox` is an AI-powered chrome-extension that lets you control what you see when you are browsing the web. With the help of `Detox`, you can choose to blur out obscene images, videos, and text, and concentrate on your work/scroll through social media peacefully.

Learn more about `Detox` on our [website](https://detox-extension.webflow.io/)!

<p align="center">
    <img src="./assets/demo-screenshot.png" width="250" style="text-align: center" />
</p>

On the chrome-extension popup, you can choose the strictness with which you want `Detox` to filter text and media on the webpage. You can also choose the type of content you want to filter by enabling/disabling switches on the extension. By default, text, images, and videos will be enabled.

`Detox` is made *by the community, for the community*. With the help of **community flagging**, any user can flag specific content that they believe is inappropriate. Content that is flagged by a considerable portion of the community will be filtered for users of the extension.

> `Detox` only uses Open-Source APIs and libraries. Image content detection is performed on the client-side. Text is sent to the server (the [source code](https://github.com/Team-Jalapeno/detox-backend) for which is also Open Source). However, the text sent to our servers is not stored and not linked to a user in any way.

### Built With

* [Typescript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* [nsfwjs](https://github.com/infinitered/nsfwjs)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
* Google Chrome

### Installation
 
1. Clone the repo.
```sh
git clone https://github.com/Team-Jalapeno/detox-chrome-extension.git
cd detox-chrome-extension
```
2. Install NPM packages.
```sh
npm install
```
3. Build the extension. This will create a `dist` folder.
```sh
npm run build
```
4. Head to [chrome://extensions](chrome://extensions) and turn on `Developer mode` on the top right corner.
5. Click on `Load unpacked`, and select the `dist` folder that was created in the `build` step.
6. The extension should now be available on the extension bar on chrome.


<!-- USAGE EXAMPLES -->
## Usage

Once the extension is installed, you can visit any website and any "toxic" content on the webpage should be blurred out. You can choose to turn off the filtering by toggling the switches on the extension.

When filtering images, the extension will initially *blur out all images*, and then unblur them only if the algorithm decides that the content is SFW. We do this to decrease the chances of a user seeing a "toxic" or "NSFW" image, by blurring everything instantly, and unblurring them based on the results obtained with the ML model.

> The model used has an accuracy of ~90%.

The slider on the extension sets the strictness, i.e., the threshold value for the prediction. There are 4 levels on the slider.

* **off** - Media and text will not be filtered.
* **low** - Media and text will be filtered only if the content is extremely sensitive.
* **moderate** - Media and text will be filtered if the content is moderately sensitive.
* **high** - Media and text will be filtered even if the content is slightly sensitive.

To stop the extension, move the slider to the extreme left, or toggle all the switches to the "off" state.

<p align="center">
    <img src="./assets/demo-insta.png" width="408">
    <img src="./assets/demo-reddit.png" width="400">
    <br />
    The screenshots above shows the extension in action.
</p>

To test the extension, you can visit our [Instagram Post](https://www.instagram.com/p/CUAMp3Blb11/). As of 27 July 2021, the "text filtering" feature of the extension works only on Instagram posts and comments. However, the "image filtering" feature works for on all websites.

> Note: The automated text filtering feature is supported only on Instagram posts, but it will soon be available on popular social media websites such as Facebook, Reddit, Discord, etc.

### Community Flagging

`Detox` also supports **community flagging**. If users find something that's offensive or inappropriate on any website (including text or images), they may report it. Now, if anyone else with the extension were to open the same page, the content that had been flagged will be blurred for them too!

With the help of this feature, the community can flag inappropriate content that the AI was unable to recognize.

**To flag content**, the user can `right-click` on a page, and click the "Report to Detox" option in the Chrome right-click menu. Then, the user will be able to see boxes around the items that they're hovering over, so they can click on what they want to flag. That's it! Once the flag request is received by our servers, an alert will be displayed.

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/Team-Jalapeno/detox-chrome-extension/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push -u origin feature/AmazingFeature`)
5. Open a Pull Request

You are requested to follow the contribution guidelines specified in [CONTRIBUTING.md](./CONTRIBUTING.md) while contributing to the project :smile:.

<!-- LICENSE -->
## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/roerohan"><img src="https://avatars.githubusercontent.com/u/42958812?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rohan Mukherjee</b></sub></a><br /><a href="https://github.com/Team-Jalapeno/detox-chrome-extension/commits?author=roerohan" title="Code">💻</a> <a href="https://github.com/Team-Jalapeno/detox-chrome-extension/commits?author=roerohan" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/thebongy"><img src="https://avatars.githubusercontent.com/u/7080652?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rishit Bansal</b></sub></a><br /><a href="https://github.com/Team-Jalapeno/detox-chrome-extension/commits?author=thebongy" title="Code">💻</a> <a href="https://github.com/Team-Jalapeno/detox-chrome-extension/commits?author=thebongy" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!