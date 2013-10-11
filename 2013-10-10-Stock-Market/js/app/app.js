'use strict';

// Firebase Schema
var Δdb;
var Δbalance;
var Δstocks;

// Local Schema
var db = {};
db.balance = {};
db.stocks = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#set-funds').click(setFunds);
  $('#purchase').click(purchase);
  $('#start-animation').click(startAnimation);
  Δdb = new Firebase('https://stock-market-cm.firebaseio.com/');
  Δbalance = Δdb.child('balance');
  Δstocks = Δdb.child('stocks');
  Δbalance.on('value', balanceChanged);
  Δstocks.on('child_added', stockAdded);
}

// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //

function setFunds(){
  var funds = $('#get-funds').val();
  funds = parseInt(funds, 10);
  db.balance.cash = funds;
  Δbalance.set(db.balance);
  $('#get-funds').val('');
}

function purchase(){
  var symbol = $('#symbol').val();
  var quantity = $('#quantity').val();
  quantity = parseInt(quantity, 10);

  requestQuote(symbol, function(data, textStatus, jqXHR){
    var quote = data.Data;

    if(quote.LastPrice * quantity <= db.balance.cash){
      db.balance.cash -= quote.LastPrice * quantity;
      db.balance.stock += quote.LastPrice * quantity;
      Δbalance.set(db.balance);

      var stock = {};
      stock.name = quote.Name;
      stock.symbol = symbol.toUpperCase();
      stock.purchasePrice = quote.LastPrice;
      stock.quantity = quantity;
      Δstocks.push(stock);
    }

    $('#symbol').val('');
    $('#quantity').val('');
  });
}

function startAnimation(){
  var delay = $('#delay').val();
  delay = parseFloat(delay, 10) * 1000;
  setInterval(getUpdatedQuotes, delay);
}

// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //

function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
}


function getUpdatedQuotes(){
  for(var i = 0; i < db.stocks.length; i++){
    requestQuote(db.stocks[i].symbol, viewUpdateStockRow);
  }
}

// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //

function balanceChanged(balance){
  balance = balance.val();

  if(!balance){
    db.balance.cash = db.balance.stock = 0;
  } else {
    db.balance = balance;
  }

  viewUpdateBalance();
}

function stockAdded(stock){
  stock = stock.val();
  db.stocks.push(stock);
  viewAddStockRow(stock);
}

// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //

function viewUpdateBalance(){
  $('#cash').val(formatCurrency(db.balance.cash));
  $('#stock').val(formatCurrency(db.balance.stock));
  $('#total').val(formatCurrency(db.balance.cash + db.balance.stock));
}

function viewAddStockRow(stock){
  var tr = '<tr><td class="name"></td><td class="symbol"></td><td class="quote"></td><td class="quantity"></td><td class="position"></td></tr>';
  var $tr = $(tr);
  $tr.addClass(stock.symbol).addClass('stock');

  $tr.children('.name').text(stock.name);
  $tr.children('.symbol').text(stock.symbol);
  $tr.children('.quote').text(formatCurrency(stock.purchasePrice));
  $tr.children('.quantity').text(stock.quantity);
  $tr.children('.position').text(formatCurrency(stock.purchasePrice * stock.quantity));

  $('#stocks').append($tr);
}

function viewUpdateStockRow(data, textStatus, jqXHR){
  var quote = data.Data;
  var selector = '.' + quote.Symbol;
  var quantity = $(selector).children('.quantity').text();
  quantity = parseFloat(quantity, 10);
  var cls = quote.Change < 0 ? 'losing-money' : 'making-money';

  $(selector).children('.quote').text(formatCurrency(quote.LastPrice));
  $(selector).children('.position').text(formatCurrency(quote.LastPrice * quantity));
  $(selector).removeClass('losing-money making-money').addClass(cls);

  calculateNewStockTotals();
}

function calculateNewStockTotals(){
  var positions = $('.stock .position').text().split('$');
  positions = _.compact(positions);
  var sum = 0;

  for(var i = 0; i < positions.length; i++){
    sum += parseFloat(positions[i]);
  }

  db.balance.stock = sum;
  viewUpdateBalance();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //
