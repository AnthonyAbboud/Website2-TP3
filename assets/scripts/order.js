"use strict"
  $("#order-form").validate({
		  rules: {
			   "first-name":{
		            "required": true,
		            "minlength": 2,
		         },
		         "last-name":{
			        "required": true,
			        "minlength": 2,
			     },
			     "email":{
			        "required": true,
			        "email": true,
			     },
			     "phone":{
			    	"required": true,
			    	"phoneUS": true,
			     },
			     "credit-card":{
			    	"required": true,
			    	"creditcard": true,
			     },
			     "credit-card-expiry":{
			    	"required": true, 
			    	"regex": '(0[1-9]|1[0-2])\/[0-9]{2}',
			     }
		   },
		   messages: {
				  "first-name": "Veuillez fournir au moins 2 caractères",
				  "last-name": "Veuillez fournir au moins 2 caractères",
			      "email": "Ce champ est obligatoire",
			      "phone": "Ce champ est obligatoire",
			      "credit-card":"Ce champ est obligatoire",
			      "credit-card-expiry": "La date d'expiration de votre carte de crédit est invalide",
		  },
		  submitHandler: function(form) {
			  var numOrder = 1;
			  for(let i = 0; i < localStorage.length; i++){
				  if (localStorage.getItem("order") != null) {
		            numOrder++;
		          }
			  }
			  var numOrderLg = numOrder.length;
			  var zerosAgauche = (numOrderLg >3?"":"0") + (numOrderLg >2?"":"0")
                + (numOrderLg >1?"":"0") + (numOrderLg >0?"":"0") + numOrder;
			  var order = {
					  "first_name": $('#first-name').val(),
					  "last_name": $('#last-name').val(),
					  "number": zerosAgauche,
					};
			  localStorage.setItem("order",JSON.stringify(order));
			  form.submit();
		  }  
  });
  jQuery.validator.addMethod("regex", 
	  function(value,element, regexp) {
      if (regexp.constructor != RegExp){
          regexp = new RegExp(regexp);}
       else if (regexp.global){
          regexp.lastIndex = 0;}
          return this.optional(element) || regexp.test(value);
   },"La date d’expiration de votre carte de crédit est invalide.");
