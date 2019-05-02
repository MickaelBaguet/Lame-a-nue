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

  $('.card').click(function(){

    var article = [];
    article[0] = $(this).find('.id').text();      //Identifiant
    article[1] = $(this).find('.name').text();    //Nom produit
    article[2] = $(this).find('img').attr('src'); //Image produit
    article[3] = $(this).find('.descL').text();   //Description longue
    article[4] = $(this).find('.price').text();   //Prix produit
    console.log(article);

    $('.modal-title').text(article[1]);
    $('.modal').find('img').attr('src', article[2]);
    $('.descLM').text(article[3]);
    $('.priceM').text(article[4]);

});
  $('#btnContact').click(function(){
    $('.elem').hide();
    $('.Contact').show()
  });

});
