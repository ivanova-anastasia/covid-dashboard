export default class Expander {
  constructor(isExpanded) {
    this.isExpanded = isExpanded;
  }

  create() {
    this.div = document.createElement('div');
    this.img = document.createElement('img');

    this.div.classList.add('expand-container');
    this.div.classList.add('invisible');
    this.img.classList.add('expand-image');

    this.img.setAttribute('src', './assets/images/expand.png');
    this.div.append(this.img);

    this.div.addEventListener('click', (event) => {
      if (!this.isExpanded) {
        this.img.setAttribute('src', './assets/images/minimize.png');
        this.isExpanded = true;
      } else {
        this.img.setAttribute('src', './assets/images/expand.png');
        this.isExpanded = false;
      }
      event.currentTarget.parentElement.classList.toggle('expanded');
    });
    return this.div;
  }
}
