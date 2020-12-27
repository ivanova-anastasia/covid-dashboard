import Expander from './common/expander';
import generateElement from '../utils/helper';
import dashboardData from '../api/dashboardData';

export default class Diagram {
  constructor() {
    this.diagram = document.querySelector('.diagram');
  }

  render() {
    const expander = new Expander(false).create();
    const chart = generateElement('canvas');
    chart.id = 'myChart';
    this.diagram.append(expander);
    this.init();
  }

  init() {
    const chartDataset = dashboardData.getCasesWithDates();
    console.log(chartDataset);
    const ctx = document.getElementById('myChart').getContext('2d');
  }
}
