//////////////////////////////////////////header////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const headerProducts = document.getElementById("Products");
  const headerOffers = document.getElementById("Offers");
  const headerConceptSpace = document.getElementById("Concept_Space");
  const dropdowns = document.getElementsByClassName("dropdown");
  const dropdownLines = document.getElementsByClassName("dropdown_line");
  const bg = document.getElementById("dropdown_bg");
  let headerMenuIndex = -1;

  headerProducts.onclick = () => toggleDropdown(0);
  headerOffers.onclick = () => toggleDropdown(1);
  headerConceptSpace.onclick = () => toggleDropdown(2);

  function toggleDropdown(index) {
    const isActive = dropdowns[index].classList.contains("active");

    // Remove active classes from all dropdowns and lines
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("active");
      dropdownLines[i].classList.remove("active_line");
    }
    bg.classList.remove("bg_active");

    // Add active classes if the clicked dropdown was not already active
    if (!isActive) {
      dropdowns[index].classList.add("active");
      dropdownLines[index].classList.add("active_line");
      bg.classList.add("bg_active");
      headerMenuIndex = index;
    } else {
      headerMenuIndex = -1;
    }
  }

  // Add event listener to close the dropdown if clicked outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown") && !event.target.closest("header")) {
      closeAllDropdowns();
    }
  });

  function closeAllDropdowns() {
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("active");
      dropdownLines[i].classList.remove("active_line");
    }
    bg.classList.remove("bg_active");
    headerMenuIndex = -1;
  }
});

//////////////////////////////////////////swiper//////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".swiper_container").forEach((container) => {
    const swiper = container.querySelector(".swiper");
    const leftArrow = container.querySelector(".left");
    const rightArrow = container.querySelector(".right");

    let currentIndex = 0;
    let items = swiper.children.length;
    const itemWidth = swiper.children[0].offsetWidth;
    const visibleItems = Math.floor(swiper.offsetWidth / itemWidth);

    function updateArrows() {
      if (currentIndex === 0) {
        leftArrow.classList.add("disabled");
      } else {
        leftArrow.classList.remove("disabled");
      }

      if (currentIndex >= items - visibleItems) {
        rightArrow.classList.add("disabled");
      } else {
        rightArrow.classList.remove("disabled");
      }
    }
    if (items < 4) {
      items = 4;
    }
    function slideSwiper() {
      swiper.scrollLeft = currentIndex * (itemWidth + 30);
    }

    leftArrow.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        slideSwiper();
        updateArrows();
      }
    });

    rightArrow.addEventListener("click", () => {
      if (currentIndex < items - visibleItems) {
        currentIndex++;
        slideSwiper();
        updateArrows();
      }
    });

    updateArrows(); // Initial check for arrow state
  });
});

////////////////////////////////////////// scrollbar //////////////////////////////////////////

////////////////////////////////////////// cookies //////////////////////////////////////////
let cookie_btn = document.getElementById("cookie_btn");
cookie_btn.onclick = function () {
  document
    .getElementsByClassName("cookies")[0]
    .classList.add("cookie_accepted");
};

////////////////////////////////////////// button menu //////////////////////////////////////////
let btn_menu = document.getElementById("btn_menu_toggle");
let contact_btn = document.getElementById("contact");

btn_menu.onclick = function () {
  if (!btn_menu.classList.contains("activated")) {
    document
      .getElementsByClassName("button_menu_toggle")[0]
      .classList.add("activated");

    document.querySelectorAll(".button_menu_popup").forEach((el) => {
      el.style.opacity = "1";
      el.style.transition = "opacity 0.6s ease-in-out";
      el.style.pointerEvents = "all";
      // el.style.transition-delay = '0.6s';
    });
  } else {
    document
      .getElementsByClassName("button_menu_toggle")[0]
      .classList.remove("activated");
    document.querySelectorAll(".button_menu_popup").forEach((el) => {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.6s ease-in-out";
    });
  }
};

let forums = document.getElementsByClassName("forum_popup")[0];
let forums_close_btn = document.getElementsByClassName("forum_close")[0];

contact_btn.onclick = function () {
  forums.classList.remove("forum_popup_closed");
  document.querySelector("body").style.overflow = "hidden";
};
forums_close_btn.onclick = function () {
  document.querySelector("body").style.overflow = "auto";
  forums.classList.add("forum_popup_closed");
  document.querySelectorAll(".input_wrapper input").forEach(function (el) {
    el.classList.remove("error");
    el.value = '';
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(
    ".input_wrapper input, .input_wrapper textarea"
  );
  const checkbox = document.querySelector(
    ".input_wrapper input[type='checkbox']"
  );
  const submitButton = document.getElementsByClassName("forum_submit")[0];

  // Function to validate email
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
  }

  // Function to check if all required inputs are valid
  function checkInputs() {
    let allValid = true;
    inputs.forEach((input, index) => {
      if (index !== 3) {
        // Skip the fourth input
        if (input.value.trim() === "") {
          allValid = false;
        }
        if (index === 2 && !isValidEmail(input.value.trim())) {
          allValid = false;
        }
      }
    });
    if (!checkbox.checked) {
      allValid = false;
    }
    if (allValid) {
      submitButton.classList.add("submitable");
      console.log(submitButton.classList);
    } else {
      submitButton.classList.remove("submitable");
    }
  }

  // Function to handle focus and blur styling
  function handleLabelStyle(input, action) {
    const p = input.nextElementSibling;
    if (p && p.tagName.toLowerCase() === "p") {
      if (action === "focus" || input.value.trim() !== "") {
        p.classList.add("transformed");
      } else {
        p.classList.remove("transformed");
      }
    }
  }

  inputs.forEach((input, index) => {
    input.addEventListener("focus", function () {
      // Remove the 'focused' class from all inputs
      inputs.forEach(function (el) {
        el.classList.remove("focused");
      });

      // Add the 'focused' class to the currently focused input
      input.classList.add("focused");

      // Style the p tag next to the focused input
      handleLabelStyle(input, "focus");
    });

    input.addEventListener("blur", function () {
      // Remove the 'focused' class when the input loses focus
      input.classList.remove("focused");

      // Skip the fourth input for the blank check
      if (index === 3) {
        return;
      }

      // Check if the input is blank and add 'error' class if it is
      if (input.value.trim() === "") {
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }

      // Additional check for the third input (index 2), assuming it should be an email
      if (index === 2) {
        if (!isValidEmail(input.value.trim())) {
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      }

      // Check all inputs for validity
      checkInputs();

      // Style the p tag next to the blurred input
      handleLabelStyle(input, "blur");
    });

    // Restrict input to numbers only for the second input (index 1)
    if (index === 1) {
      input.addEventListener("input", function () {
        input.value = input.value.replace(/[^0-9]/g, "");
        // Check all inputs for validity
        checkInputs();
        // Style the p tag next to the input
        handleLabelStyle(input, "input");
      });
    } else {
      input.addEventListener("input", function () {
        // Check all inputs for validity
        checkInputs();
        // Style the p tag next to the input
        handleLabelStyle(input, "input");
      });
    }
  });
  // Initial check in case inputs are pre-filled
  checkInputs();
});
