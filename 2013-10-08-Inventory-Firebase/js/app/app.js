'use strict';

// Database Schema
var Δdb;
var Δitems;
var Δperson;

// Local Schema
var db = {};
db.person = {};
db.items = [];
db.statistics = {};
db.statistics.grandTotal = 0;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);

  Δdb = new Firebase('https://inventory-cm.firebaseio.com/');
  Δitems = Δdb.child('items');
  Δperson = Δdb.child('person');
  Δperson.on('value', personChanged);
  Δitems.on('child_added', itemAdded);
}

function itemAdded(snapshot){
  var item = snapshot.val();
  createRow(item);
  updateGrandTotal(item);
  db.items.push(item);
}

function personChanged(snapshot){
  var person = snapshot.val();

  try{
    $('#person').val(person.fullName);
    $('#address').val(person.address);
    db.person = person;
  } catch(e) {
    console.log(e);
  }
}

function updateGrandTotal(item){
  db.statistics.grandTotal += (item.count * item.value);
  $('#grand-total').text('$' + db.statistics.grandTotal + '.00');
}

function save(){
  var fullName = $('#person').val();
  var address = $('#address').val();
  var person = {};
  person.fullName = fullName;
  person.address = address;

  Δperson.set(person);
}

function add(){
  var name = $('#name').val();
  var count = parseInt($('#count').val(), 10);
  var value = parseInt($('#value').val(), 10);
  var room = $('#room').val();
  var condition = $('#condition').val();
  var date = $('#date').val();

  var item = {};
  item.name = name;
  item.count = count;
  item.value = value;
  item.room = room;
  item.condition = condition;
  item.date = date;

  Δitems.push(item);
}

function createRow(item){
  var row = '<tr><td class="name"></td><td class="count"></td><td class="value"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
  var $row = $(row);

  $row.children('.name').text(item.name);
  $row.children('.count').text(item.count);
  $row.children('.value').text('$' + item.value + '.00');
  $row.children('.room').text(item.room);
  $row.children('.condition').text(item.condition);
  $row.children('.date').text(item.date);

  $('#items').append($row);
}
