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
  indicatorAreaSet: [],
  indicatorEvent: null,

  setCountry: async function (country) {
    this.country = country;
    // TODO: invoke api method
    this.updateDashboardIndicators();
  },
  updateDashboardIndicators: function () {
    if (!this.indicatorEvent) {
      this.indicatorEvent = this.createCustomEvent('updateIndicators');
    }
    this.indicatorAreaSet.forEach((set) =>
      set.dispatchEvent(this.indicatorEvent)
    );
  },
  createCustomEvent: function (eventName) {
    return new Event(eventName, { bubbles: true });
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
      checkedElement.querySelector('input').checked = this.isAbsoluteValue;
      checkedElement.querySelector('.toggle__description').innerText = this
        .isAbsoluteValue
        ? 'absolute'
        : 'per 100,000';
    });
  },
  createSelectElement: function () {
    const selectElement = generateElement('select', 'criterion');
    const casesOption = generateElement(
      'option',
      'criterion__option',
      this.getCriterionNameByValue(CASES_INDICATOR)
    );
    casesOption.value = CASES_INDICATOR;
    const deathsOption = generateElement(
      'option',
      'criterion__option',
      this.getCriterionNameByValue(DEATHS_INDICATOR)
    );
    deathsOption.value = DEATHS_INDICATOR;
    const recoveredOption = generateElement(
      'option',
      'criterion__option',
      this.getCriterionNameByValue(RECOVERED_INDICATOR)
    );
    recoveredOption.value = RECOVERED_INDICATOR;

    selectElement.appendChild(casesOption);
    selectElement.appendChild(deathsOption);
    selectElement.appendChild(recoveredOption);

    selectElement.addEventListener('change', (event) => {
      this.criterion = event.target.value;
      this.updateIndicatorElements();
      this.updateDashboardIndicators(event.target);
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
      this.updateDashboardIndicators(event.target);
    });
    return periodSwitchElement;
  },
  createValueSwitchElement: function () {
    const valueSwitchElement = this.createSwitchElement(
      this.isAbsoluteValue,
      'absolute'
    );
    this.switchValueElements.push(valueSwitchElement);
    valueSwitchElement.addEventListener('change', (event) => {
      this.isAbsoluteValue = event.currentTarget.querySelector('input').checked;
      this.updateValueSwitchElements();
      this.updateDashboardIndicators(event.target);
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
    this.indicatorAreaSet.push(indicatorSet);
    return indicatorSet;
  },
  getCriterionNameByValue: function (value) {
    switch (Number(value)) {
      case CASES_INDICATOR:
        return 'Cases';
      case DEATHS_INDICATOR:
        return 'Deaths';
      case RECOVERED_INDICATOR:
        return 'Recovered';
      default:
        return 'Criterion not found';
    }
  },
};
