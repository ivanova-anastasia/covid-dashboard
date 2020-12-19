import './styles/style.scss';
import Diagram from './src/сomponents/diagram';
import InteractiveMap from './src/сomponents/interactiveMap';
import List from './src/сomponents/list';
import Table from './src/сomponents/table';

const list = new List();
const diagram = new Diagram();
const map = new InteractiveMap();
const table = new Table();

list.render();
diagram.render();
map.render();
table.render();