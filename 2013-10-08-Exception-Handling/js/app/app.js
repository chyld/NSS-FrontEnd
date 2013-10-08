'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  var o = {};

  try {
    console.log(y);
  } catch(e) {
    console.log('you just received the error: ' + e);
  }

  try {
    console.log(x);
  } catch(e) {
    console.log('you just received the error: ' + e);
  }

  try {
    o.doesntExist();
  } catch(e) {
    console.log('you just received the error: ' + e);
  }

  console.log('i have reached the end of this function!');
}
