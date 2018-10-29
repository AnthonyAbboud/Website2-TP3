const Service = {

    formatPrice: (price) => {
      return price.toFixed(2).replace(".", ",");
    },
 
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
    $('article').empty();
    $('article').append('<h1>Page non trouvée!</h1>');
  },

  displayAddCart: (e) => {
    e.preventDefault();
    if( $('#product-quantity').val() > 0 && !isNaN($('#product-quantity').val())){  

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
    $('article').empty();
    $('article').append('<h1 id="product-name">' + product.name + '</h1>');
    $('article').append('<div class="row"><div class="col"><img id="product-image"></div><div class="col"><section><h2>Description</h2><p id="product-desc"></p></section><section><h2>Caractéristiques</h2><ul id="product-features"></ul></section><hr><form class="pull-right" id="add-to-cart-form"><label for="product-quantity">Quantité:</label><input class="form-control" id="product-quantity" type="number" value="1" min="1"><button class="btn" title="Ajouter au panier" type="submit"><i class="fa fa-cart-plus"></i>&nbsp; Ajouter</button></form><p>Prix: <strong id="product-price"></strong></p></div></div>');
    $('#product-image').attr('alt', product.name);
    $('#product-image').attr('src', './assets/img/'+product.image);
    $('#product-desc').append(product.description);
    for (var i =0 ; i < product.features.length ; i++){
      $('<li>').appendTo('.col > section > ul')
      .append(product.features[i]);
    }
    $('p > strong').append(Service.formatPrice(product.price) + '&thinsp;$');
    $('<p id="dialog"></p>').appendTo('article');
    $("#add-to-cart-form").submit(function(e) {
       Controller.addCart(e);
       ServiceHeader.loadCurrentShoppingCart();
    });
  }
};

var id;

Controller.urlParam("id");
Service.loadProduct();


