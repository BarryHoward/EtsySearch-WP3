// Initializations
//--------------------------------------------

var orgResults = data.results;
var totalResults = orgResults.slice();
var filteredResults = orgResults.slice();

$(".search-bar").attr("placeholder", `${data.params.keywords}`);
$("#All-Categories").html(`<p><a href="#">All categories</a> > "${data.params.keywords}" (${data.count} Results)</p>`);
drawGrid(totalResults);


//Category Menu
//---------------------------------------

categoryArray=[];
totalResults.forEach(function(element){
	if (!categoryArray.includes(element.taxonomy_path[0])){
		categoryArray.push(element.taxonomy_path[0]);
	}
})
categoryArray.sort();

var categoryHTML = "";
categoryArray.forEach(function(element){
	var idConcat = element.split(" ").join("");
	var catHTML = `<li><button class="category-button" id="${idConcat}">${element}</button></li>`
	categoryHTML = `${categoryHTML}${catHTML}`;
})

//Filter by Category
//------------------------------------------

$(".category-list").html(categoryHTML);
$(".category-button").click(filterCategories);

function filterCategories(event){
	var target = $(event.target);
	var butPush = target.attr('id');
	if (butPush === "AllCategories"){
		filteredResults = totalResults.slice();
	} else {
		filteredResults = totalResults.filter(function(elem){
			if (elem.taxonomy_path[0].split(" ").join("")===butPush){
				return true;
			} else {
				return false;
			}
		})
	}
	drawGrid(filteredResults);
}


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
		filteredResults.sort(priceHighest);
		totalResults.sort(priceHighest);
	} else if (butPush==="LowestPrice"){
		filteredResults.sort(priceLowest);
		totalResults.sort(priceLowest);
	} else if (butPush==="Relevancy"){
		filteredResults=orgResults.filter(function(element){
			if (filteredResults.includes(element)){
				return true;
			} else {
				return false;
			}
		})
		totalResults=orgResults.slice();
	} else if (butPush==="MostRecent"){
		filteredResults.sort(recent);
		totalResults.sort(recent);
	}

	drawGrid(filteredResults);
	$("#sort1").toggleClass("closed");
	$(".sort-button").html(butPush);
}

// Grid Functions
//------------------------------------------------

function addBlock (index, resArray) {
	var item = resArray[index];
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

function drawGrid(array){
	$(".grid").html("");
	for (i=0; i<array.length; i++){
		var newHTML = addBlock(i, array);
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