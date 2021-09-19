import { CreateBlurOverlay, RemoveBlurOverlay } from '../util/overlay';
import checkPerspectiveApi from './perspective';

export async function InstagramTextUnFilter() {
  const elements = [...document.getElementsByClassName('ZyFrc')] as HTMLElement[];
  elements.map(RemoveBlurOverlay);
}

export default async function InstagramTextFilter(threshold: number) {
  if (threshold === 0) {
    return InstagramTextUnFilter();
  }
  const elements = [...document.getElementsByClassName('ZyFrc')] as HTMLElement[];
  const responses = await Promise.all(
    elements.map((el) => checkPerspectiveApi(el.innerText, threshold)),
  );

  for (let i = 0; i < elements.length; i += 1) {
    if (responses[i].filter) {
      CreateBlurOverlay(elements[i], 4);
    }
  }
}
