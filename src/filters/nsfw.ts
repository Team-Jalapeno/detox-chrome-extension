/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import * as nsfwjs from 'nsfwjs';
import { FilterResult } from '../types';
import { CreateImageBlurOverlay, RemoveImageBlurOverlay } from '../util/overlay';
import sleep from '../util/sleep';

let model: nsfwjs.NSFWJS;

nsfwjs.load('https://s3.ap-south-1.amazonaws.com/cdn.dyte.in/lib/').then((loaded) => {
  model = loaded;
});

async function scanImage(element: HTMLImageElement) {
  while (!model) {
    // eslint-disable-next-line no-await-in-loop
    await sleep(1000);
  }
  return model.classify(element);
}

export default async function filterImage(
  image: HTMLImageElement, threshold: Number,
): Promise<FilterResult> {
  const width = image.clientWidth;
  if (width < 50) {
    return {
      filter: false,
      reason: 'The image is too small',
    };
  }
  const newImg = new Image(200, 200);
  newImg.crossOrigin = 'anonymous';
  newImg.src = image.src;
  const result = await scanImage(newImg);
  const highest = result[0];

  if (highest.className === 'Neutral' || highest.className === 'Drawing') {
    return {
      filter: false,
      reason: 'The image is neutral.',
    };
  }

  if (highest.probability < threshold) {
    return {
      filter: false,
      reason: 'The image is below the given threshold.',
    };
  }

  return {
    filter: true,
    reason: `The image has ${highest.className} content which is over the configured threshold.`,
  };
}

export async function filterImages(
  images: HTMLImageElement[],
) {
  const results = [];
  for (const image of images) {
    const result = await filterImage(image, 0.5);
    results.push(result);
    await sleep(50);
  }

  return results;
}

export async function FilterAllImagesOnPage() {
  const images = [...document.querySelectorAll('img')];
  images.map(CreateImageBlurOverlay);
  const promises = images.map(async (image) => {
    try {
      const result = await filterImage(image, 0.5);

      if (!result.filter) {
        RemoveImageBlurOverlay(image);
      }
    } catch (err) {
      console.log(err);
      // Blank
    }
  });
  await Promise.all(promises);
}

export async function UnfilterAllImagesOnPage() {
  const images = [...document.querySelectorAll('img')];
  images.map(RemoveImageBlurOverlay);
}
