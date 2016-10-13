var numOfDisp = 16;
var results = data.results;
var gridHTML = "";

function addBlock (index) {
	var item = results[index];
	var img = item.Images[0].url_170x135;
	var title = item.title;
	var author = item.Shop.shop_name;
	var price = item.price;
	var urlTop = `<a class="block-link" href="${item.url}"><div class="block"><img src="${img}">`;
	var urlBottom = `<p>${title}</p><span class="author">${author}</span><span class="price">${price}</span></div></a>`;
	return `${urlTop}${urlBottom}`;
}

for (i=0; i<numOfDisp; i++){
	var newHTML = addBlock(i);
	gridHTML = `${gridHTML}${newHTML}`;
}

$(".search-bar").attr("placeholder", `${data.params.keywords}`);
$("#All-Categories").html(`<p>All categories > "${data.params.keywords}" (${data.count} Results)</p>`);
$(".grid").html(gridHTML);