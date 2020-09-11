new MutationObserver((mutations, observer) => {
  console.log(mutations);
}).observe(document.body, {childList: true, subtree: true});
