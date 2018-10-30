"use strict";
  /* Service */
  const Service = {
     /* Parses shopping list into an order */
	   commande : JSON.parse(localStorage.getItem("order"))
  }

  /* Controller */
  const Controller = {
      /* Confirms the processed ordre and resets the shopping cart */
		  Confirm: (order) => {
			  $('#name').append('Votre commande est confirm&eacute;e ' + order["first_name"] +' ' + order["last_name"] + "!");
        $('#confirmation-number').append(order["number"]);
        localStorage.clear();
        ServiceHeader.loadCurrentShoppingCart();
		  }
  }
  
  var order = Service.commande;
  Controller.Confirm(order);