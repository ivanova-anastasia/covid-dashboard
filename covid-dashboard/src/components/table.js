import Expander from './common/expander';
import indicators from './common/indicators';
import generateElement from '../utils/helper';
import dashboardData from '../api/dashboardData';
import {
  CASES_INDICATOR,
  DEATHS_INDICATOR,
  RECOVERED_INDICATOR,
  WHOLE_WORLD,
  LOADING, 
  UNKNOWN
} from '../utils/constants';

export default class Table {
  constructor() {
    this.table = document.querySelector('.countries-table');
    this.indicatorSet = indicators.createIndicatorElements(false);
  }

  render() {
    this.covidDataContainer = generateElement('div', 'covidData-container', '');
    this.table.append(this.covidDataContainer);
    this.addCovidDataToTable(LOADING, LOADING, LOADING);
    this.addEventListenerIndicatorElements();
  }

  addEventListenerIndicatorElements() {
    this.indicatorSet.addEventListener('updateIndicators', (event) => {
      const cases = dashboardData.getCountByFilter(CASES_INDICATOR);
      const deaths = dashboardData.getCountByFilter(DEATHS_INDICATOR);
      const recovered = dashboardData.getCountByFilter(RECOVERED_INDICATOR);

      this.addCovidDataToTable(cases, deaths, recovered);
    });
  }

  addCovidDataToTable(cases, deaths, recovered) {
    const covidDataItemCases = this.getTableItemElements('Coronavirus Cases', cases);
    const covidDataItemDeaths = this.getTableItemElements('Deaths', deaths);
    const covidDataItemRecover = this.getTableItemElements('Recovered', recovered);
    this.covidDataContainer.innerHTML = '';
    this.covidDataContainer.append(...covidDataItemCases, ...covidDataItemDeaths, ...covidDataItemRecover);
  }

  getTableItemElements(name, value) {
    const covidDataItemName = generateElement('div', 'covidData-container__item_name', name || UNKNOWN);
    const covidDataItemValue = generateElement('div', 'covidData-container__item_value', value || UNKNOWN);
    const covidDataItemDots= generateElement('div', 'covidData-container__item_dots' || UNKNOWN);
    return [covidDataItemName, covidDataItemValue, covidDataItemDots]
  }
}
