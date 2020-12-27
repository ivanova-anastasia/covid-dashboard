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
  dataset: [],
  init: async function () {
    await this.setGlobalInfo();
    await this.setCountries();
    await this.setGlobalCasesInfo();
    indicators.updateDashboardIndicators();
    // TODO: invoke custom event
  },
  setGlobalInfo: async function () {
    try {
      const response = await fetch(`${DISEASE_HOST_NAME}/v3/covid-19/all`);
      const responseData = await response.json();
      this.countries.push(new CountryDataModel(WHOLE_WORLD, responseData));
    } catch (err) {
      console.log(err);
    }
  },
  setCountries: async function () {
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
  setGlobalCasesInfo: async function () {
    try {
      const response = await fetch(`${DISEASE_HOST_NAME}/v3/covid-19/historical/all?lastdays=366`);
      const responseData = await response.json();
      
      this.dataset.push(Object.keys(responseData.cases));

      console.log(this.dataset);
    } catch (err) {
      console.log(err);
    }
  },
  convertToSelectedUnitMeasure: function (value, population) {
    return indicators.isAbsoluteValue
      ? value
      : Math.floor((value / population) * 100000);
  },
  criterionMap: function (criterion, covidData) {
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

  getCountByFilter: function (
    criterion = indicators.criterion,
    country = indicators.country
  ) {
    const countryCovidData = this.countries.find(
      (item) => item.country === country
    );
    const countValue = this.criterionMap(criterion, countryCovidData);
    return countValue;
  },
  getCountriesWithCases: function () {
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
  getCasesWithDates: function () {
    console.log(this.dataset.length);
    // const data = this.dataset.map((item) => console.log(item));
    const chartDataset = this.dataset[0].reduce((accumulator, item, index) => {
      accumulator.push({
        x: item.toString(),
        y: this.dataset[1][index]
      });
      return accumulator;
    }, []);
    return chartDataset;
  }
};
