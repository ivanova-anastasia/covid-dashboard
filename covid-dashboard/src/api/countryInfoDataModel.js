export default class CountryInfoDataModel {
  flag = '';

  iso3 = '';

  iso2 = '';

  constructor(data) {
    this.flag = data.flag || '';
    this.iso3 = data.iso3 || '';
    this.iso2 = data.iso2 || '';
  }
}
