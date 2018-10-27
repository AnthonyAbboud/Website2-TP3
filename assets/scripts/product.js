const Service = {
    loadProduct: () => {
      $.getJSON('/data/products.json',function(data){
        if (id > data.length || id < 1 || isNaN(id)) {
          Controller.displayNotFound();
        }else{
          $.each(data, function (index, product) {
            if (id == product.id){
              Controller.displayProduct(product);
            }
          });
        }
      });
    }
};

const Controller = {

  addCart: (e) => {
    if( $('#product-quantity').val() > 0 && !isNaN($('#product-quantity').val())){
      if(localStorage.getItem(id) == null){
        localStorage.setItem(id, $('#product-quantity').val());
      }
      else {
        localStorage.setItem(id, (parseInt($('#product-quantity').val()) + parseInt(localStorage.getItem(id))));
      }
      Controller.displayAddCart(e);
    }
  },

  urlParam: (name) => {
    var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
    if (results==null){
      id = null;
    }
    else{
      id = (results[1] || 0);
    }
  },

  displayNotFound: () => {
    $('main').css("display","none");
    $('body').append('<h1>Page non trouvée!</h1>');
  },

  displayAddCart: (e) => {
    e.preventDefault();
    if( $('#product-quantity').val() > 0 && !isNaN($('#product-quantity').val())){  

      $('<p id="dialog"></p>').appendTo('#add-to-cart-form');
      let timeOut = 5;
      jQuery('#dialog').css("position", "absolute");
      jQuery('#dialog').css("border", "12px solid black");
      jQuery('#dialog').css("background", "black");
      jQuery('#dialog').css("color", "white");
      jQuery('#dialog').css("right", "40%");
      jQuery('#dialog').css("bottom", "0px");
      jQuery('#dialog').text('Le produit a été ajouté au panier.').fadeIn();
      jQuery('#dialog').css("display", "block");
      setTimeout(function() {
        jQuery('#dialog').fadeOut();
        jQuery('#dialog').css("display", "none");
      }, timeOut * 1000);
    }
  },

  displayProduct: (product) => {
    $('#product-name').text(product.name);
    $('#product-image').attr('alt', product.name);
    $('#product-image').attr('src', './assets/img/'+product.image);
    $('.col > section > p').text(product.description);
    for (var i =0 ; i < product.features.length ; i++){
      $('<li>').appendTo('.col > section > ul')
      .append(product.features[i]);
    }
    $('p > strong').append(product.price + '&thinsp;$');
  }
};

var id;

Controller.urlParam("id");
Service.loadProduct();

$("#add-to-cart-form").submit(function(e) {
  Controller.addCart(e);
});