import generateElement from '../utils/helper';
import indicators from './common/indicators';
import Expander from './common/expander';
import dashboardData from '../api/dashboardData';
import { WHOLE_WORLD } from '../utils/constants';

export default class List {
  countryListElement = null;

  countrySearchListElement = null;

  countryInputSearchElement = null;

  countries = [];

  countryNameElement = null;

  constructor() {
    this.list = document.querySelector('.countries-list');
    this.searchElement = this.createSearchElement();
    this.indicatorSet = indicators.createIndicatorElements();
  }

  render() {
    const expander = new Expander(false).create();
    const listContent = this.createListContent();
    this.list.append(expander, listContent);
  }

  createSearchElement() {
    const searchElement = generateElement('div', 'search');
    const dropdownElement = generateElement('div', 'search__dropdown');
    const countryButton = generateElement('button', 'search__dropdown_button');
    const iconExplore = generateElement(
      'span',
      'material-icons',
      'travel_explore'
    );
    const countryName = generateElement(
      'p',
      'search__dropdown_button__country-name',
      indicators.country
    );
    this.countryNameElement = countryName;
    const iconDropDown = generateElement(
      'span',
      ['material-icons', 'search__dropdown_button__icon'],
      'arrow_drop_down'
    );
    countryButton.append(iconExplore, countryName, iconDropDown);
    const contentElement = generateElement('div', 'search__dropdown_content');
    const inputElement = generateElement(
      'input',
      'search__dropdown_content__input'
    );
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('placeholder', 'Search..');
    inputElement.addEventListener('input', (event) => {
      this.filterResults(event.target);
    });
    this.countryInputSearchElement = inputElement;
    this.countrySearchListElement = contentElement;
    contentElement.append(inputElement);
    dropdownElement.append(countryButton, contentElement);
    searchElement.appendChild(dropdownElement);

    searchElement.addEventListener('click', (event) => {
      const targetElement = event.target;
      if (targetElement.classList.contains('search__dropdown_content__item')) {
        indicators.setCountry(targetElement.text);
        this.toggleSearchDropDownElement();
        this.updateCountryName();
      } else if (
        targetElement.classList.contains('search__dropdown_button') ||
        targetElement.parentElement.classList.contains(
          'search__dropdown_button'
        )
      ) {
        this.toggleSearchDropDownElement();
      }
    });
    return searchElement;
  }

  updateCountryName() {
    this.countryNameElement.innerText = indicators.country;
  }

  toggleSearchDropDownElement() {
    const searchDropDownClassList = this.searchElement.querySelector(
      '.search__dropdown_content'
    ).classList;
    searchDropDownClassList.toggle('search__dropdown_content_show');
    const searchDropDownIconText = this.searchElement.querySelector(
      '.search__dropdown_button__icon'
    );
    if (searchDropDownClassList.contains('search__dropdown_content_show')) {
      searchDropDownIconText.innerText = 'arrow_drop_up';
    } else {
      searchDropDownIconText.innerText = 'arrow_drop_down';
    }
  }

  filterResults() {
    const filter = this.countryInputSearchElement.value.toUpperCase();
    const items = this.countryInputSearchElement.parentElement.getElementsByTagName(
      'a'
    );
    for (let i = 0; i < items.length; i += 1) {
      const txtValue = items[i].textContent || items[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        items[i].style.display = '';
      } else {
        items[i].style.display = 'none';
      }
    }
  }

  createCountryListElement() {
    const countryList = generateElement('div', 'countries-all');
    const ulElement = generateElement('ul', 'countries-all__list');
    this.countryListElement = ulElement;
    countryList.addEventListener('click', (event) => {
      let countryName = '';
      if (event.target.childElementCount === 0) {
        countryName = event.target.parentElement.lastElementChild.textContent;
      } else {
        countryName = event.target.lastElementChild.textContent;
      }
      indicators.setCountry(countryName);
      this.updateCountryName();
    });
    countryList.appendChild(ulElement);
    return countryList;
  }

  createCountryItemElement(countryName, count, iso2) {
    const wrapper = generateElement('li', 'countries-all__list__item');
    const casesCount = generateElement(
      'p',
      'countries-all__list__item__count',
      count
    );
    const country = generateElement(
      'p',
      'countries-all__list__item__country',
      countryName
    );

    const flag = generateElement('i', [
      'flag-icon',
      `flag-icon-${iso2.toLowerCase()}`,
      'countries-all__list__item__flag',
    ]);

    wrapper.append(flag, casesCount, country);
    return wrapper;
  }

  createCountrySearchItemElement(countryName) {
    return generateElement('a', 'search__dropdown_content__item', countryName);
  }

  addCountriesToList(countries) {
    const countryElements = countries.map((data) => {
      return this.createCountryItemElement(data.country, data.value, data.iso2);
    });
    this.countryListElement.innerHTML = '';
    this.countryListElement.append(...countryElements);
  }

  addCountriesToSearchList(countries) {
    if (this.countrySearchListElement.childElementCount > 1) return;
    const countryElements = countries.map((data) => {
      return this.createCountrySearchItemElement(data.country);
    });
    countryElements.unshift(this.createCountrySearchItemElement(WHOLE_WORLD));
    this.countrySearchListElement.append(...countryElements);
  }

  addEventListenerIndicatorElements() {
    this.indicatorSet.addEventListener('updateIndicators', () => {
      const countriesData = dashboardData.getCountriesWithCases();
      this.addCountriesToList(countriesData);
      this.addCountriesToSearchList(countriesData);
    });
  }

  createListContent() {
    const content = generateElement('div', 'list-content');
    const search = this.searchElement;
    const list = this.createCountryListElement();
    content.append(search, list, this.indicatorSet);
    this.addEventListenerIndicatorElements();
    return content;
  }
}
