import checkPerspectiveApi from "./perspective";

export async function InstagramTextFilter(threshold: number) {
  const elements = [...document.getElementsByClassName('ZyFrc')] as HTMLElement[];
  const responses = await Promise.all(
    elements.map((el) => checkPerspectiveApi(el.innerText, threshold)),
  );

  for (let i = 0; i < elements.length; i += 1) {
    if (responses[i].filter) {

    }
  }
}

export function InstagramTextUnfilter() {

}

function InstagramCommentBlur(element: HTMLElement) {
  
}
