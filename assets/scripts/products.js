const Service = {
	loadProducts: () => {
		$.getJSON("./data/products.json", function(data) {
			$.each(data, function(product) {
				products.push(data[product]);
			});
			Service.sortProducts(products);
		});
	},

	sortProducts: (products) => {
		products.sort(function(a, b) {
			var itemA;
            var itemB;
            if (rank === "low-high" || rank === "high-low") {
                itemA = a["price"];
                itemB = b["price"];
            } else if (rank === "A-Z" || rank === "Z-A") {
                itemA = a["name"];
                itemB = b["name"];
            }

            if (rank === "low-high" || rank === "A-Z") {
                if (itemA < itemB) {
                    return -1;
                } else if (itemA > itemB) {
                    return 1;
                }
                else {
                	return 0;
                }
            } else if (rank === "high-low" || rank === "Z-A") {
                if (itemA > itemB) {
                    return -1;
                } else if (itemA < itemB) {
                    return 1;
                }
                else {
                	return 0;
                }   
            }
		});

		var filteredProducts = [];

		switch(category) {
			case "all-products":
				filteredProducts = products;
			default:
				$.each(products, function(index) {
					var product = products[index];
					if(product["category"] == category) {
						filteredProducts.push(product);
					}
				});
				break;
		}

		Controller.display(filteredProducts);
	}
};

const Controller = {
	display: (productsTable) => {
		$("#products-list").empty();
		$.each(productsTable, function(index) {
			var product = productsTable[index];
			$("#products-list").append("<div class=\"product\"><a href=\"./product.html?id=" + product["id"] + "\" title=\"En savoir plus...\"><h2>" + product["name"] + "</h2><img alt=\"" + product["name"] + "\" src=\"./assets/img/" + product["image"] + "\"><p class=\"price\"><small>Prix </small>" + product["price"].toString().replace(/\./g, ',') + "&thinsp;$</p></a></div>");
		});
		$("#products-count").text(productsTable.length + " produits");
	},

	updateFilterButtons: (parentId, id) => {
		if(parentId == "product-categories") {
			category = id;
		} else if (parentId == "product-criteria"){
			rank = id;
		}
		$("#" + parentId).find("button.selected").removeClass("selected");
		$("#" + id).addClass("selected");
	}
};

var products = [];
var rank = "low-high";
var category = "all-products";

Service.loadProducts();

$("button").click(function() {
	var id = $(this).attr("id");
	var parentId = $(this).parent().attr("id");

	Controller.updateFilterButtons(parentId, id);
	Service.sortProducts(products);
});