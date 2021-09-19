/* eslint-disable no-underscore-dangle */
import tippy from 'tippy.js';

export function BlurAllImages() {
  const style = document.createElement('style');
  style.id = 'detox-blur-image';
  style.appendChild(document.createTextNode(`
  img {
    filter: blur(50px);
  }
  `));

  document.head.appendChild(style);
}

export function RemoveBlurAllImages() {
  const detoxBlurStyle = document.getElementById('detox-blur-image');
  if (detoxBlurStyle) {
    document.head.removeChild(detoxBlurStyle);
  }
}

export function CreateBlurOverlay(element: HTMLElement, blurValue?: number) {
  const el = element;
  el.style.filter = `blur(${blurValue || 50}px)`;
  el.style.userSelect = 'none';

  if (!(el as any)._tippy) {
    tippy(el, {
      content: 'Blurred by Detox!',
    });
  }
}

export function RemoveBlurOverlay(element: HTMLElement) {
  const el = element;
  el.style.removeProperty('filter');
  el.style.userSelect = 'auto';
  if ((el as any)._tippy) {
    (el as any)._tippy.destroy();
  }
}
