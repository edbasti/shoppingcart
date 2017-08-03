var data =
	{
		"product1":
		{
			"product_code": "ult_small",
			"product_name": "Unlimited 1GB",
			"price": 24.90
		},
		"product2":
		{
			"product_code": "ult_medium",
			"product_name": "Unlimited 2GB",
			"price": 29.90
		},
		"product3":
		{
			"product_code": "ult_large",
			"product_name": "Unlimited 5GB",
			"price": 44.90
		},
		"product4":
		{
			"product_code": "1gb",
			"product_name": "1 GB Data-pack",
			"price": 9.90
		}
	};
	
var rules =
{
	"promo_discount" : {"code": "I<3AMAYSIM", "discount": .10},
	"_3for2" : "product1",
	"bulk_discount" : {"product":"product1","counter":3,"price_drop":5},
	"free_bundle" : {"free_item": "product1", "sold_item" : "product2"}
};


var cart =
	{
		"items" : ["product1","product2","product1","product1"],
		"promo_code": "I<3AMAYSIM"
	};

function ShoppingCart(cart_items,pricingRules){

	this.final_items = [];
	this.total = 0;
	this.pricing_rules = pricingRules;
	this.cart_items = cart_items;
	
	
	this.count = function(a){
		 var result = {};
		 for(var i in a){
		  if(result[a[i]] == undefined) result[a[i]] = 0;
		  result[a[i]]++;
		 }
		 return result;
	}
	
	this.applyRules = function(){
		
		var _3for2 = this.pricing_rules._3for2;
		var bulk_discount = this.pricing_rules.bulk_discount;
		var free_bundle = this.pricing_rules.free_bundle;
		var promo_discount = this.pricing_rules.promo_discount;
		
		this.final_items = this.cart_items.items;
		this.final_discount = 0;
		var itemsWithCount = this.count(this.final_items);
		
		
		if (_3for2)
		{
			for (var key in itemsWithCount) {
			  if (_3for2 == key)
			  {
				  if (itemsWithCount[key] == 3){
					  var index = this.final_items.indexOf(itemsWithCount[key]);
					  this.final_items.splice(index, 1);
				  }
			  }
			};
			
			
		};
		if (bulk_discount)
		{
			for (var key in itemsWithCount) {
			  if (bulk_discount.product == itemsWithCount[key] && bulk_discount.counter == key)
			  {
				  this.data[key].price = this.data[key].price - bulk_discount.price_drop;
			  }
			};
		};
		if (free_bundle)
		{
			for (var key in itemsWithCount) {
				if (key == free_bundle.sold_item)
				{
					this.final_items.push(free_bundle.free_item);
				}
			}
		};
		if (promo_discount)
		{
			if (this.cart_items.promo_code == promo_discount.promo_code)
			{
				this.final_discount += promo_discount.discount;
			}
		};
		var retObj = {"final_items" : this.final_items, "final_discount" : this.final_discount};
		return retObj;
		
	}
	this.total = function(){
		return this.total;
	};
	this.items = function(){
		return this.final_items;
	};
}


var thecart = new ShoppingCart(cart,rules);
var theobj = thecart.applyRules();
var items_added = theobj.final_items;
var cart_total = 0;

for (var i = 0; i < theobj.final_items.length; i++)
{
	cart_total += data[theobj.final_items[i]].price;
}
cart_total -= theobj.final_discount;
