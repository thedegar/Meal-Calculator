//-------------------------------------------
//  Tyler Hedegard
//  10/14/2015
//  Thinkful.com Node JS Meal Calculator
//-------------------------------------------

//Global variables
var menu = [];  //to be items and prices on the menu
var guest = 1;  //to increment with each guest order
var order = [];  //to be filled with lists of items per guest
var currentOrder = []; //to be filled with the items for the current guest

//Create logger function for debugging
var log = function(log) {
	console.log(log);
};

//Define items
menu = [
	["NY Strip", 24.00],
	["Ribeye", 22.00], 
	["Porterhouse", 34.00],
	["Filet", 28.00],
	["Chicken", 20.00],
	["Potatoes", 5.00], 
	["Carrots", 6.00],
	["Salad", 4.00],
	["Tea", 2.50],
	["Red Wing", 11.00]
];

//---------------------------------
//   JS Activity starts here
//---------------------------------

//Open New Item input
$(document).on("click","#addItem",function() {
	$("#newItem").show();
	$("#item").focus();
});

//Validate New Item entry
$(document).on("click","#newItemButton",function() {
	var item = $('#item').val();
	var price = $('#price').val();
	//Error handling for no input
	if (item == "" || price == "") {
		alert("Please don't input blanks");
	}
	//Error handling for not a number
	else if (isNaN(Number(price)) == true) {
		alert("Please input a number for price");
		log(Number(price));
	}
	else {
		$("#addItem").before("<h2 class='items'>" + item + " $" + Number(price).toFixed(2) + "</h2>");
		menu.push([item,Number(price)]);
		$("#item,#price").val("");
	}
});

//Take an order
$(document).on("click","#menu .items",function() {
	var newOrder = $(this).clone();
	$("#currentOrder").append(newOrder);
	currentOrder.push([newOrder.text()]);
	$("#orderButton").text("Click to complete this guest's order");
});

//Show "Get the check" button
$(document).on("click","#orderButton",function() {
	completeGuest();
});

//Handle click event on "Get the check" button
$(document).on("click","#checkButton",function() {
	completeGuest();
	$("#menu,.order,#newItem").hide();
	$("#finalCheck").show();
});

//Record a guest's order in DOM and in memory, clear the current order, prep for next guest
function completeGuest () {
	if (currentOrder.length > 0) {
		$("#checkButton").show();
		$("#orderButton").text("Click an item to start another order");
		var items = $("#currentOrder").children().clone();
		$("#totalOrder,.guestOrder").append(items);
		$("#currentOrder h2").remove();
		$("#totalOrder h3").last().remove();
		guest += 1;
		order.push(currentOrder);
		currentOrder = [];
		$("#currentOrder h3").text("Guest" + guest);
	};
}

