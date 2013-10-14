'use strict';

// Firebase Schema
var Δdb;
var Δlocations;

// Local Schema
var db = {};
db.locations = [];
db.map = null;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://vacation-map-cm.firebaseio.com/');
  Δlocations = Δdb.child('locations');
  Δlocations.on('child_added', dbLocationAdded);
  $('#set-zoom').click(clickSetZoom);
  $('#add-location').click(clickAddLocation);
  initMap(36, -86, 5);
}

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickSetZoom(){
  var zoom = getValue('#zoom', parseInt);
  db.map.setZoom(zoom);
}

function clickAddLocation(){
  var name = getValue('#location');
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({address: name}, function(results, status){
    var location = {};
    location.name = results[0].formatted_address;
    location.coordinates = results[0].geometry.location;
    Δlocations.push(location);
  });
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbLocationAdded(snapshot){
}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
