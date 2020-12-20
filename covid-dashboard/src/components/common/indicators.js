import {
  CASES_INDICATOR,
  DEATHS_INDICATOR,
  RECOVERED_INDICATOR,
  WHOLE_WORLD,
} from '../../utils/constants';
import generateElement from '../../utils/helper';

export default {
  isAllPeriod: true,
  isAbsoluteValue: true,
  criterion: CASES_INDICATOR,
  country: WHOLE_WORLD,
  selectElements: [],
  switchPeriodElements: [],
  switchValueElements: [],

  setCountry: function (country) {
    this.country = country;
    this.updateDashboard();
  },
  async updateDashboardCountry() {
    // TODO: implement custom event
  },
  updateDashboardIndicators: function () {
    // TODO: implement custom event
  },
  updateIndicatorElements: function () {
    this.selectElements.forEach((element) => {
      const selectElement = element;
      selectElement.selectedIndex = this.criterion;
    });
  },
  updatePeriodElements: function () {
    this.switchPeriodElements.forEach((element) => {
      const checkedElement = element;
      checkedElement.querySelector('input').checked = this.isAllPeriod;
      checkedElement.querySelector('.toggle__description').innerText = this
        .isAllPeriod
        ? 'all period'
        : 'today';
    });
  },
  updateValueSwitchElements: function () {
    this.switchValueElements.forEach((element) => {
      const checkedElement = element;
      checkedElement.querySelector('input').checked = this.isAllPeriod;
      checkedElement.querySelector('.toggle__description').innerText = this
        .isAllPeriod
        ? 'absolute'
        : 'per 100,000';
    });
  },
  createSelectElement: function () {
    const selectElement = generateElement('select', 'criterion');
    const casesOption = generateElement('option', 'criterion__option', 'Cases');
    casesOption.value = CASES_INDICATOR;
    const deathsOption = generateElement(
      'option',
      'criterion__option',
      'Deaths'
    );
    deathsOption.value = DEATHS_INDICATOR;
    const recoveredOption = generateElement(
      'option',
      'criterion__option',
      'Recovered'
    );
    recoveredOption.value = RECOVERED_INDICATOR;

    selectElement.appendChild(casesOption);
    selectElement.appendChild(deathsOption);
    selectElement.appendChild(recoveredOption);

    selectElement.addEventListener('change', (event) => {
      this.criterion = event.target.value;
      this.updateIndicatorElements();
      this.updateDashboardIndicators();
    });
    this.selectElements.push(selectElement);
    return selectElement;
  },
  createSwitchElement: function (indicator, text) {
    const switchWrapperElement = generateElement('div', 'toggle');
    const switchElement = generateElement('label', 'toggle__switch');

    const inputElement = generateElement('input');
    inputElement.setAttribute('type', 'checkbox');
    inputElement.checked = indicator;
    const spanElement = generateElement('span', 'toggle__switch__slider');

    switchElement.appendChild(inputElement);
    switchElement.appendChild(spanElement);

    const textElement = generateElement('p', 'toggle__description', text);

    switchWrapperElement.appendChild(switchElement);
    switchWrapperElement.appendChild(textElement);
    return switchWrapperElement;
  },
  createPeriodSwitchElement: function () {
    const periodSwitchElement = this.createSwitchElement(
      this.isAllPeriod,
      'all period'
    );
    this.switchPeriodElements.push(periodSwitchElement);
    periodSwitchElement.addEventListener('change', (event) => {
      this.isAllPeriod = event.currentTarget.querySelector('input').checked;
      this.updatePeriodElements();
    });
    return periodSwitchElement;
  },
  createValueSwitchElement: function () {
    const valueSwitchElement = this.createSwitchElement(
      this.isAllPeriod,
      'absolute'
    );
    this.switchValueElements.push(valueSwitchElement);
    valueSwitchElement.addEventListener('change', (event) => {
      this.isAllPeriod = event.currentTarget.querySelector('input').checked;
      this.updateValueSwitchElements();
    });
    return valueSwitchElement;
  },
  createIndicatorElements: function (includeCriterion = true) {
    const indicatorSet = generateElement('fieldset', 'indicators');
    const legendElement = generateElement(
      'legend',
      'indicators__legend',
      'settings'
    );

    indicatorSet.appendChild(legendElement);
    if (includeCriterion) {
      indicatorSet.appendChild(this.createSelectElement());
    }
    indicatorSet.appendChild(this.createPeriodSwitchElement());
    indicatorSet.appendChild(this.createValueSwitchElement());
    return indicatorSet;
  },
};
