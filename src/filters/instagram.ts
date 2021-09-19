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
  return Promise.all(
    elements.map(async (el) => {
      const response = await checkPerspectiveApi(el.innerText, threshold);
      if (response.filter) {
        CreateBlurOverlay(el, 4);
      }
    }),
  );
}
