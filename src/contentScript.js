function templateButton(innerText, text) {
  const button = document.createElement("button");
  button.innerText = innerText
  button.className = 'aui-button';
  button.type = 'button';
  button.style.paddingLeft = '4px';
  button.addEventListener('click', ev => {
    const textareas = document.getElementsByClassName('textarea');
    const textAreaElem = textareas.item(0);
    textAreaElem.value = text
    textAreaElem.selectionEnd = text.length
    textAreaElem.selectionStart = text.length
    textAreaElem.focus();
  })
  return button;
}

const superRobota = templateButton('[MUST]', '[MUST] tutaj coś się nie zgadza: ');
const zjebales = templateButton('[COULD]', '[COULD] moglibyśmy to zmienić: ');
const mozePopraw = templateButton('[SHOULD]', '[SHOULD] wypadałoby to zmienić: ');
new MutationObserver((mutations, observer) => {
  const filtered = mutations.filter(value => {
    const target = value.target;
    return target.localName === 'ol' && target.className === 'comment-list';
  });
  if (filtered.length !== 0) {
    const elementsByClassName = document.getElementsByClassName('buttons');
    const length = elementsByClassName.length;
    for (let i = 0; i < length; i++) {
      const item = elementsByClassName.item(i);
      item.append(superRobota, mozePopraw, zjebales);
    }
  }
}).observe(document.body, {childList: true, subtree: true});
