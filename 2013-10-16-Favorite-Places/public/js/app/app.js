'use strict';

// Firebase Schema
var Δdb;
var Δpositions;
var Δfavorites;

// Local Schema (defined in keys.js)
db.positions = [];
db.favorites = [];
db.path = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δpositions = Δdb.child('positions');
  Δfavorites = Δdb.child('favorites');
  Δpositions.on('child_added', dbPositionAdded);
  Δfavorites.on('child_added', dbFavoriteAdded);
  $('#start').click(clickStart);
  $('#stop').click(clickStop);
  $('#add-favorite').click(clickAddFavorite);
  initMap(36, -86, 5);
  resetData();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbPositionAdded(snapshot){
  var position = snapshot.val();
  var latLng = new google.maps.LatLng(position.latitude, position.longitude);

  db.positions.push(position);

  if(db.positions.length === 1){
    htmlAddStartIcon(latLng);
    htmlInitializePolyLine();
  }

  db.path.push(latLng);
  db.marker.setPosition(latLng);
  htmlSetCenterAndZoom(latLng);
}

function dbFavoriteAdded(snapshot){
  var favorite = snapshot.val();
  htmlAddFavoriteIcon(favorite);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddStartIcon(latLng){
  var image = '/img/start.jpg';
  db.marker = new google.maps.Marker({map: db.map, position: latLng, icon: image});
}

function htmlInitializePolyLine(){
  var polyLine = new google.maps.Polyline({
    map: db.map,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  db.path = polyLine.getPath();
}

function htmlAddFavoriteIcon(favorite){
  var image = '/img/favorite.png';
  var latLng = new google.maps.LatLng(favorite.latitude, favorite.longitude);
  new google.maps.Marker({map: db.map, position: latLng, icon: image, title: favorite.title});
}

function htmlSetCenterAndZoom(latLng){
  db.map.setCenter(latLng);
  db.map.setZoom(20);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickStart(){
  var geoOptions = {enableHighAccuracy: true, maximumAge: 1000, timeout: 60000};
  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
}

function clickStop(){
  navigator.geolocation.clearWatch(db.watchId);
}

function clickAddFavorite(){
  var title = getValue('#favorite');

  var favorite = {};
  favorite.latitude = db.recentPosition.latitude;
  favorite.longitude = db.recentPosition.longitude;
  favorite.title = title;

  Δfavorites.push(favorite);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function geoSuccess(location) {
  var position = {};
  position.latitude = location.coords.latitude;
  position.longitude = location.coords.longitude;
  position.altitude = location.coords.altitude || 0;
  position.time = moment().format();

  db.recentPosition = position;
  Δpositions.push(position);
}

function geoError() {
  console.log('Sorry, no position available.');
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
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

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function resetData(){
  Δpositions.remove();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
