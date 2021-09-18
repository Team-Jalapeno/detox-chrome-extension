export function BlurAllImages() {
  const style = document.createElement('style');
  style.id = 'detox-blur-image';
  style.appendChild(document.createTextNode(`
  img {
    filter: blur(16px);
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

export function CreateImageBlurOverlay(element: HTMLImageElement) {
  const el = element;
  el.dataset.previousFilter = el.style.filter;
  el.dataset.bluredBy = 'detox';
  el.style.filter = 'blur(16px)';
}

export function RemoveImageBlurOverlay(element: HTMLImageElement) {
  const el = element;

  if (el.dataset.previousFilter) {
    el.style.filter = el.dataset.previousFilter;
  } else {
    el.style.filter = 'none';
  }
  el.dataset.bluredBy = undefined;
}
