'use strict';

// Local Schema (defined in keys.js)
var schools = [];

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#add-school').click(clickAddSchool);
  $('#add-student').click(clickAddStudent);
  $('#add-subject').click(clickAddSubject);
}

function clickAddSchool(){
  var name = getValue('#school');
  var length = getValue('#length');
  var width = getValue('#width');
  var school = new School(name, length, width);
  schools.push(school);
  htmlAddSchoolToSelect(school);
}

function clickAddSubject(){
  var subjectName = getValue('#subject');
  var studentName = $('#pick-student').val();

  var school = _.find(schools, function(sch){
    return _.find(sch.students, function(stu){
      return stu.name === studentName;
    });
  });

  var student = _.find(school.students, function(stu){return stu.name === studentName;});
  var subject = new Subject(subjectName);
  student.subjects.push(subject);
}

function clickAddStudent(){
  var name = getValue('#student');
  var gpa = getValue('#gpa', parseFloat);
  var schoolName = $('#pick-school').val();

  var school = _.find(schools, function(s){
    return s.name === schoolName;
  });

  var student = new Student(name, gpa);
  school.students.push(student);
  htmlAddStudentToSelect(student);
}

// ---------------------------------------------- //
// CLASSES DEFINED HERE //

function School(name, length, width){
  this.name = name;
  this.established = '1930';
  this.length = length;
  this.width = width;
  this.students = [];
  this.area = function(){return parseInt(this.length, 10) * parseInt(this.width, 10);};
  this.gpa = function(){
    var sum = _.reduce(this.students, function(memo, student){return memo + student.gpa;}, 0);
    var total = this.students.length;
    return sum / total;
  };
}

function Student(name, gpa){
  this.name = name;
  this.gpa = gpa;
  this.subjects = [];
}

function Subject(name){
  this.name = name;
}

// ---------------------------------------------- //

function htmlAddSchoolToSelect(school){
  var $option = $('<option>');
  $option.text(school.name);
  $option.val(school.name);
  $('#pick-school').append($option);
}

function htmlAddStudentToSelect(student){
  var $option = $('<option>');
  $option.text(student.name);
  $option.val(student.name);
  $('#pick-student').prepend($option);
}

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}
