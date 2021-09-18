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
  el.style.filter = 'blur(16px)';
}

export function RemoveImageBlurOverlay(element: HTMLImageElement) {
  const el = element;
  el.style.removeProperty('filter');
}
