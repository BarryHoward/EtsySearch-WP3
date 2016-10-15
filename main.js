var numOfDisp = data.results.length;
var orgResults = data.results;
var results = orgResults.slice();

$(".search-bar").attr("placeholder", `${data.params.keywords}`);
$("#All-Categories").html(`<p><a href="#">All categories</a> > "${data.params.keywords}" (${data.count} Results)</p>`);
drawGrid();

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


//Open/Close Sort Menu
// ------------------------------------
$(".sort-button").click(function(){
	$("#sort1").toggleClass("closed");
})

//Re-Sort
//---------------------------------------

$(".sort-type").click(newSort);

function newSort(event){
	var target = $(event.target);
	var butPush = target.attr('id');
	if (butPush==="HighestPrice"){
		results.sort(priceHighest);
	} else if (butPush==="LowestPrice"){
		results.sort(priceLowest);
	} else if (butPush==="Relevancy"){
		results=orgResults.slice();
	} else if (butPush==="MostRecent"){
		console.log(butPush)
		results.sort(recent)
	}

	drawGrid();
	$("#sort1").toggleClass("closed");
	$(".sort-button").html(butPush);
	console.log(butPush);
}

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

function drawGrid(){
	$(".grid").html("");
	for (i=0; i<numOfDisp; i++){
		var newHTML = addBlock(i);
		$(".grid").append(newHTML);
	}
}

// Sorting Functions
//---------------------------------

function priceHighest(a, b){
	if (Number(a.price)>Number(b.price)){
		return -1;
	} else if (Number(b.price)>Number(a.price)){
		return 1;
	} else {
		return 0;
	}
}

function priceLowest(a, b){
	if (Number(a.price)>Number(b.price)){
		return 1;
	} else if (Number(b.price)>Number(a.price)){
		return -1;
	} else {
		return 0;
	}
}

function recent(a,b){
	if (Number(a.creation_tsz)<Number(b.creation_tsz)){
		return 1;
	} else if (Number(b.creation_tsz)<Number(a.creation_tsz)){
		return -1;
	} else {
		return 0;
	}

}