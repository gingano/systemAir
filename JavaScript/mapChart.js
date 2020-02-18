const points = [{
  "name": "Fans",
  "id": "000",
  "color": "#004985"
}, {
  "name": "Residential ventilation",
  "id": "001",
  "color": "#00a7d8"
}, {
  "name": "Swimming pool ventilation",
  "id": "002",
  "color": "#266d7a"
}, {
  "name": "Production of Air handling units",
  "id": "003",
  "color": "#751741"
}, {
  "name": "Air conditioning",
  "id": "004",
  "color": "#783f91"
}, {
  "name": "Air curtains and heating products",
  "id": "005",
  "color": "#cd1719"
}, {
  "name": "Products for air distribution",
  "id": "006",
  "color": "#f49d24"
}, {
  "name": "Fire safety",
  "id": "007",
  "color": "#ffde14"
}, {
  "name": "Garage and tunnel ventilation",
  "id": "008",
  "color": "#404040"
}, {
  "name": "Distributions centres",
  "id": "009",
  "color": "#33b3a8"
}, {
  "name": "Sales",
  "id": "010",
  "color": "#27c459",
  "special": "star"
}, {
  "name": "Technology centres",
  "id": "011",
  "color": "#00a7d8",
  "special": "star"
}];

let currentCountry;
let currentCountryDom;
let currentAmendment = {
  x: 0,
  y: 0
};
let countryDescription = document.querySelector('.country-description');
let chartDiv = document.querySelector('.chartdiv');
let countryDescriptionPosition;

let chart = am4core.create("chartdiv", am4maps.MapChart);
let currentCountriesArray = [];
let currentCountriesData = [];
let filterArray = [];
let filteredCountriesArray = [];
let filteredCountriesData = [];

let plusButton = document.querySelector('.zoom-plus-button');
let minusButton = document.querySelector('.zoom-minus-button');

plusButton.addEventListener('click', function (event) {
  event.preventDefault();
  chart.zoomLevel += 0.3;
});

minusButton.addEventListener('click', function (event) {
  event.preventDefault();
  chart.zoomLevel -= 0.3;
  if (chart.zoomLevel < 1) {
    chart.zoomLevel = 1
  }
});

document.querySelector('.countries-list').querySelectorAll('.countries-list-item').forEach(function (item) {
  let itemObject = {};

  itemObject.id = item.dataset.countryId;
  itemObject.value = [];
  itemObject.valueIds = [...item.dataset.points.split(', ')];
  itemObject.href = item.dataset.href;

  item.dataset.points.split(', ').forEach(function (point) {
    let pointName;
    let pointObject = points.find(function (i) {
      return i.id === point
    })
    pointName = pointObject.name
    itemObject.value.push(pointName)
  })

  if (item.dataset.specificAmendment !== undefined) {
    itemObject.specificAmendment = {
      y:0,
      x:0
    }
    itemObject.specificAmendment.y = item.dataset.specificAmendment.split(', ')[0];
    itemObject.specificAmendment.x = item.dataset.specificAmendment.split(', ')[1];
  }

  currentCountriesData.push(itemObject);
})

currentCountriesData.forEach(function (object) {
  currentCountriesArray.push(object.id)
})

filteredCountriesArray = [...currentCountriesArray];
filteredCountriesData = [...currentCountriesData];

chart.geodata = am4geodata_worldLow;
chart.projection = new am4maps.projections.Mercator();
chart.background.fill = am4core.color("#f4f4f4");
chart.background.fillOpacity = 1;
let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

polygonSeries.useGeodata = true;
let polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.fill = am4core.color("#e2e2e2");
polygonTemplate.strokeWidth = 0.3;
polygonSeries.exclude = ["AQ"];

let allFoundCountries = chart.series.push(new am4maps.MapPolygonSeries());
allFoundCountries.useGeodata = true;
allFoundCountries.include = currentCountriesArray;
allFoundCountries.mapPolygons.template.fill = am4core.color("rgba(0, 73, 133, 0.25)");
allFoundCountries.strokeWidth = 0.3;

let currentCountries = chart.series.push(new am4maps.MapPolygonSeries());
currentCountries.useGeodata = true;
currentCountries.include = filteredCountriesArray;
currentCountries.mapPolygons.template.fill = am4core.color("#00a7d8");
currentCountries.strokeWidth = 0.3;
currentCountries.data = [...filteredCountriesData];

let currentSeries = chart.series.push(new am4maps.MapPolygonSeries());
currentSeries.useGeodata = true;
currentSeries.include = [];
currentSeries.mapPolygons.template.fill = am4core.color("#004985");
currentSeries.strokeWidth = 0.3;

currentCountries.mapPolygons.template.events.on("hit", function(e) {
  clearInterval(countryDescriptionPosition);

  let translateYArr = getComputedStyle(chart.dom.children[1].children[0].children[1].children[0]).transform.split(',');
  let translateY = Number(translateYArr[translateYArr.length-1].substring(0, translateYArr[translateYArr.length-1].length - 1));
  let translateXArr = getComputedStyle(chart.dom.children[1].children[0].children[1].children[0]).transform.split(',');
  let translateX = Number(translateXArr[translateXArr.length-2]);
  if (isNaN(translateY)) {
    translateY = 0;
  }
  if (isNaN(translateX)) {
    translateX = 0;
  }
  currentCountry = e.target.dataItem.dataContext;
  currentCountryDom = e.target.dom;
  currentAmendment.y = e.target.tooltipY * chart.zoomLevel + translateY + getCoords(chartDiv).top - getCoords(currentCountryDom).top;
  currentAmendment.x = e.target.tooltipX * chart.zoomLevel + translateX + getCoords(chartDiv).left - getCoords(currentCountryDom).left;

  currentSeries.data.splice(0, currentSeries.data.length);
  currentSeries.include = [currentCountry.id];

  countryDescription.classList.add('country-description-active');

  countryDescriptionPosition = setInterval(function () {
    if (currentCountryDom !== undefined) {
      let translateYArr = getComputedStyle(chart.dom.children[1].children[0].children[1].children[0]).transform.split(',');
      let translateY = Number(translateYArr[translateYArr.length-1].substring(0, translateYArr[translateYArr.length-1].length - 1));
      let translateXArr = getComputedStyle(chart.dom.children[1].children[0].children[1].children[0]).transform.split(',');
      let translateX = Number(translateXArr[translateXArr.length-2]);
      if (isNaN(translateY)) {
        translateY = 0;
      }
      if (isNaN(translateX)) {
        translateX = 0;
      }
      currentCountry = e.target.dataItem.dataContext;
      currentCountryDom = e.target.dom;
      currentAmendment.y = e.target.tooltipY * chart.zoomLevel + translateY + getCoords(chartDiv).top - getCoords(currentCountryDom).top;
      currentAmendment.x = e.target.tooltipX * chart.zoomLevel + translateX + getCoords(chartDiv).left - getCoords(currentCountryDom).left;

      if ("specificAmendment" in currentCountry) {
        currentAmendment.y = e.target.tooltipY * chart.zoomLevel + Number(currentCountry.specificAmendment.y) * chart.zoomLevel + translateY + getCoords(chartDiv).top - getCoords(currentCountryDom).top;
        currentAmendment.x = e.target.tooltipX * chart.zoomLevel + Number(currentCountry.specificAmendment.x) * chart.zoomLevel + translateX + getCoords(chartDiv).left - getCoords(currentCountryDom).left;
      }

      if (getCoords(currentCountryDom).top + currentAmendment.y < 750) {
        countryDescription.style.top = 750 + 'px';
      } else if (getCoords(currentCountryDom).top + currentAmendment.y > 885) {
        countryDescription.style.top = 885 + 'px';
      }  else {
        countryDescription.style.top = getCoords(currentCountryDom).top + currentAmendment.y + 'px';
      }

      if (getCoords(currentCountryDom).left + currentAmendment.x < document.documentElement.clientWidth - 1290 + 355) {
        countryDescription.style.left = document.documentElement.clientWidth - 1290 + 355 + 'px';
      } else if (getCoords(currentCountryDom).left + currentAmendment.x > document.documentElement.clientWidth + 27) {
        countryDescription.style.left = document.documentElement.clientWidth + 27 + 'px';
      } else {
        countryDescription.style.left = getCoords(currentCountryDom).left + currentAmendment.x + 'px';
      }

      if (getCoords(currentCountryDom).top + currentAmendment.y < 750 ||
          getCoords(currentCountryDom).left + currentAmendment.x < document.documentElement.clientWidth - 1290 + 355 ||
          getCoords(currentCountryDom).top + currentAmendment.y > 885 ||
          getCoords(currentCountryDom).left + currentAmendment.x > document.documentElement.clientWidth + 27) {
        countryDescription.style.overflow = 'hidden';
      } else {
        countryDescription.style.overflow = 'visible';
      }
    }
  })

  countryDescription.innerHTML = '' +
    '<h3>' + currentCountry.name + '</h3>' +
    '<ul class="description-list"></ul>' +
    '<a href="' + currentCountry.href + '" class="button"><span>more information</span></a>' +
    '<div class="close-button"><div></div><div></div></div>';

  currentCountry.value.forEach(function (value) {
    let listItem = document.createElement('li');
    let markerObject = points.find(function (marker) {
      return marker.name === value
    });
    let marker = document.createElement('div');
    marker.classList.add('marker');
    marker.style.background = markerObject.color;
    listItem.innerHTML = value;
    document.querySelector('.description-list').append(listItem);
    listItem.prepend(marker);
    if ('special' in markerObject) {
      let special = document.createElement('div');
      special.classList.add('special-' + markerObject.special);
      marker.after(special)
    }
  })

  countryDescription.querySelector('.close-button').addEventListener('click', function () {
    clearInterval(countryDescriptionPosition);
    currentSeries.data.splice(0, currentSeries.data.length);
    currentSeries.include = [];
    countryDescription.classList.remove('country-description-active');
    countryDescription.style.top = 'initial';
    countryDescription.style.left = 'initial';
  })
});

let hs = currentCountries.mapPolygons.template.states.create("hover");
hs.properties.fill = am4core.color("#004985");

if (document.querySelector('.location-container') !== undefined) {
  let pointsSelector = document.querySelector('.location-container').querySelector('.points-selector');
  let pointsSelectorLabel = pointsSelector.querySelector('.points-selector-label');
  let labelList = document.createElement('ul');
  let fieldList = pointsSelector.querySelector('.selector-field').querySelector('.field-list');
  let firstSpecial = true;
  points.forEach(function (point) {
    let listItem = document.createElement('li');
    let label = document.createElement('label');
    let checkbox = document.createElement('input');
    label.setAttribute('for', 'country-point-' + point.id);
    checkbox.type = 'checkbox';
    checkbox.id = 'country-point-' + point.id;
    let markerObject = point;
    let marker = document.createElement('div');
    marker.classList.add('marker');
    marker.style.background = markerObject.color;
    label.innerHTML = point.name;
    fieldList.append(listItem);
    listItem.append(label);
    label.prepend(marker);
    label.after(checkbox);
    if ('special' in markerObject) {
      if (firstSpecial) {
        listItem.classList.add('special');
        firstSpecial = false;
      }
      let special = document.createElement('div');
      special.classList.add('special-' + markerObject.special);
      marker.after(special)
    }
  })

  let pointsCheckboxes = document.querySelector('.field-list').querySelectorAll('input');

  pointsCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function (event) {
      if (checkbox.checked) {
        filterArray.push(checkbox.id.split('-')[checkbox.id.split('-').length - 1])
      } else {
        filterArray.splice(filterArray.findIndex(function (item) {
          return item === checkbox.id.split('-')[checkbox.id.split('-').length - 1]
        }), 1)
      }

      filteredCountriesArray = [];
      filteredCountriesData = [];
      pointsSelectorLabel.innerHTML = '';

      currentCountriesData.forEach(function (item) {
        let counter = 0;
        let arr = [];

        filterArray.forEach(function (i) {
          if (item.valueIds.includes(i)) {
            arr.push(item.id);
            counter++;
          }
        })

        if (counter === filterArray.length) {
          filteredCountriesArray.push(item.id)
        }

        filteredCountriesArray.forEach(function (i) {
          if (item.id === i) {
            filteredCountriesData.push(item);
          }
        });
      });

      labelList.innerHTML = '';
      filterArray.forEach(function (id) {
        let labelListItem = document.createElement('li');
        let markerObject = points.find(function (point) {
          return point.id === id;
        });
        let marker = document.createElement('div');
        marker.classList.add('marker');
        marker.style.background = markerObject.color;
        labelListItem.append(marker);
        labelList.append(labelListItem);

        if ('special' in markerObject) {
          if (firstSpecial) {
            labelListItem.classList.add('special');
          }
          let special = document.createElement('div');
          special.classList.add('special-' + markerObject.special);
          marker.after(special)
        }
      });

      if (filterArray.length === 0) {
        filteredCountriesArray = [...currentCountriesArray];
        filteredCountriesData = [...currentCountriesData];
        pointsSelectorLabel.innerHTML = '<span>All</span>';
      }

      pointsSelectorLabel.append(labelList)

      currentCountries.data.splice(0, currentCountries.data.length);
      currentCountries.include = [...filteredCountriesArray];
      currentCountries.data = [...filteredCountriesData];
    })
  })
}