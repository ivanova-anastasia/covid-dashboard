import CovidDataModel from './covidDataModel';

export default class CountryDataModel extends CovidDataModel {
  country = '';

  constructor(country, covidData) {
    super(covidData);
    this.country = country;
  }
}
