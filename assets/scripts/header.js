"use strict";

const ServiceCurrentShoppingCart = {
		loadCurrentShoppingCart: () => {
			var counter = 0;
			$.getJSON('/data/products.json',function(data){
		      for(let i = 0; i < localStorage.length; i++){
		        $.each(data, function (index, product) {
		          if (localStorage.key(i) == product.id){
		            counter += parseInt(localStorage.getItem(product.id));
		          }
		        });
		      }
		      ControllerCurrentShoppingCart.DisplayCurrentCart(counter);
			});
		}
}

const ControllerCurrentShoppingCart = {
		DisplayCurrentCart: (counter) => {
			if (counter == 0){
				$(".count").css("display", "none");
			}else{
				$(".count").css("display", "block");
				$(".count").append(counter);
			}
		}
}

ServiceCurrentShoppingCart.loadCurrentShoppingCart();

