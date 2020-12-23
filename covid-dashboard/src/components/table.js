import Expander from './common/expander';
import indicators from './common/indicators';
import generateElement from '../utils/helper';
import dashboardData from '../api/dashboardData';
import {
  CASES_INDICATOR,
  DEATHS_INDICATOR,
  RECOVERED_INDICATOR,
  WHOLE_WORLD,
} from '../utils/constants';

export default class Table {
  constructor() {
    this.table = document.querySelector('.countries-table');
    this.indicatorSet = indicators.createIndicatorElements(false);
  }

  render() {
    const expander = new Expander(false).create();
    this.table.append(expander);
    this.covidDataContainer = generateElement('div', 'covidData-container', '');
    this.table.append(this.covidDataContainer, this.indicatorSet);
    this.addEventListenerIndicatorElements();
  }

  addEventListenerIndicatorElements() {
    this.indicatorSet.addEventListener('updateIndicators', (event) => {
      const cases = dashboardData.getCountByFilter(CASES_INDICATOR);
      const deaths = dashboardData.getCountByFilter(DEATHS_INDICATOR);
      const recovered = dashboardData.getCountByFilter(RECOVERED_INDICATOR);
      console.log(recovered);
      this.addCovidDataToTable(cases, deaths, recovered);
    });
  }

  addCovidDataToTable(cases, deaths, recovered) {
    const covidDataItemCases = generateElement(
      'div', 'covidData-container__item', `Количество случаев заболевания - ${cases}`
    );
    const covidDataItemDeaths = generateElement(
      'div', 'covidData-container__item', `Количество летальных исходов - ${deaths}`
    );
    const covidDataItemRecover = generateElement(
      'div', 'covidData-container__item', `Количество выздоровевших - ${recovered}`
    );
    this.covidDataContainer.innerHTML = '';
    this.covidDataContainer.append(covidDataItemCases, covidDataItemDeaths, covidDataItemRecover);
  }
};
