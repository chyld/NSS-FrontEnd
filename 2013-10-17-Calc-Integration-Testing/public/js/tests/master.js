'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

test('Calculate 2 numbers', function(){
  expect(4);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  deepEqual($('#op1').val(), '', 'op1 should be blank');
  deepEqual($('#op2').val(), '', 'op2 should be blank');
  deepEqual($('#operator').val(), '', 'operator should be blank');
  deepEqual($('#result').val(), '6', 'result should be 6');
});

test('Paper Trail', function(){
  expect(13);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  deepEqual($('#history > li').length, 1, 'should be 1 LIs');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  deepEqual($('#history > li').length, 2, 'should be 1 LIs');
  deepEqual($('#history > li:first-child > span').length, 6, 'should be 6 spans');
  ok($('#history > li:first-child > span:first-child').hasClass('op1'), 'should have op1 class for first span');
  ok($('#history > li:first-child > span:nth-child(2)').hasClass('operator'), 'should have operator class for first span');
  ok($('#history > li:first-child > span:nth-child(3)').hasClass('op2'), 'should have op1 class for first span');
  ok($('#history > li:first-child > span:nth-child(4)').hasClass('equal'), 'should have equal class for first span');
  ok($('#history > li:first-child > span:nth-child(5)').hasClass('result'), 'should have result class for first span');
  deepEqual($('#history > li:first-child > span:nth-child(1)').text(), '7', 'should have 7 in top row for op1');
  deepEqual($('#history > li:first-child > span:nth-child(2)').text(), '*', 'should have * in top row for operator');
  deepEqual($('#history > li:first-child > span:nth-child(3)').text(), '8', 'should have 8 in top row for op2');
  deepEqual($('#history > li:first-child > span:nth-child(4)').text(), '=', 'should have = in top row for equal');
  deepEqual($('#history > li:first-child > span:nth-child(5)').text(), '56', 'should have 56 in top row for result');
});

test('Remove Calculation', function(){
  expect(4);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('3');
  $('#op2').val('3');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  deepEqual($('#history > li').length, 3, 'should be 3 results');
  deepEqual($('#history > li:first-child > .result').text(), '0', 'should have 0 in top row for result');

  $('#history > li:nth-child(1) > .delete').trigger('click');

  deepEqual($('#history > li').length, 2, 'should be 2 results');
  deepEqual($('#history > li:first-child > .result').text(), '56', 'should have 56 in top row for result');
});

test('Alternating Row Colors', function(){
  expect(4);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('3');
  $('#op2').val('3');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  deepEqual($('#history > li:first-child').css('background-color'), 'rgb(255, 0, 0)', 'should be red background color');
  deepEqual($('#history > li:nth-child(2)').css('background-color'), 'rgb(255, 255, 255)', 'should be white background color');

  $('#history > li:nth-child(1) > .delete').trigger('click');

  deepEqual($('#history > li:first-child').css('background-color'), 'rgb(255, 0, 0)', 'should be red background color');
  deepEqual($('#history > li:nth-child(2)').css('background-color'), 'rgb(255, 255, 255)', 'should be white background color');
});

test('Sum Button', function(){
  expect(1);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('3');
  $('#op2').val('3');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  $('#sum').trigger('click');

  deepEqual($('input#result').val(), '61', 'summing up 3 numbers');
});

test('Product Button', function(){
  expect(1);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('3');
  $('#op2').val('3');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  $('#product').trigger('click');

  deepEqual($('input#result').val(), '0', 'multiplying 3 numbers');
});

test('Filter Negative Rows', function(){
  expect(2);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('3');
  $('#op2').val('30');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  $('#filter-negative').trigger('click');

  deepEqual($('#history > li').length, 2, 'should be 2 rows left');
  $('#sum').trigger('click');
  deepEqual($('input#result').val(), '61', 'sum of 2 remaining rows should be 61');
});

test('Filter Positive Rows', function(){
  expect(2);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('3');
  $('#op2').val('30');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  $('#filter-positive').trigger('click');

  deepEqual($('#history > li').length, 1, 'should be 1 row left');
  $('#sum').trigger('click');
  deepEqual($('input#result').val(), '-27', 'sum of 1 remaining row should be -27');
});
