import Expander from './common/expander';

export default class Table {
  constructor() {
    this.table = document.querySelector('.countries-table');
  }

  init() {
    
  }

  render() {
    const expander = new Expander(false).create();
    this.table.append(expander);
  }
};
