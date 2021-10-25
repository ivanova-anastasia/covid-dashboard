import './styles/style.scss';
import InteractiveMap from './src/components/interactiveMap';
import List from './src/components/list';
import Table from './src/components/table';
import dashboardData from './src/api/dashboardData';

const list = new List();
const map = new InteractiveMap();
const table = new Table();

list.render();
map.render();
table.render();
dashboardData.init();
