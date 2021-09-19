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
  console.log(blurValue);
  el.style.filter = `blur(${blurValue || 50}px)`;
  el.style.userSelect = 'none';
}

export function RemoveBlurOverlay(element: HTMLElement) {
  const el = element;
  el.style.removeProperty('filter');
  el.style.userSelect = 'auto';
}
