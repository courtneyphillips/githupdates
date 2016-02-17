$(document).ready(function(){
  $.get({
    url: 'https://api.github.com/users/courtneyphillips',
    dataType: "json",
    userAgent: "test",
    success: function(returndata){
      console.log('hey');
    }
    })
  });
