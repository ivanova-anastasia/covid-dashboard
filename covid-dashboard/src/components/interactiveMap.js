import Expander from './common/expander';

export default class InteractiveMap {
  constructor() {
    this.map = document.querySelector('.map');
  }

  render() {
    const expander = new Expander(false).create();
    this.map.append(expander);
  }
};
