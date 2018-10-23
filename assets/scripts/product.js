$(document).ready(function() {
  	$.urlParam = function(id){
		var results = new RegExp('[\?&]' + id + '=([^]*)').exec(window.location.href);
		if (results==null){
		       return null;
		    }
		else{
		    return results[1] || 0;
		}
	}
  	
  	$.getJSON('/data/products.json',function(data){
        let productId = decodeURIComponent($.urlParam('id'));
        console.log(data.length)
        if (productId > data.length || productId < 1 || isNaN(productId)) {
        	$('main').css("display","none");
        	$('body').append('<h1> Page non trouvée !</h1>')
        }else{
        	$.each(data, function (index, product) {
        		if (productId == product.id){
        			$('h1').text(product.name)
        			$('#product-image').attr('alt', product.name)
        			$('#product-image').attr('src', './assets/img/'+product.image)
        			$('.col > section > p').text(product.description)
        			for (var i =0 ; i < product.features.length ; i++){
        				$('<li>').appendTo('.col > section > ul')
        				.append(product.features[i]);
       		 		}
        			$('p > strong').append(product.price + '&thinsp;$')
        		}
        	});
        }
	  })
  
  	$("#add-to-cart-form").submit(function(e) {
  		e.preventDefault();
  		if( $('#product-quantity').val() > 0 && !isNaN($('#product-quantity').val())){  		
  			$('<p id="successdiv"></p>').appendTo('#add-to-cart-form')
  			let timeOut = 5
  			jQuery('#successdiv').css("position", "absolute")
  			jQuery('#successdiv').css("border", "12px solid black")
  			jQuery('#successdiv').css("background", "black")
  			jQuery('#successdiv').css("color", "white")
  			jQuery('#successdiv').css("right", "40%")
  			jQuery('#successdiv').css("bottom", "0px")
  			jQuery('#successdiv').text('Le produit a été ajouté au panier.').fadeIn()
  			jQuery('#successdiv').css("display", "block")
  			setTimeout(function() {
  				jQuery('#successdiv').fadeOut()
  				jQuery('#successdiv').css("display", "none")
  			}, timeOut * 1000);
  		}
  	})
  })