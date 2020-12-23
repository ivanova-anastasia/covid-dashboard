import './styles/style.scss';
import Diagram from './src/components/diagram';
import InteractiveMap from './src/components/interactiveMap';
import List from './src/components/list';
import Table from './src/components/table';
import dashboardData from './src/api/dashboardData';
import virtualKeyboard from './src/components/common/virtualKeyboard';

const list = new List();
const diagram = new Diagram();
const map = new InteractiveMap();
const table = new Table();

list.render();
diagram.render();
map.render();
table.render();
dashboardData.init();
virtualKeyboard.init();
