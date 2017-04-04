/* */ 
"format cjs";
// NOCOMPILE
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.format.GeoJSON');
goog.require('ol.source.OSM');
goog.require('ol.source.VectorTile');
goog.require('ol.layer.Tile');
goog.require('ol.layer.VectorTile');
goog.require('ol.tilegrid');
goog.require('ol.proj.Projection');


var replacer = function(key, value) {
  if (value.geometry) {
    var type;
    var rawType = value.type;
    var geometry = value.geometry;

    if (rawType === 1) {
      type = geometry.length === 1 ? 'Point' : 'MultiPoint';
    } else if (rawType === 2) {
      type = geometry.length === 1 ? 'LineString' : 'MultiLineString';
    } else if (rawType === 3) {
      type = geometry.length === 1 ? 'Polygon' : 'MultiPolygon';
    }

    return {
      'type': 'Feature',
      'geometry': {
        'type': type,
        'coordinates': geometry.length == 1 ? geometry : [geometry]
      },
      'properties': value.tags
    };
  } else {
    return value;
  }
};

var tilePixels = new ol.proj.Projection({
  code: 'TILE_PIXELS',
  units: 'tile-pixels'
});

var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});

var url = 'data/geojson/countries.geojson';
fetch(url).then(function(response) {
  return response.json();
}).then(function(json) {
  var tileIndex = geojsonvt(json, {
    extent: 4096,
    debug: 1
  });
  var vectorSource = new ol.source.VectorTile({
    format: new ol.format.GeoJSON(),
    tileGrid: ol.tilegrid.createXYZ(),
    tilePixelRatio: 16,
    tileLoadFunction: function(tile) {
      var format = tile.getFormat();
      var tileCoord = tile.getTileCoord();
      var data = tileIndex.getTile(tileCoord[0], tileCoord[1], -tileCoord[2] - 1);

      var features = format.readFeatures(
        JSON.stringify({
          type: 'FeatureCollection',
          features: data ? data.features : []
        }, replacer));
      tile.setLoader(function() {
        tile.setFeatures(features);
        tile.setProjection(tilePixels);
      });
    },
    url: 'data:' // arbitrary url, we don't use it in the tileLoadFunction
  });
  var vectorLayer = new ol.layer.VectorTile({
    source: vectorSource
  });
  map.addLayer(vectorLayer);
});
