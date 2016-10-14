var numOfDisp = data.results.length;
var results = data.results;
var gridHTML = "";

function addBlock (index) {
	var item = results[index];
	var img = item.Images[0].url_170x135;
	var title = item.title;
	var author = item.Shop.shop_name;
	var price = item.price;
	var urlTop = `<a class="block-link" href="${item.url}"><div class="block"><img src="${img}">`;
	var urlBottom = `<p>${title}</p><span class="author">${author}</span><span class="price">$${price}</span></div></a>`;
	return `${urlTop}${urlBottom}`;
}

for (i=0; i<numOfDisp; i++){
	var newHTML = addBlock(i);
	gridHTML = `${gridHTML}${newHTML}`;
}

$(".search-bar").attr("placeholder", `${data.params.keywords}`);
$("#All-Categories").html(`<p>All categories > "${data.params.keywords}" (${data.count} Results)</p>`);
$(".grid").html(gridHTML);



//Create page Buttons
//-----------------------------------------------

function makePB(char){
	return `<button class="page-button">${char}</button>`;
}

var pageHTML = "";
pageHTML = pageHTML + makePB("<");
for (i=1; i<9; i++){
	pageHTML = pageHTML + makePB(i);
}
pageHTML = pageHTML + makePB("...");
pageHTML = pageHTML + makePB("250");
pageHTML = pageHTML + makePB(">");

console.log(pageHTML);
$(".page-container").html(pageHTML);