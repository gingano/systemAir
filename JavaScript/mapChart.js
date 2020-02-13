let chart = am4core.create("chartdiv", am4maps.MapChart);
let currentCountriesArray = ["FI", "DK", "SE", "NO", "LT", "LV", "EE", "IS", 'UA'];
let currentCountriesData = [{
  "id": "UA",
  "value": 100
}, {
  "id": "FR",
  "name": "France",
  "value": 50
}]

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
currentCountries.mapPolygons.template.tooltipHTML = "<h3>{name}</h3>";
currentCountries.mapPolygons.template.fill = am4core.color("#00a7d8");
currentCountries.data = currentCountriesData

// let currentCountry;
// currentCountries.mapPolygons.template.events.on("hit", function(e) {
//   currentCountry = e.target;
//   currentCountry.tooltipHTML = "<h3>{name}</h3>";
//   currentCountry.showTooltip();
//   console.log(currentCountry.name)
// });

let hs = currentCountries.mapPolygons.template.states.create("hover");
hs.properties.fill = am4core.color("#004985");