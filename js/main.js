(function () {
  setTimeout(function () {
    document.body.classList.remove("loading");
  }, 5000);
  setTimeout(function () {
    document.body.classList.remove("loading");
    document.body.classList.add("page-ready");
    $(".loader").addClass("loadingComplete");
  }, 4000);

  $(".count").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 3000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });

  $(".work-mask-row").hover(function () {
    $(this).toggleClass("mask-hover-content");
  });

  const links = document.querySelectorAll(".hover-me");
  const cursor = document.querySelector(".cursor");

  const animateMe = function (e) {
    const span = this.querySelector("span");
    const { offsetX: x, offsetY: y } = e,
      { offsetWidth: width, offsetHeight: height } = this;

    move = 20;
    xMove = (x / width) * (move * 2) - move;
    yMove = (y / height) * (move * 2) - move;

    span.style.transform = `translate(${xMove}px, ${yMove}px)`;

    if (e.type === "mouseleave") span.style.transform = "";
  };

  const editCursor = (e) => {
    const { clientX: x, clientY: y } = e;
    cursor.style.transform = `translate(${x}px, ${y}px)`;
    // cursor.style.left = x + "px";
    // cursor.style.top = y + "px";
  };

  links.forEach((link) => link.addEventListener("mousemove", animateMe));
  links.forEach((link) => link.addEventListener("mouseleave", animateMe));
  window.addEventListener("mousemove", editCursor);
})();

const text = document.querySelector(".circular-text .text");
const rotateText = new CircleType(text).radius(45);

gsap.set(".circular-text", { xPercent: -50 });

var rotate = gsap
  .timeline({
    scrollTrigger: {
      //   trigger: "#wrap",
      pin: true,
      scrub: 0.2,
      start: "top top",
      end: "+=10000",
    },
  })
  .to(".circular-text", {
    rotation: 360 * 5,
    duration: 1,
    ease: "none",
  });

$(document).on("click", 'a[href^="#"]', function (event) {
  event.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top,
    },
    1000
  );
});


(function () {
  $('.slider-cards-js').slick({
    centerMode: true,
    slidesToShow: 1,
  });
});
  
  
      var options = {
        invertX: false,
        invertY: false,
        limitX: 40,
        limitY: 40,
      };
  
      var emoji = document.getElementById("emoji");
      var parallax = new Parallax(emoji, options);


