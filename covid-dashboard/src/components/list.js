import Expander from './common/expander';

export default class List {
  constructor() {
    this.list = document.querySelector('.countries-list');
  }

  render() {
    const expander = new Expander(false).create();
    this.list.append(expander);
  }
};
