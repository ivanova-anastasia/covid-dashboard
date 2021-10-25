import Expander from './common/expander';
import indicators from './common/indicators';
import {
  MAP_BOX_ACCESS_TOKEN,
  YELLOW_COLOR,
  RED_COLOR,
  BLUE_COLOR,
} from '../utils/constants';
import dashboardData from '../api/dashboardData';

export default class InteractiveMap {
  constructor() {
    this.mapContainer = document.querySelector('.map');
    this.legend = document.querySelector('#legend');
    this.map = this.createMap();
    this.indicatorSet = indicators.createIndicatorElements();
  }

  render() {
    const expander = new Expander(false).create();
    this.mapContainer.append(expander, this.indicatorSet);
    this.addEventListenerIndicatorElements();
  }

  createMap() {
    // eslint-disable-next-line no-undef
    mapboxgl.accessToken = MAP_BOX_ACCESS_TOKEN;
    // eslint-disable-next-line no-undef
    return new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 1.5,
      center: [0, 0],
      trackResize: true,
    });
  }

  addEventListenerIndicatorElements() {
    this.indicatorSet.addEventListener('updateIndicators', () => {
      const countriesData = dashboardData.getCountriesWithLocation();
      this.updateSource(countriesData);
    });
    window.addEventListener('load', () => {
      this.map.resize();
    });
    this.mapContainer.addEventListener('click', () => {
      this.map.resize();
    });
  }

  addFeatureProperty(country, count, criterion, color, long, lat) {
    return {
      type: 'Feature',
      properties: {
        description: `<strong>${country}</strong><p>${indicators.getCriterionNameByValue(
          criterion
        )}: ${count}</p>`,
        level: color,
      },
      geometry: {
        type: 'Point',
        coordinates: [long, lat],
      },
    };
  }

  defineColor(lowestLevel, middleLevel, value) {
    let color = '';
    if (value > middleLevel) {
      color = 'Red';
    } else if (value > lowestLevel) {
      color = 'Yellow';
    } else {
      color = 'Blue';
    }
    return color;
  }

  addSourceMap(countriesData) {
    this.map.addSource('places', this.generateSourceObject(countriesData));
  }

  generateSourceObject(countriesData) {
    const thirdPartIndex = Math.floor((countriesData.length - 1) / 3);
    const lowestLevel = countriesData[thirdPartIndex * 2].value;
    const middleLevel = countriesData[thirdPartIndex].value;
    this.addLegend(countriesData[0].value, middleLevel, lowestLevel);

    const featureCollection = countriesData.map((countryData) => {
      const feature = this.addFeatureProperty(
        countryData.country,
        countryData.value,
        countryData.mode,
        this.defineColor(lowestLevel, middleLevel, countryData.value),
        countryData.long,
        countryData.lat
      );
      return feature;
    });

    return {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: featureCollection,
      },
    };
  }

  addLegend(maxLevel, middleLevel, lowestLevel) {
    const layers = [
      `${middleLevel}-${maxLevel}`,
      `${lowestLevel}-${middleLevel}`,
      `0-${lowestLevel}`,
    ];
    const colors = [RED_COLOR, YELLOW_COLOR, BLUE_COLOR];
    this.legend.innerHTML = '';

    layers.forEach((layer, index) => {
      const color = colors[index];
      const item = document.createElement('div');
      const key = document.createElement('span');
      key.className = 'legend-key';
      key.style.backgroundColor = color;

      const value = document.createElement('span');
      value.innerHTML = layer;
      item.appendChild(key);
      item.appendChild(value);
      this.legend.appendChild(item);
    });
  }

  updateSource(countriesData) {
    const updatedSource = this.map.getSource('places');
    if (updatedSource === undefined) {
      this.addSourceMap(countriesData);
      this.addLayer();
      this.addPopup();
    } else {
      const sourceObject = this.generateSourceObject(countriesData);
      updatedSource.setData(sourceObject.data);
    }
  }

  addLayer() {
    this.map.addLayer({
      id: 'places',
      source: 'places',
      type: 'circle',
      paint: {
        'circle-radius': 10,
        'circle-color': [
          'match',
          ['get', 'level'],
          'Yellow',
          YELLOW_COLOR,
          'Red',
          RED_COLOR,
          'Blue',
          BLUE_COLOR,
          '#ccc',
        ],
      },
    });
  }

  addPopup() {
    // eslint-disable-next-line no-undef
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    this.map.on('mouseenter', 'places', (e) => {
      this.map.getCanvas().style.cursor = 'pointer';

      const coordinates = e.features[0].geometry.coordinates.slice();
      const { description } = e.features[0].properties;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
    });

    this.map.on('mouseleave', 'places', () => {
      this.map.getCanvas().style.cursor = '';
      popup.remove();
    });
  }
}
