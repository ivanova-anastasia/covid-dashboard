import Expander from './common/expander';

export default class Diagram {
  constructor() {
    this.diagram = document.querySelector('.diagram');
  }

  render() {
    const expander = new Expander(false).create();
    this.diagram.append(expander);
  }
}
