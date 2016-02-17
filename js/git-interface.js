$(document).ready(function(){
  $.get({
    url: 'https://api.github.com/users/courtneyphillips',
    dataType: "json",
    userAgent: "test",
    success: function(returndata){
      $('#githubUrl').text("your Github URL is " + returndata.url)
      $('#location').text("You are located in " + returndata.location)
      $('#followers').text("You currently have " + returndata.followers + " followers.")
      $('#json').text(JSON.stringify(returndata, null, 2));
    }
  });
});
