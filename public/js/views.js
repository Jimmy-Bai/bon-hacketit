// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
    // Use jQuery to change visibility of element
    $("#topBtn").removeClass("invisible");
  } else {
    $("#topBtn").addClass("invisible");
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

// Find container with id navBtns using jQuery
// $("#navBtns").find("button").click(function(){
//   $("button").removeClass("active");
//   $(this).addClass("active");
// });

// Stop carousel cycling
$('.carousel').carousel({
  interval: false,
});

// Add active class to one of the carousel items
$("#cstart").addClass("active");
