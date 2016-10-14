var numOfDisp = data.results.length;
var results = data.results;
var gridHTML = "";

function addBlock (index) {
	var item = results[index];
	var img = item.Images[0].url_170x135;
	var title = item.title;
	var author = item.Shop.shop_name;
	var price = item.price;

	var introHTML = `<a class="block-link" href="${item.url}"><div class="block">`;
	var imgHTML = `<img class="item-image" src="${img}">`;
	var hamHeartHTML = `<div class="hamHeart-cont"><a href="#"><img class="heart" src="assets/heart.png"></a><a href="#"><img class="hamburger" src="assets/hamburger.png"></a></div>`;
	var infoHTML = `<p>${title}</p><span class="author">${author}</span><span class="price">$${price}</span>`;
	var outroHTML = `</div></a>`;
	var totalHTML = `${introHTML}${imgHTML}${hamHeartHTML}${infoHTML}${outroHTML}`;
	return totalHTML;
}

for (i=0; i<numOfDisp; i++){
	var newHTML = addBlock(i);
	$(".grid").append(newHTML);
}

$(".search-bar").attr("placeholder", `${data.params.keywords}`);
$("#All-Categories").html(`<p>All categories > "${data.params.keywords}" (${data.count} Results)</p>`);


//Hamburger and Heart



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

$(".page-container").html(pageHTML);

$("#hamburger").hide();
$(".block").hover(function(event){$("#hamburger").show()}, function(){$("#hamburger").hide()});

