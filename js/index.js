
  let header = document.getElementsByTagName("header")[0];
  let dropMenu = document.getElementsByClassName('container-drop-menu')[0];
  let menuLinks =  document.getElementsByClassName('menu-link');
  let btnToggleMenu = document.getElementById("btn-menu-toggle");
  let sectionPrevention = document.getElementById('section-prevention');
  let btnScrollTop = document.getElementById("btn-scroll-top");


  window.onload = function (){

    window.addEventListener("scroll", effectsHeader);
    window.addEventListener("scroll",  showBtnScrollTop);
    addEventToMenuLinks(menuLinks);

    btnToggleMenu.addEventListener('click', function () {
        changeIconBtnToggleMenu();
        toggleHeaderBg();
        toggleMenu();
    });

  //   window.addEventListener("scroll", animationScroll);
  //   animationScroll();
  }


  function changeIconBtnToggleMenu(){
    btnToggleMenu.classList.toggle('btn-toggle-open');
  }

 // Open or Close menu
  function toggleMenu() {
      dropMenu.classList.toggle("container-drop-menu-open");
      document.getElementsByTagName("body")[0].classList.toggle("stop-scrolling");
  }

  // Change Header Background
  function toggleHeaderBg() {
      header.classList.toggle('header-toggle-bg');
  }


  function addEventToMenuLinks(menuLinks) {
       var length = menuLinks.length;
       for(var i = 0; i < length; i++){
           menuLinks[i].addEventListener('click', function(){
               toggleMenu();
               toggleHeaderBg();
               changeIconBtnToggleMenu();
               console.log(window.scrollY)
           });
       }
  }


  function setBg(el) {
      //    console.log(el);
      var ext = el.getAttribute("data-slide-ext");
      var img = el.getAttribute("data-img");

      //
      var windowWidth = window.innerWidth;

      var path = "./images/" + img + ext;

      if(windowWidth < 1100 && windowWidth >= 768) {
        path = "./images/" + img + "_tbl" + ext;
        el.style.backgroundImage = "url(" + path + ")";
        return;
      }

      if(windowWidth < 768) {
        path = "./images/" + img + "_sp" + ext;
        el.style.backgroundImage = "url(" + path + ")";
        return;
      }

      el.style.backgroundImage = "url(" + path + ")";
  }


  window.addEventListener('resize', function(){

    var slides = document.getElementsByClassName("kv-slider-item");
    var length = slides.length;

    for (let i = 0; i < length; i++) {
        setBg(slides[i]);
    }

  });

  function sliderTimer() {
      var slider = document.getElementsByClassName('kv-slider')[0];
      var slides = document.getElementsByClassName("kv-slider-item");
      var length = slides.length;

      for (let i = 0; i < length; i++) {
          setBg(slides[i]);
      }

      var current = 1;
      var prev = 0;
      setInterval(() => {

          slider.style.backgroundImage = slides[prev].style.backgroundImage;
          slides[prev].classList.remove("kv-slider-item-show");
          slides[current].classList.add("kv-slider-item-show");

          current += 1;
          current = current < length ? current : 0;
          prev = current - 1;
          prev = prev < 0 ? length - 1 : prev;
        //   console.log(current);
        //   console.log(prev)
      }, 12800);
  }

  sliderTimer();

// Carousel
$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        autoplay: true,
        loop: true,
        dots: false,
        margin: 0,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 3
            },
            1100: {
                items: 3
                
            }
        }
    })


    var owl = $('.owl-carousel');
    owl.owlCarousel();

    // Go to the next item
    $('#btn-next-slide').click(function() {
        owl.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('#btn-prev-slide').click(function() {
        owl.trigger('prev.owl.carousel', [300]);
    })
});

//  Header Btn Toggle
var questionToggles = document.getElementsByClassName("question-toggle");

for (var i = 0; i < questionToggles.length; i++) {
    questionToggles[i].addEventListener('click', function () {
        
        this.classList.toggle("open");
        
        var anwers = this.nextElementSibling;

        if (anwers.style.maxHeight) {
            anwers.style.maxHeight = null;
        } else {
            anwers.style.maxHeight = anwers.scrollHeight + "px";
        }
    })
}


//Header Effects
function effectsHeader() {
  var timeOutId = null;
  var heigthHeader = header.offsetHeight;
//   console.log(window.scrollY)
// console.log(heigthHeader)

  var distance = sectionPrevention.getBoundingClientRect().top;

  if (distance <= heigthHeader) {
       header.classList.add("show-header");

      if (header.style.transition != "") {
          return;
      }

      var heigthHeader = header.offsetHeight;
      header.style.transform = "translateY(-" + heigthHeader + "px)";
    //   header.style.backgroundColor = "#b5cedf";

      timeOutId = setTimeout(() => {
          header.style.boxShadow = "0 1px 16px rgba(0, 0, 0, 0.215)";
          header.style.transform = "none";
          header.style.transition = "transform ease 800ms";
      }, 100);

  }else if(distance > heigthHeader) {
    //   header.style.position = "none";
      header.style.top = "0";
      header.style.transition = "";
      header.style.boxShadow = "";
      header.classList.remove("show-header");
      clearTimeout(timeOutId);
  }
  
}

// Btn Scroll Top
function showBtnScrollTop(){
    var heigth = header.offsetHeight;
    if(window.scrollY >= heigth){
        btnScrollTop.classList.add("show-btn-scroll-top");
    }else {
        btnScrollTop.classList.remove("show-btn-scroll-top");
    }
}


//Form

function requiredFields(){
     var validated = [];
     var sForm = document.forms["serviceForm"];
     var name = sForm["name"];
     var email = sForm["email"];
     var phone = sForm["phone"];
     var address = sForm["address"];

     var adviceTitle = document.getElementById("required-advice-title");

     validated[0] = checkField(name, name.value.trim().length > 0)
     validated[1] = checkField(email, ValidateEmail(email.value.trim()))
     validated[2] = checkField(phone, /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone.value.trim()))
     validated[3] = checkField(address, address.value.trim().length > 0)
     
     if(validated.includes(false)){
        adviceTitle.classList.add("required-advice-show");
        return false;
     }else {
        adviceTitle.classList.remove("required-advice-show");
        return true;
     }
    
}

function ValidateEmail(mail) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail);
}

function checkField(field, v){
   var requiredFieldTag = document.getElementById("required-advice-" + field.getAttribute("name"));
   if(v){
       field.classList.remove("field-required");
       requiredFieldTag.classList.remove("required-advice-show");
       return v;
   }

   requiredFieldTag.classList.add("required-advice-show");
   field.classList.add("field-required");
   return v;
}

