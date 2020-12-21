import CovidDataModel from './covidDataModel';
import CountryInfoDataModel from './countryInfoDataModel';

export default class CountryDataModel extends CovidDataModel {
  country = '';

  countryInfo = null;

  constructor(country, covidData) {
    super(covidData);
    this.country = country || '';
    this.countryInfo = covidData.countryInfo
      ? new CountryInfoDataModel(covidData.countryInfo)
      : null;
  }
}
