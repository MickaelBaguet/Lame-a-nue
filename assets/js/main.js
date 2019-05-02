$(document).ready(function(){

  $('.card-deck').hide();

  $('#btnAccueil').click(function(){
    $('.elem').hide();
    $('.carousel').show()
  });

  $('#btnBehourd').click(function(){
    $('.elem').hide();
    $('.prodBehourd').show()
  });

  $('#btnFant').click(function(){
    $('.elem').hide();
    $('.prodFant').show()
  });

  $('#btnLaser').click(function(){
    $('.elem').hide();
    $('.prodLaser').show()
  });

  $('#btnSupport').click(function(){
    $('.elem').hide();
    $('.prodSupport').show()
  });



});
