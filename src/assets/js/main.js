// $('.menu_bar').click(function () {
//     $(this).toggleClass('close')
//     $('.sidebar,.main_content,.header').toggleClass('active');
// });


// const checkbox = document.getElementById("checkbox");
// checkbox.addEventListener("change", () => {
//     document.body.classList.toggle("light_mode")
// });


// $(window).scroll(function () {
//     if ($(this).scrollTop() > 1) {
//         $('.header').addClass("sticky");
//     }
//     else {
//         $('.header').removeClass("sticky");
//     }
// });


var isVisible = false


//****************** sidebar js start ************//

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("mySidebar").style.padding = "0px 8px";
    document.getElementById("wrapper").style.marginLeft = "250px";
    document.getElementById("showMenu").style.display = "none";
    document.getElementsByClassName("nav_menu").style.marginTop="0";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("mySidebar").style.padding = "0";
    document.getElementById("wrapper").style.marginLeft = "0";
    // document.getElementsByClassName("sidebar_header").style.width = "0";
    document.getElementById("showMenu").style.display = "block";
  }

  function threeDots() {
    var element = document.getElementById("threeDotsMenu");
    element.classList.toggle("three_dots_box");
  }

  // document.addEventListener('click', (e) => {
  //   var element = document.getElementById("threeDotsMenu");
  //   var target = e.target

  //   if(!element.contains(target)) {
  //     if(element.classList.contains('three_dots_box')) {
  //       element.classList.remove("three_dots_box");
  //     }
  //   }
  // })
  
  function password_change_box() {
    var element = document.getElementById("passwordBox");
    element.classList.toggle("password_div");
  }




  //****************** sidebar js end ************//