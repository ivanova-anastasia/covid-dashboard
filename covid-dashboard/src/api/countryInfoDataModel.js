export default class CountryInfoDataModel {
  flag = '';

  iso3 = '';

  iso2 = '';

  lat = 0;

  long = 0;

  constructor(data) {
    this.flag = data.flag || '';
    this.iso3 = data.iso3 || '';
    this.iso2 = data.iso2 || '';
    this.lat = data.lat;
    this.long = data.long;
  }
}
