$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('form#priority').on('submit', submitPriority);
  $('form#todo').on('submit', submitTodo);
}

function submitAjaxForm(e, form, successFn){
  var url = $(form).attr('action');
  var data = $(form).serialize();

  var options = {};
  options.url = url;
  options.type = 'POST';
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  $.ajax(options);
  e.preventDefault();
}

function submitPriority(e){
  submitAjaxForm(e, this, function(data, status, jqXHR){
    htmlAddPriorityToSelect(data);
  });
}

function submitTodo(e){
  submitAjaxForm(e, this, function(data, status, jqXHR){
    htmlAddTodo(data);
  });
}

function htmlAddPriorityToSelect(priority){
  var $option = $('<option>');
  $option.val(priority._id);
  $option.text(priority.name);

  $('select#priority-select').append($option);
  $('form#priority input').val('');
  $('form#priority input[name="name"]').focus();
}

function htmlAddTodo(todo){
  var tr = '<tr><td class="title"></td><td class="due-date"></td><td class="priority"></td></tr>';
  var $tr = $(tr);
  $tr.css('background-color', todo.priority.color);
  $tr.children('.title').text(todo.title);
  $tr.children('.due-date').text(moment(todo.dueDate).format('dddd, MMMM Do YYYY'));
  $tr.children('.priority').text(todo.priority.name);

  $('table#todos tbody').append($tr);
}
