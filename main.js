console.log("loaded");

$(".grid").html("Howdy Howdy");

var results = data.results;
console.log(results);
var test = "";

function addBlock (item) {

	var img = item.Images[0].url_fullxfull;
	var title = item.title;
	var author = item.Shop.shop_name;
	var price = item.price;
	return `<div class="block"><img src="${img}"><p>${title}</p><p>${author}</p><p>${price}</p></div>`;

}

results.forEach(function(element){
	var newHTML = addBlock(element);
	test = `${test}${newHTML}`;
})

$(".grid").html(test);