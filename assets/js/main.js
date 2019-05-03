$(document).ready(function(){

  // Init des variables
  // Tableau contenant les info de l'article choisi
  var article = [];
  // Total du panier
  var total = 0;
  // Var contenant la modal pour les articles
  var modalArt = '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel"></h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body text-center"><img class="card-img-top" src="" alt=""><p class="descLM"></p><p>Prix : <span class="priceM"></span><span> €</span></p><label>Quantité :<select class="qteModal" name="quantite"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></label></div><div class="modal-footer"><button type="button" class="btn btn-secondary" id="clean" data-dismiss="modal">Fermer</button><button type="button" class="btn btn-primary ajout" id="addPanier">Ajouter au panier</button></div></div></div></div>'
  // Par défaut on cache tout les paquets de card
  $('.card-deck').hide();
  // Cache tout puis fait apparaitre l'acceuil
  $('#btnAccueil').click(function(){
    $('.elem').hide();
    $('.carousel').show()
  });
  // Cache tout puis fait apparaitre la catégorie Behourd
  $('#btnBehourd').click(function(){
    $('.elem').hide();
    $('.prodBehourd').show()
  });
  // Cache tout puis fait apparaitre la catégorie Fantasy
  $('#btnFant').click(function(){
    $('.elem').hide();
    $('.prodFant').show()
  });
  // Cache tout puis fait apparaitre la catégorie Laser
  $('#btnLaser').click(function(){
    $('.elem').hide();
    $('.prodLaser').show()
  });
  // Cache tout puis fait apparaitre la catégorie Support
  $('#btnSupport').click(function(){
    $('.elem').hide();
    $('.prodSupport').show()
  });
  // Fonction affichant un modal avec les valeurs de l'article choisi
  $('.card').on( "click", function() {
    // On 'nettoie' les anciennes modal
    $('#exampleModal').remove();
    // On fait apparaitre la modal dans le html, après l'article choisi
    $(this).after(modalArt);
    // Ajout des valeurs de la card dans le tableau
    article[0] = $(this).find('.id').text();      //Identifiant
    article[1] = $(this).find('.name').text();    //Nom produit
    article[2] = $(this).find('img').attr('src'); //Image produit
    article[3] = $(this).find('.descL').text();   //Description longue
    article[4] = $(this).find('.price').text();   //Prix produit
    // Ajout des valeurs dans le modal
    $('.modal-title').text(article[1]);               //Le titre
    $('.modal').find('img').attr('src', article[2]);  //L'image
    $('.descLM').text(article[3]);                    //La description longue
    $('.priceM').text(article[4]);                    //Le prix

    $('#addPanier').on( "click", function() {
      // Qte prends le choix du select de la modal de l'article
      var qte = $('.qteModal').val();
      // Ajout prends une ligne de tableau avec les info de l'article (id, nom, prix, qte, btn + -)
      var ajout = '<tr><td class="idArt">'+article[0]+'</td><td>'+article[1]+'</td><td><span  class="priceProd">'+article[4]+'</span> €</td><td class="qteProd">'+qte+'</td><td><button type="button" class="plus">+</button><button type="button" class="moins">-</button></td></tr>';
      // On ajoute la ligne au tableau du panier
      $('#panierModal').append(ajout);
      // On modifie la valeur correspondant au total du panier puis on l'affiche
      total += Number(qte) * Number(article[4]);
      $('#priceTotal').text(total.toFixed(2));
    });
  });
  // !!!
  // NE PAS METTRE DANS LA CARD CAR AJOUTE L'EVENT À CHAQUE OUVERTURE DE MODAL POUR ÉVITER LES RÉPÉT
  // !!!
  // Boutton pour vider le panier
  $('#emptyCart').on('click', function(){
    // Demande confirmation
    let choix = confirm("Êtes-vous sur de vouloir supprimer votre panier ?!");
    // Si on confirme: vide la panier puis réinitialise et affiche le total
    if (choix == true) {
      $('#panierModal').empty();
      alert('Panier supprimé !');
      total = 0;
      $('#priceTotal').text(total);
    }
  });
  // Sur le body on déclenche la fonction en cliquant sur l'élément ayant la classe plus
  $('body').on('click', '.plus', function () {
    // On récupère la qte, le prix du produit ainsi que le total du panier
    let nbrArt = $(this).parent().parent().find('.qteProd').text();
    let prixProd = $(this).parent().parent().find('.priceProd').text();
    let total = Number($('#priceTotal').text());
    // Incrémentation du nbr d'article
    nbrArt++;
    // Incrémentation du total du panier avec le prix du produit
    total += Number(prixProd);
    // Pui on réaffiche le total et le nombre d'articles
    $('#priceTotal').text(total);
    $(this).parent().parent().find('.qteProd').text(nbrArt);
  });

  // Sur le body on déclenche la fonction en cliquant sur l'élément ayant la classe plus
  $('body').on('click', '.moins', function () {
    // On récupère la qte, le prix du produit ainsi que le total du panier
    let nbrArt = $(this).parent().parent().find('.qteProd').text();
    let prixProd = $(this).parent().parent().find('.priceProd').text();
    let total = Number($('#priceTotal').text());
    // On décrémente la var représentant le nbr d'art
    nbrArt--;
    // Si la qte de l'article passe à 0
    if (nbrArt == 0) {
      // On demande s'il on veux le supprimer
      let choix = confirm("Êtes-vous sur de vouloir supprimer ce produit ?!");
      // Si on confirme:
      if (choix == true) {
        // On soustrait le prix du produit au total du panier et on l'affiche
        total -= Number(prixProd);
        $('#priceTotal').text(total);
        // Puis on supprime le produit du panier
        $(this).parent().parent().remove();
      // Sinon on garde la ligne en l'incrémentant pour éviter le qte=0
      } else {
        nbrArt++;
        $(this).parent().parent().find('.qteProd').text(nbrArt);
      }
    // Sinon la qte du produit est supérieur à 0
    } else {
      // On soustrait le total avec le prix du produit
      total -= Number(prixProd);
      // Pui on mets à jour le total du panier et le nbr d'article
      $('#priceTotal').text(total);
      $(this).parent().parent().find('.qteProd').text(nbrArt);
    }
  });
});
