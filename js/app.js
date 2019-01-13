
 let myTimer;
 let hours=0,minutes=0,seconds=0;
function startTimer() 
{	/*This function is used to start the timer of game it gets called once player
	clicks on first card */
	let start = new Date;
    hours=0,minutes=0,seconds=0;
    myTimer=setInterval(function() {
    seconds=Math.floor((new Date - start) / 1000, 0);
    hours=Math.floor(seconds/3600, 0);
    seconds-=hours*3600;
    minutes=Math.floor(seconds/60, 0);
    seconds-=minutes*60;
    $('.timer').text(hours+':'+minutes+':'+seconds);
}, 1000);
}


 
//List of all available Cards
let cards=["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];
let move_counters=0; //Total number of moves made by player
let openCards=[]; //List of all open Cards
let search=-1;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


function displayCards(){
	/*
 * Display the cards on the page
 *	 - reset the timer,rating,move counter
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
	clearInterval(myTimer); //to stop the timer
	$('.timer').text("0:0:0");
	openCards=[];
	let rating=3;
	let stars="";
	while (rating!=0){
		stars+="<i class=\"fa fa-star\"></i>";
			rating--;
	}
	$("ul.stars").html(stars);	//Adding ratings in form of stars to a new game
	//startTimer();
	move_counters=0;
	$(".moves").text(move_counters);
	let deck="<ul class=\"deck\">",j=0;
	while(j<2){
		cards=shuffle(cards);
	for(let i=0;i<cards.length;i++){
		deck+="<li class=\"card\"><i class=\"fa ";
		deck+=(cards[i]+"\"></i></li>");
	}j=j+1;
	}deck+="</ul>";
	$('div#winner').html(deck); //Adding all cards to the new game
}

function displayWinner() 
{	/*
	Display the winner page modal
	*Create html page having Congratulations Message
	*Add time taken and rating to html page
	*Add Play Again Button
	*Use event handling for displaying new game if clicked on play again button	
	*/
let win=" ";
win+="<h1 class=\"Winner\">********Congratulations!!!********</h1><h3 class=\"Winner\">You Won The Game <br><br>Time:";
win+=minutes+":"+seconds;
win+="<br>Ratings:"
let rating=0;
if(move_counters==16)
	rating=3;
else if(move_counters>21)
	rating=1;
else rating=2;
while (rating!=0){
	win+="<i class=\"fa fa-star\"></i>";
	rating--;
}
win+="</h3><button class=\"Winner\">Play again</button>"
$('div#winner').html(win);
$(document.body).on('click','button.Winner',displayCards);
}


$(document.body).on('click','li.card:not(.open)',function(e){
	/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
	move_counters++;
	if(move_counters==1)
	startTimer();
	$(".moves").text(Math.floor(move_counters/2));
	if(move_counters==21)
		$('i.fa-star').eq(1).remove();
	else if(move_counters==17)
		$('i.fa-star').eq(0).remove();

$(this).addClass("open show");
let classList = $(this).children(":first").attr('class').split(/\s+/);
search= $.inArray(classList[1],openCards);
if(search==-1)
{	openCards.push(classList[1]);
	if(openCards.length==2)
	{let x=openCards[0];
	let y=openCards[1];
	setTimeout(function() {
       $('li.card').removeClass('open show');
   }, 300);
		openCards.splice( $.inArray(x,openCards) ,1 );
		openCards.splice($.inArray(y,openCards) ,1 );
	}
}

else if(search==0)
{
	$('.open.show').removeClass('open show').addClass('match');
	let x=openCards[0];
	openCards.splice($.inArray(x,openCards),1);
	if($('.match').length==16)
	{
		clearInterval(myTimer);
		//console.log(move_counters);
		displayWinner();

	}
}
});

//Reload game if restart game is clicked
$(document.body).on('click','.restart',displayCards);

 