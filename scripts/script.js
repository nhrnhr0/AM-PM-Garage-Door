const RED_PEN_DELAY = 1500;
var counter = document.getElementById("counters");
var counterHeight = counter.clientHeight;
var redpen = document.getElementById("redpen");
document.addEventListener('scroll', scroll_listener);
// check if element is in view
function inView(el) {
  // get window height
  var windowHeight = window.innerHeight;
  // get number of pixels that the document is scrolled
  var scrollY = window.scrollY || window.pageYOffset;
  
  // get current scroll position (distance from the top of the page to the bottom of the current viewport)
  var scrollPosition = scrollY + windowHeight;
  // get element position (distance from the top of the page to the bottom of the element)
  var elementPosition = el.getBoundingClientRect().top + scrollY + counterHeight;
  
  // is scroll position greater than element position? (is element in view?)
  if (scrollPosition > elementPosition) {
    return true;
  }
  
  return false;
}
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  );
}
function scroll_listener() {
  animateCountersListener();
  animateRedPenListenr();
}


var is_redpen_active = false;
function animateRedPenListenr() {
  var is_in_view = isInViewport(redpen);
  if(is_redpen_active == false && is_in_view) {
    is_redpen_active =true;
    setTimeout(()=>{
      redpen.classList.add('active');
    },RED_PEN_DELAY);
  }else if(is_in_view == false){
    is_redpen_active =false;
    redpen.classList.remove('active');
  }
}
// animate counters when it is in view
var is_animation_started = false;
function animateCountersListener() {
  // is element in view?
  if (inView(counter)) {
      // element is in view, add class to element
      counter.classList.add('animate');
      if(is_animation_started == false){
        is_animation_started=  true;
        counterDivs = document.querySelectorAll('.num');
        
        for(var i = 0; i < counterDivs.length; i++) {
            var coutDom = counterDivs[i];
            console.log(coutDom);
            var render_time= Math.max(coutDom.dataset.num,1500) + Math.random()*1500;
            animateCounters(counterDivs[i], 0, coutDom.dataset.num,render_time);
        }
        
      }
  }
}



function animateCounters(obj, initVal, lastVal, duration) {

    let startTime = null;

    //get the current timestamp and assign it to the currentTime variable
    let currentTime = Date.now();

    //pass the current timestamp to the step function
    const step = (currentTime ) => {

        //if the start time is null, assign the current time to startTime
        if (!startTime) {
              startTime = currentTime ;
        }

        //calculate the value to be used in calculating the number to be displayed
        const progress = Math.min((currentTime  - startTime) / duration, 1);

        //calculate what to be displayed using the value gotten above
        var html = Math.floor(progress * (lastVal - initVal) + initVal);
        var commas = html.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        obj.innerHTML = commas;

        //checking to make sure the counter does not exceed the last value (lastVal)
        if (progress < 1) {
              window.requestAnimationFrame(step);
        }
        else{
              window.cancelAnimationFrame(window.requestAnimationFrame(step));
        }
    };

    //start animating
    window.requestAnimationFrame(step);
}