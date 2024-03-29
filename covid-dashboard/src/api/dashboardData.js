import {
  WHOLE_WORLD,
  DISEASE_HOST_NAME,
  CASES_INDICATOR,
  DEATHS_INDICATOR,
  RECOVERED_INDICATOR,
} from '../utils/constants';
import indicators from '../components/common/indicators';
import CountryDataModel from './countryDataModel';

export default {
  countries: [],
  async init() {
    await this.setGlobalInfo();
    await this.setCountries();
    indicators.updateDashboardIndicators();
  },
  getCountriesName() {
    return this.country.map((item) => item.country);
  },
  async setGlobalInfo() {
    try {
      const response = await fetch(`${DISEASE_HOST_NAME}/v3/covid-19/all`);
      const responseData = await response.json();
      this.countries.push(new CountryDataModel(WHOLE_WORLD, responseData));
    } catch (err) {
      console.log(err);
    }
  },
  async setCountries() {
    try {
      const response = await fetch(
        `${DISEASE_HOST_NAME}/v3/covid-19/countries?yesterday=true`
      );
      const responseData = await response.json();
      const countries = responseData.map(
        (model) => new CountryDataModel(model.country, model)
      );
      this.countries.push(...countries);
    } catch (err) {
      console.log(err);
    }
  },
  convertToSelectedUnitMeasure(value, population) {
    return indicators.isAbsoluteValue
      ? value
      : Math.floor((value / population) * 100000);
  },
  criterionMap(criterion, covidData) {
    let resultCount = 0;
    switch (Number(criterion)) {
      case CASES_INDICATOR:
        resultCount = indicators.isAllPeriod
          ? covidData.cases
          : covidData.todayCases;
        break;
      case DEATHS_INDICATOR:
        resultCount = indicators.isAllPeriod
          ? covidData.deaths
          : covidData.todayDeaths;
        break;
      case RECOVERED_INDICATOR:
        resultCount = indicators.isAllPeriod
          ? covidData.recovered
          : covidData.todayRecovered;
        break;
      default:
        console.log(`Unknown criterion: ${criterion}`);
        break;
    }
    resultCount = this.convertToSelectedUnitMeasure(
      resultCount,
      covidData.population
    );
    return resultCount;
  },

  getCountByFilter(
    criterion = indicators.criterion,
    country = indicators.country
  ) {
    const countryCovidData = this.countries.find(
      (item) => item.country === country
    );
    const countValue = this.criterionMap(criterion, countryCovidData);
    return countValue;
  },
  getCountriesWithCases() {
    const countries = this.countries.slice(1);
    const newCountries = countries.reduce((accumulator, item) => {
      const count = this.criterionMap(indicators.criterion, item);
      if (!Number.isFinite(count)) return accumulator;
      accumulator.push({
        country: item.country,
        value: count,
        iso2: item.countryInfo.iso2,
      });
      return accumulator;
    }, []);
    newCountries.sort((a, b) => b.value - a.value);
    return newCountries;
  },
  getCountriesWithLocation() {
    const countries = this.countries.slice(1);
    const newCountries = countries.reduce((accumulator, item) => {
      const count = this.criterionMap(indicators.criterion, item);
      if (!Number.isFinite(count)) return accumulator;
      accumulator.push({
        country: item.country,
        value: count,
        lat: item.countryInfo.lat,
        long: item.countryInfo.long,
        mode: indicators.criterion,
      });
      return accumulator;
    }, []);
    newCountries.sort((a, b) => b.value - a.value);
    return newCountries;
  },
};
