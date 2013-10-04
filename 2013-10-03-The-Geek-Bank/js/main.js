'use strict';

var accountBalance = 0;

$(document).ready(initialize);

function initialize(){
  $('#set_logo').click(setLogo);
  $('#set_balance').click(setBalance);
  $('#deposit').click(deposit);
  $('#withdraw').click(withdraw);
  $('#transactions').on('click', '.deposit, .withdraw', undoTransaction);
}

function undoTransaction(){
  var $transaction = $(this);
  var cls = $transaction.attr('class');
  var amount = $transaction.text();
  amount = amount.slice(1);
  amount = parseInt(amount, 10);

  if(cls === 'deposit'){
    accountBalance -= amount;
  } else {
    accountBalance += amount;
  }

  $transaction.remove();
  updateDisplay();
}

function setLogo(){
  var url = $('#logo_url').val();
  $('#logo').attr('src', url);
  $('#logo_controls').hide();
  $('#balance_txt').focus();
}

function setBalance(){
  var balance = $('#balance_txt').val();
  accountBalance = parseInt(balance, 10);
  $('#balance').text(makeCurrency(accountBalance));
  $('#balance_controls').hide();
  $('#amount').focus();
}

function deposit(){
  var amount = $('#amount').val();
  amount = parseInt(amount, 10);
  accountBalance += amount;
  updateDisplay();

  var $li = $('<li>');
  $li.addClass('deposit');
  $li.text(makeCurrency(amount));
  $('#deposits').prepend($li);
}

function withdraw(){
  var amount = $('#amount').val();
  amount = parseInt(amount, 10);
  accountBalance -= amount;
  updateDisplay();

  var $li = $('<li>');
  $li.addClass('withdraw');
  $li.text(makeCurrency(amount));
  $('#withdraws').prepend($li);
}

function updateDisplay(){
  $('#amount').val('');
  $('#amount').focus();
  $('#balance').text(makeCurrency(accountBalance));
}

function makeCurrency(number){
  return '$' + number + '.00';
}
