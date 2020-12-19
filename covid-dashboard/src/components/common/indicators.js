import { CASES_INDICATOR, WHOLE_WORLD } from '../../utils/constants';

export default {
  isAllPeriod: true,
  isAbsoluteValue: true,
  criterion: CASES_INDICATOR,
  country: WHOLE_WORLD,

  setAllPeriod: function (isAllPeriod) {
    this.isAllPeriod = isAllPeriod;
    this.updateDashboard();
  },
  setAbsoluteValue: function (isAbsoluteValue) {
    this.isAbsoluteValue = isAbsoluteValue;
    this.updateDashboard();
  },
  setCriterion: function (criterion) {
    this.criterion = criterion;
    this.updateDashboard();
  },
  setCountry: function (country) {
    this.country = country;
    this.updateDashboard();
  },
  async updateDashboardCountry() {
    // TODO: implement custom event
  },
  updateDashboardIndicators() {
    // TODO: implement custom event
  },
};
