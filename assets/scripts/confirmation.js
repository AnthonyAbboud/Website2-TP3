"use strict";

  const Service = {
	   commande : JSON.parse(localStorage.getItem("order"))
  }
  const Controller = {
		  Confirm: (order) => {
			  $('#name').append('Votre commande est confirm&eacute;e ' + order["first_name"] +' ' + order["last_name"] + "!");
			  $('#confirmation-number').append(order["number"]);
		  }
  }
  
  var order = Service.commande;
  Controller.Confirm(order);