var balance = 1000;

$(document).ready(initialize);

function deposit(account_balance, amount)
{
  return account_balance + amount;
}

function withdraw(account_balance, amount)
{
  return account_balance - amount;
}

function initialize()
{
  $('#deposit').click(deposit_funds);
  $('#withdraw').click(withdraw_funds);
}

function deposit_funds()
{
  var amount = $('#amount').val();
  amount = parseInt(amount);
  balance = deposit(balance, amount);
  $('#balance').text('$' + balance + '.00');

  if(balance >= 0)
    $('#balance').removeClass('negative');
}

function withdraw_funds()
{
  var amount = $('#amount').val();
  amount = parseInt(amount);
  balance = withdraw(balance, amount);
  $('#balance').text('$' + balance + '.00');

  if(balance < 0)
    $('#balance').addClass('negative');
}
