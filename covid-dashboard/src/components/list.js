import generateElement from '../utils/helper';
import indicators from './common/indicators';

export default class List {
  constructor() {
    this.body = document.querySelector('body');
    this.searchElement = this.createSearchElement();
    this.body.append(this.searchElement);
    this.dropbtn = document.querySelector('.search__dropdown_button');
    this.myInput = document.querySelector('.search__dropdown_content__input');
  }

  render() {}

  createSearchElement() {
    const searchElement = generateElement('div', 'search');
    const dropdownElement = generateElement('div', 'search__dropdown');
    const countryButton = generateElement(
      'button',
      'search__dropdown_button',
      indicators.country
    );
    const contentElement = generateElement('div', 'search__dropdown_content');
    const inputElement = generateElement(
      'input',
      'search__dropdown_content__input'
    );
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('placeholder', 'Search..');
    inputElement.addEventListener('keyup', (event) => {
      this.filterResults(event.target);
    });

    const itemElement = generateElement(
      'a',
      'search__dropdown_content__item',
      'Test'
    );
    itemElement.setAttribute('href', '#base');

    itemElement.addEventListener('blur', (event) => {
      const targetElement = event.target;
    });

    const itemElement2 = generateElement(
      'a',
      'search__dropdown_content__item',
      'Dog'
    );
    itemElement.setAttribute('href', '#dog');

    contentElement.append(inputElement, itemElement, itemElement2);
    dropdownElement.append(countryButton, contentElement);
    searchElement.appendChild(dropdownElement);

    searchElement.addEventListener('click', (event) => {
      const targetElement = event.target;
      if (targetElement.classList.contains('search__dropdown_button')) {
        this.toggleSearchDropDownElement();
      } else if (
        targetElement.classList.contains('search__dropdown_content__item')
      ) {
        indicators.setCountry(targetElement.text);
        this.toggleSearchDropDownElement();
      }
    });
    return searchElement;
  }

  toggleSearchDropDownElement() {
    this.searchElement
      .querySelector('.search__dropdown_content')
      .classList.toggle('search__dropdown_content_show');
  }

  filterResults(targetElement) {
    const filter = targetElement.value.toUpperCase();
    const items = targetElement.parentElement.getElementsByTagName('a');
    for (let i = 0; i < items.length; i += 1) {
      const txtValue = items[i].textContent || items[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        items[i].style.display = '';
      } else {
        items[i].style.display = 'none';
      }
    }
  }
}
