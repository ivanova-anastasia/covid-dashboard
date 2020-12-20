export default (tagName, classList, textContent) => {
  const element = document.createElement(tagName);
  if (classList) {
    if (typeof classList === 'object') {
      element.classList.add(...classList);
    } else {
      element.classList.add(classList);
    }
  }
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
};
