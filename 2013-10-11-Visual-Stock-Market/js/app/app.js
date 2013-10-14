'use strict';

// Firebase Schema
var Δdb;
var Δcash;
var Δstocks;

// Local Schema
var db = {};
db.timer = 0;
db.cash = 0;
db.stocks = [];
db.statistics = {};
db.keys = {};
db.keys.flickr = '4c6e1f137bbeb666a1c0a884b609e286';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#deposit').click(clickDeposit);
  $('#purchase').click(clickPurchase);
  $('#refresh').click(clickRefresh);
  $('#stocks').on('click', '.stock', clickSell);
  Δdb = new Firebase('https://visual-stock-market-cm.firebaseio.com/');
  Δcash = Δdb.child('cash');
  Δstocks = Δdb.child('stocks');
  Δcash.on('value', dbCashChanged);
  Δstocks.on('child_added', dbStockAdded);
  Δstocks.on('child_removed', dbStockRemoved);
  clickRefresh();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickDeposit(){
  var deposit = getValue('#deposit-amount', parseFloat);
  Δcash.set(db.cash + deposit);
}

function clickPurchase(){
  var symbol = getValue('#symbol', parseUpperCase);
  var quantity = getValue('#quantity', parseInt);

  requestQuote(symbol, function(data){
    var quote = data.Data;
    if(quote.LastPrice * quantity <= db.cash){
      purchaseStock(symbol, quote, quantity);
    }
  });
}

function clickSell(){
  var symbol = $(this).data('symbol');
  var stock = _.find(db.stocks, function(s){return s.symbol === symbol;});
  Δcash.set(db.cash + (stock.price * stock.quantity));
  var Δchild = Δstocks.child(stock.key);
  Δchild.remove();
}

function clickRefresh(){
  var delay = getValue('#delay', parseFloat) * 1000;
  clearInterval(db.timer);
  db.timer = setInterval(stockQuoteLoop, delay);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbCashChanged(snapshot){
  var cash = snapshot.val();

  if(cash){
    db.cash = cash;
  }

  htmlUpdateCash();
}

function dbStockAdded(snapshot){
  var key = snapshot.name();
  var stock = snapshot.val();
  stock.key = key;
  db.stocks.push(stock);
  htmlAddStock(stock);
}

function dbStockRemoved(snapshot){
  var stock = snapshot.val();
  stock = _.find(db.stocks, function(s){return s.symbol === stock.symbol;});
  var index = _.indexOf(db.stocks, stock);
  db.stocks.splice(index, 1);
  htmlRemoveStock(stock);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
}

function searchFlickr(query, perPage, page, key, fn){
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + key + '&text=' + query + '&per_page=' + perPage + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, fn);
}

function purchaseStock(symbol, quote, quantity){
  db.cash -= quote.LastPrice * quantity;
  Δcash.set(db.cash);

  var stock = {};
  stock.symbol = symbol;
  stock.name = quote.Name;
  stock.price = quote.LastPrice;
  stock.quantity = quantity;
  Δstocks.push(stock);
}

function stockQuoteLoop(){
  computeStatistics();
  htmlUpdateBalances();
  for(var i = 0; i < db.stocks.length; i++){
    updateStockQuote(db.stocks[i].symbol);
  }
}

function updateStockQuote(symbol){
  requestQuote(symbol, function(data){
    var stock = _.find(db.stocks, function(s){return s.symbol === symbol;});
    stock.price = data.Data.LastPrice;
    htmlUpdateStock(stock);
  });
}

function computeStatistics(){
  db.statistics.totalStockPrices = _.reduce(db.stocks, function(sum, stock){ return sum + stock.price; }, 0);
  db.statistics.totalStockPosition = _.reduce(db.stocks, function(sum, stock){ return sum + (stock.price * stock.quantity); }, 0);
  db.statistics.totalStocks = db.stocks.length;
}

function computeHeight(stock){
  return (stock.price / db.statistics.totalStockPrices) * 250;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlUpdateCash(){
  $('#cash').val(formatCurrency(db.cash));
}

function htmlUpdateBalances(){
  $('#stock').val(formatCurrency(db.statistics.totalStockPosition));
  $('#total').val(formatCurrency(db.cash + db.statistics.totalStockPosition));
}

function htmlAddStock(stock){
  searchFlickr(stock.name, 1, 1, db.keys.flickr, function(data){
    var photo, url;

    try{
      photo = data.photos.photo[0];
      url = 'url(http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
    } catch(e) {
      url = 'http://www.stockrockandroll.com/wp-content/woo_custom/900-Hot_Cheap_Stocks.jpg?57ad98';
    }

    var stockHtml = '<div class="stock"><div class="empty"></div><div class="graph"></div><div class="logo"></div><div class="name"></div></div>';
    var $stock = $(stockHtml);
    $stock.attr('data-symbol', stock.symbol);
    htmlGraphHeight($stock, stock);
    $stock.children('.logo').css('background-image', url);
    $stock.children('.name').text(stock.name);
    $('#stocks').prepend($stock);
  });
}

function htmlUpdateStock(stock){
  var $stock = $('div[data-symbol="' + stock.symbol + '"]');
  if($stock){
    htmlGraphHeight($stock, stock);
  }
}

function htmlGraphHeight($stock, stock){
  var graphHeight = computeHeight(stock);
  var emptyHeight = 250 - graphHeight;
  $stock.children('.empty').css('height', emptyHeight);
  $stock.children('.graph').css('height', graphHeight);
}

function htmlRemoveStock(stock){
  var $stock = $('div[data-symbol="' + stock.symbol + '"]');
  $stock.remove();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

function getValue(selector, fn){
  var value = $(selector).val();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}Object

function parseUpperCase(string){
  return string.toUpperCase();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
