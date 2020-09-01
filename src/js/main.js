/* 
	I gust took <img "src"> attribute and gave it as backgroundImage style to '.carousel-item';
	To <img> tag I gave "diplay: none" style
	By the way it's necessary for good stationing images into the slider
*/

let images = document.getElementsByClassName("slide");
let outerSlides = document.getElementsByClassName("carousel-item");
let arrows = document.querySelectorAll(".arrow-container");
let dots = document.querySelectorAll(".dot");

for (let i = 0; i < images.length; i++) {
	images[i].style.display = "none";
	outerSlides[i].style.backgroundImage = `url('${images[i].getAttribute("src")}')`;
}


/* 
	Start coding "slider" :3
*/

let current = 1; // set current slide
let autoplayInterval = 4000; // set autoplay interval

showSlide(current); // call function to display first slide when the will load

let nextSlide = () => showSlide(current += 1);
let prevSlide = () => showSlide(current -= 1);
let gotoSlide = (id) => showSlide(current = id);

function showSlide(id) {
	let slides = document.querySelectorAll(".carousel-item");
	let dots = document.querySelectorAll(".dot");

	if (id > slides.length) current = 1; // goto first slide if the next slide index is bigger than slides.length
	if (id < 1) current = slides.length; // conversely

	for (let i = 0; i < slides.length; i++) slides[i].classList.add("opacity0"); // set opacity: 0 to all slides
	for (let i = 0; i < dots.length; i++) dots[i].classList.remove("active"); // remove .active class from all dots

	slides[current-1].classList.remove("opacity0"); // set opacity: 0 to current slide
	dots[current-1].classList.add("active"); // add .active class to current dot
}

/*
	AutoPlay Slider
*/


// start autoplay (use glibal variable)
let startAutoplay = () => window.timerId = setInterval(() => nextSlide(), autoplayInterval);
// stop autoplay
let stopAutoplay = () => clearInterval(window.timerId); 


// Function for adding "click" listener to someone components on the page (more than one)
function addListenerTo(component) {
	for (let i = 0; i < component.length; i++) {
		component[i].addEventListener('click', () => {
			stopAutoplay();
			startAutoplay();
		});
	}
}

addListenerTo(arrows);
addListenerTo(dots);

startAutoplay();