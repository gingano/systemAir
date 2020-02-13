let currentCountry;
let countryDescription = document.querySelector('.country-description');

let chart = am4core.create("chartdiv", am4maps.MapChart);
let currentCountriesArray = [];
let currentCountriesData = [{
  "id": "UA",
  "value": [
    'Fans',
    "Residential ventilation",
    "Swimming pool ventilation",
    "Production of Air handling units",
    "Air conditioning",
    "Air curtains and heating products",
    "Products for air distribution",
    "Fire safety",
    "Garage and tunnel ventilation",
    "Distributions centres",
    "Sales",
    "Technology centres"
  ]
}, {
  "id": "FR",
  "value": [
    'Fans',
    "Residential ventilation",
    "Swimming pool ventilation",
    "Production of Air handling units",
    "Air conditioning",
    "Air curtains and heating products",
    "Distributions centres",
    "Technology centres"
  ]
}, {
  "id": "FI",
  "value": [
    'Fans',
    "Residential ventilation",
    "Swimming pool ventilation",
    "Production of Air handling units",
    "Air conditioning",
    "Air curtains and heating products",
    "Distributions centres",
    "Technology centres"
  ]
}, {
  "id": "DK",
  "value": [
    'Fans',
    "Residential ventilation",
    "Swimming pool ventilation",
    "Production of Air handling units",
    "Air conditioning",
    "Air curtains and heating products",
    "Products for air distribution",
    "Fire safety",
    "Garage and tunnel ventilation",
    "Distributions centres",
    "Sales",
    "Technology centres"
  ]
}, {
  "id": "SE",
  "value": [
    'Fans',
    "Residential ventilation",
    "Swimming pool ventilation",
    "Production of Air handling units",
    "Air conditioning",
    "Air curtains and heating products",
    "Distributions centres",
    "Technology centres"
  ]
}, {
  "id": "NO",
  "value": [
    'Fans',
    "Residential ventilation",
    "Swimming pool ventilation",
    "Production of Air handling units",
    "Air conditioning",
    "Air curtains and heating products",
    "Distributions centres",
    "Technology centres"
  ]
}, {
  "id": "LT",
  "value": [
    'Fans',
    "Residential ventilation",
    "Swimming pool ventilation",
    "Production of Air handling units",
    "Air conditioning",
    "Air curtains and heating products",
    "Products for air distribution",
    "Fire safety",
    "Garage and tunnel ventilation",
    "Distributions centres",
    "Sales",
    "Technology centres"
  ]
}, {
  "id": "LV",
  "value": [
    'Fans',
    "Residential ventilation",
    "Swimming pool ventilation",
    "Production of Air handling units",
    "Air conditioning",
    "Air curtains and heating products",
    "Distributions centres",
    "Technology centres"
  ]
}, {
  "id": "EE",
  "value": [
    'Fans',
    "Residential ventilation",
    "Swimming pool ventilation",
    "Production of Air handling units",
    "Air conditioning",
    "Air curtains and heating products",
    "Distributions centres",
    "Technology centres"
  ]
}, {
  "id": "IS",
  "value": [
    'Fans',
    "Residential ventilation",
    "Swimming pool ventilation",
    "Production of Air handling units",
    "Air conditioning",
    "Air curtains and heating products",
    "Products for air distribution",
    "Fire safety",
    "Garage and tunnel ventilation",
    "Distributions centres",
    "Sales",
    "Technology centres"
  ]
}, {
  "id": "GB",
  "value": [
    'Fans',
    "Residential ventilation",
    "Swimming pool ventilation",
    "Production of Air handling units",
    "Air conditioning",
    "Air curtains and heating products",
    "Distributions centres",
    "Technology centres"
  ]
}, {
  "id": "DE",
  "value": [
    'Fans',
    "Residential ventilation",
    "Swimming pool ventilation",
    "Production of Air handling units",
    "Air conditioning",
    "Air curtains and heating products",
    "Distributions centres",
    "Technology centres"
  ]
}]

currentCountriesData.forEach(function (object) {
  currentCountriesArray.push(object.id)
})

chart.geodata = am4geodata_worldLow;
chart.projection = new am4maps.projections.Mercator();
let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

polygonSeries.useGeodata = true;
let polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.fill = am4core.color("#e2e2e2");
polygonSeries.exclude = ["AQ"];

let currentCountries = chart.series.push(new am4maps.MapPolygonSeries());
currentCountries.useGeodata = true;
currentCountries.include = currentCountriesArray;
currentCountries.mapPolygons.template.fill = am4core.color("#00a7d8");
currentCountries.data = currentCountriesData

currentCountries.mapPolygons.template.events.on("hit", function(e) {
  currentCountry = e.target.dataItem.dataContext;

  countryDescription.classList.add('country-description-active')
  countryDescription.style.top = e.point.y + 'px';
  countryDescription.style.left = e.point.x + 'px';

  countryDescription.innerHTML = '' +
    '<h3>' + currentCountry.name + '</h3>' +
    '<ul class="description-list"></ul>'

  currentCountry.value.forEach(function (value) {
    let listItem = document.createElement('li');
    listItem.innerHTML = value
    document.querySelector('.description-list').append(listItem);
  })
});

let hs = currentCountries.mapPolygons.template.states.create("hover");
hs.properties.fill = am4core.color("#004985");