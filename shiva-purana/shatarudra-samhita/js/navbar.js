/* =========================================================
   Bholenath Dham — Navbar V3 behavior
   Dropdowns + nested sub-dropdowns + active page
   Existing main.js remains responsible for the site's
   established mobile menu and language system.
   ========================================================= */

(function () {
  "use strict";

  function closeDropdown(dropdown) {
    if (!dropdown) return;

    dropdown.classList.remove("open");

    var button = dropdown.querySelector(":scope > .bd-nav-trigger");

    if (button) {
      button.setAttribute("aria-expanded", "false");
    }

    dropdown.querySelectorAll(".bd-nav-subdropdown.open").forEach(function (sub) {
      sub.classList.remove("open");

      var subButton = sub.querySelector(":scope > .bd-nav-subtrigger");

      if (subButton) {
        subButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  function closeSubDropdowns(parent) {
    parent.querySelectorAll(":scope > .bd-nav-menu > .bd-nav-subdropdown.open").forEach(function (sub) {
      sub.classList.remove("open");

      var button = sub.querySelector(":scope > .bd-nav-subtrigger");

      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  function closeAll(nav, except) {
    nav.querySelectorAll(".bd-nav-dropdown.open").forEach(function (dropdown) {
      if (dropdown !== except) {
        closeDropdown(dropdown);
      }
    });
  }

  /* ---------------------------------------------------------
     Automatically highlight the current page
     --------------------------------------------------------- */

  function setActivePage(nav) {
    var currentPath = window.location.pathname
      .replace(/\/+$/, "")
      .toLowerCase();

    if (currentPath === "") {
      currentPath = "/";
    }

    nav.querySelectorAll("a[href]").forEach(function (link) {

      link.removeAttribute("aria-current");

      var href = link.getAttribute("href");

      if (!href) return;

      if (
        href.charAt(0) === "#" ||
        href.indexOf("javascript:") === 0
      ) {
        return;
      }

      var linkUrl;

      try {
        linkUrl = new URL(href, window.location.origin);
      } catch (error) {
        return;
      }

      if (linkUrl.origin !== window.location.origin) {
        return;
      }

      var linkPath = linkUrl.pathname
        .replace(/\/+$/, "")
        .toLowerCase();

      if (linkPath === "") {
        linkPath = "/";
      }

      if (linkPath === currentPath) {

        link.setAttribute("aria-current", "page");

        /* Activate normal dropdown parent */
        var parentDropdown = link.closest(".bd-nav-dropdown");

        if (parentDropdown) {
          parentDropdown.classList.add("active");
        }

        /* Activate nested submenu parent */
        var parentSubDropdown = link.closest(".bd-nav-subdropdown");

        if (parentSubDropdown) {
          parentSubDropdown.classList.add("active");

          var subTrigger = parentSubDropdown.querySelector(
            ":scope > .bd-nav-subtrigger"
          );

          if (subTrigger) {
            subTrigger.setAttribute("aria-current", "page");
          }
        }
      }
    });
  }

  function initNavbarV3() {

    var nav = document.getElementById("navbar");

    if (!nav || nav.dataset.navbarV3Bound === "1") {
      return;
    }

    nav.dataset.navbarV3Bound = "1";

    /* -------------------------------------------------------
       Active page
       ------------------------------------------------------- */

    setActivePage(nav);

    /* -------------------------------------------------------
       Main dropdowns
       Shiva Purana / Explore / Hanuman / Seva / Media
       ------------------------------------------------------- */

    nav.querySelectorAll(".bd-nav-trigger").forEach(function (button) {

      button.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        var dropdown = button.closest(".bd-nav-dropdown");

        if (!dropdown) return;

        var shouldOpen = !dropdown.classList.contains("open");

        closeAll(nav, dropdown);

        dropdown.classList.toggle("open", shouldOpen);

        button.setAttribute(
          "aria-expanded",
          String(shouldOpen)
        );

        /* When closing a main dropdown,
           also close its nested dropdowns. */

        if (!shouldOpen) {
          closeSubDropdowns(dropdown);
        }
      });
    });

    /* -------------------------------------------------------
       Nested dropdowns
       Rudra Samhita / Mahatmya
       ------------------------------------------------------- */

    nav.querySelectorAll(".bd-nav-subtrigger").forEach(function (button) {

      button.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        var subDropdown = button.closest(".bd-nav-subdropdown");

        if (!subDropdown) return;

        var parentMenu = subDropdown.parentElement;

        var shouldOpen = !subDropdown.classList.contains("open");

        /* Close other nested dropdowns at the same level */

        parentMenu
          .querySelectorAll(":scope > .bd-nav-subdropdown.open")
          .forEach(function (other) {

            if (other !== subDropdown) {

              other.classList.remove("open");

              var otherButton = other.querySelector(
                ":scope > .bd-nav-subtrigger"
              );

              if (otherButton) {
                otherButton.setAttribute(
                  "aria-expanded",
                  "false"
                );
              }
            }
          });

        subDropdown.classList.toggle("open", shouldOpen);

        button.setAttribute(
          "aria-expanded",
          String(shouldOpen)
        );
      });
    });

    /* -------------------------------------------------------
       Close when clicking outside navbar
       ------------------------------------------------------- */

    document.addEventListener("click", function (event) {

      if (!event.target.closest("#navbar")) {
        closeAll(nav);
      }
    });

    /* -------------------------------------------------------
       Escape closes everything
       ------------------------------------------------------- */

    document.addEventListener("keydown", function (event) {

      if (event.key === "Escape") {
        closeAll(nav);
      }
    });

    /* -------------------------------------------------------
       Close dropdown after clicking a final destination
       ------------------------------------------------------- */

    nav.querySelectorAll(".bd-nav-menu a, .bd-nav-submenu a")
      .forEach(function (link) {

        link.addEventListener("click", function () {
          closeAll(nav);
        });

      });
  }

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initNavbarV3
    );

  } else {

    initNavbarV3();

  }

})();