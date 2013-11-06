$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('form#priority').on('submit', submitPriority);
  $('form#todo').on('submit', submitTodo);
  $('table#todos').on('click', 'input[type="checkbox"]', clickCompleted);
  $('table#todos').on('click', '.delete > button', clickDelete);
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

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

function clickCompleted(){
  var id = $(this).parent().parent().data('todo-id');
  sendGenericAjaxRequest('/todos/' + id + '/completed', {}, 'post', 'put', null, function(data, status, jqXHR){
    htmlTodoCompleted(data);
  });
}

function clickDelete(){
  var id = $(this).parent().parent().data('todo-id');
  sendGenericAjaxRequest('/todos/' + id, {}, 'post', 'delete', null, function(data, status, jqXHR){
    htmlRemoveTodo(data);
  });
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

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

function sendGenericAjaxRequest(url, data, verb, altVerb, event, successFn){
  var options = {};
  options.url = url;
  options.type = verb;
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb) options.data._method = altVerb;
  $.ajax(options);
  if(event) event.preventDefault();
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function htmlAddPriorityToSelect(priority){
  var $option = $('<option>');
  $option.val(priority._id);
  $option.text(priority.name);

  $('select#priority-select').append($option);
  $('form#priority input').val('');
  $('form#priority input[name="name"]').focus();
}

function htmlAddTodo(todo){
  var tr = '<tr><td class="completed"></td><td class="title"></td><td class="due-date"></td><td class="priority"></td><td class="delete"></td></tr>';
  var $tr = $(tr);
  $tr.css('background-color', todo.priority.color);
  $tr.attr('data-todo-id', todo._id);
  $tr.children('.completed').append('<input type="checkbox">');
  $tr.children('.title').text(todo.title);
  $tr.children('.due-date').text(moment(todo.dueDate).format('dddd, MMMM Do YYYY'));
  $tr.children('.priority').text(todo.priority.name);
  $tr.children('.delete').append('<button class="tiny radius alert">Delete</button>');

  $('table#todos tbody').append($tr);
}

function htmlRemoveTodo(todo){
  $('tr[data-todo-id="' + todo._id + '"]').remove();
}

function htmlTodoCompleted(todo){
  var decoration = todo.completed ? 'line-through' : 'none';
  $('tr[data-todo-id="' + todo._id + '"]').css('text-decoration', decoration);
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
