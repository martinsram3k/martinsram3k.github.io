/**
 * 1. SCROLL SPY - Detekce viditelné sekce a automatické přepínání menu
 */
const observerOptions = {
  root: null,
  threshold: 0.6, // Přepne menu, když je vidět 60 % sekce
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Získáme třídu elementu, který je zrovna vidět
      const sectionClass = entry.target.classList[0];
      const aboutImg = document.querySelector(".aboutImg");
      const portfolioSection = document.querySelector(".portfolio");
      if (sectionClass === "about" && portfolioSection) {
        setTimeout(() => {
          portfolioSection.classList.remove("portfolioUnloaded");
        } , 1000);
        
      } else if (sectionClass !== "portfolio" && portfolioSection) {
        portfolioSection.classList.add("portfolioUnloaded");
      }

      // Propojíme třídu sekce s ID tlačítka v navigaci
      let activeId = "";
      if (sectionClass === "hero-section") activeId = "home-button";
      if (sectionClass === "about") {
        activeId = "about-button";
        if (aboutImg) {
          aboutImg.classList.add("aboutImgActive");
        }
      } else {
        const aboutImg = document.querySelector(".aboutImg");
        if (aboutImg) {
          aboutImg.classList.remove("aboutImgActive");
        }
      }
      if (sectionClass === "portfolio") activeId = "portfolio-button"; 
      if (sectionClass === "contact-section") activeId = "contact-button";

      if (activeId) {
        setActiveLink(activeId);
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

/**
 * 2. POMOCNÉ FUNKCE
 */

// Funkce pro nastavení aktivní třídy v navigaci
const setActiveLink = (activeButtonId) => {
  const navLinks = document.querySelectorAll(".komet");
  navLinks.forEach((link) => {
    link.classList.toggle("active-link", link.id === activeButtonId);
  });
};

// Funkce pro plynulý scroll na sekci s odsazením kvůli fixní navigaci
const scrollToElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

/**
 * 3. UDÁLOSTI PŘI SCROLLU (Stín navigace a Top Button)
 */
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  const topBtn = document.querySelector(".top-button");

  // Stín navigace
  if (window.scrollY > 10) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  // Tlačítko nahoru (fade efekt)
  if (window.scrollY > 100) {
    topBtn.style.opacity = "1";
    topBtn.style.pointerEvents = "auto";
  } else {
    topBtn.style.opacity = "0";
    topBtn.style.pointerEvents = "none";
  }
});

/**
 * 4. OBSLUHA KLIKNUTÍ A INICIALIZACE PO NAČTENÍ
 */
window.addEventListener("load", () => {
  // Spuštění pozorování sekcí pro Scroll Spy
  const sections = document.querySelectorAll(
    ".hero-section, .about, .portfolio, .contact-section",
  );
  sections.forEach((section) => observer.observe(section));

  // Definice tlačítek pro kliknutí
  const btns = {
    home: document.getElementById("home-button"),
    about: document.getElementById("about-button"),
    portfolio: document.getElementById("portfolio-button"),
    contact: document.getElementById("contact-button"),
    top: document.querySelector(".top-button"),
  };

  btns.home?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  btns.about?.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToElement(".about");
  });

  btns.portfolio?.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToElement(".portfolio");
    portfolioSection.classList.remove("portfolioUnloaded");
  });

  btns.contact?.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToElement(".contact-section");
  });

  btns.top?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/**
 * 5. INTRO SHOW-UP ANIMACE
 */
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector("nav");
  const hero = document.querySelector(".hero-section");
  const about = document.querySelector(".about");

  if (navbar) navbar.style.opacity = "1";

  setTimeout(() => {
    if (hero) hero.style.opacity = "1";
  }, 400);

  setTimeout(() => {
    if (about) about.style.opacity = "1";
  }, 800);
});
