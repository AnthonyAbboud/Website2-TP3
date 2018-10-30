"use strict";

/* Service */
const ServiceHeader = {
		/* Computes the total amount of items in the shopping cart */
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
		      ControllerHeader.DisplayCurrentCart(counter);
			});
		}
}

/* Controller */
const ControllerHeader = {
		/* Displays the shopping cart's badge accordingly */
		DisplayCurrentCart: (counter) => {
			$(".count").empty();
			if (counter == 0){
				$(".count").hide();
			}else{
				$(".count").show();
				$(".count").append(counter);
			}
		}
}

ServiceHeader.loadCurrentShoppingCart();

