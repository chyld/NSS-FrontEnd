'use strict';

// Firebase Schema
var Δdb;

// Local Schema
var db = {};
db.map = null;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  //Δdb = new Firebase('enter-firebase-database-url-here');
  initMap(36, -86, 5);
}

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
