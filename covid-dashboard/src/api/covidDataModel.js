export default class CovidDataModel {
  cases = 0;

  todayCases = 0;

  deaths = 0;

  todayDeaths = 0;

  recovered = 0;

  todayRecovered = 0;

  population = 0;

  constructor(data) {
    this.cases = this.validateNumber(data.cases);
    this.todayCases = this.validateNumber(data.todayCases);
    this.deaths = this.validateNumber(data.deaths);
    this.todayDeaths = this.validateNumber(data.todayDeaths);
    this.recovered = this.validateNumber(data.recovered);
    this.todayRecovered = this.validateNumber(data.todayRecovered);
    this.population = this.validateNumber(data.population);
  }

  validateNumber(number) {
    return Number.isNaN(number) ? 0 : number;
  }
}
