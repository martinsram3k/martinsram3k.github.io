/**
 * 1. SCROLL SPY - Detekce viditelné sekce pro hlavní menu
 */
const observerOptions = {
  root: null,
  threshold: 0.4, // Aktivuje se, když je vidět 40 % sekce
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionClass = entry.target.classList[0];
      const sectionId = entry.target.id;
      
      const aboutImg = document.querySelector(".aboutImg");
      const portfolioParent = document.querySelector(".portfolio");

      // Animace portfolia při prvním scrollu
      if (sectionClass === "about" && portfolioParent) {
        setTimeout(() => {
          portfolioParent.classList.remove("portfolioUnloaded");
        }, 1000);
      }

      // Logika aktivního tlačítka v hlavní navigaci (home, about, portfolio, contact)
      let activeId = "";
      if (sectionClass === "hero-section") activeId = "home-button";
      if (sectionClass === "about") {
        activeId = "about-button";
        if (aboutImg) aboutImg.classList.add("aboutImgActive");
      } else {
        if (aboutImg) aboutImg.classList.remove("aboutImgActive");
      }
      
      // Pokud jsme v hlavní divu portfolio nebo v jakékoli podsekci (video, grafika...)
      const subSections = ["video", "grafika", "motionGrafika", "foto"];
      if (sectionClass === "portfolio" || subSections.includes(sectionId)) {
        activeId = "portfolio-button";
      }
      
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
const setActiveLink = (activeButtonId) => {
  const navLinks = document.querySelectorAll(".komet");
  navLinks.forEach((link) => {
    link.classList.toggle("active-link", link.id === activeButtonId);
  });
};

const scrollToElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};

/**
 * 3. SCROLL & STICKY NAV
 */
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  const topBtn = document.querySelector(".top-button");

  if (window.scrollY > 10) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");

  if (window.scrollY > 100) {
    topBtn.style.opacity = "1";
    topBtn.style.pointerEvents = "auto";
  } else {
    topBtn.style.opacity = "0";
    topBtn.style.pointerEvents = "none";
  }
});

/**
 * 4. INICIALIZACE A KLIKNUTÍ
 */
window.addEventListener("load", () => {
  // Sledování sekcí pro Scroll Spy
  const sectionsToObserve = document.querySelectorAll(
    ".hero-section, .about, .portfolio, .contact-section, #video, #grafika, #motionGrafika, #foto"
  );
  sectionsToObserve.forEach((section) => observer.observe(section));

  // --- LOGIKA PŘEPÍNÁNÍ PORTFOLIA ---
  const portfolioLinks = document.querySelectorAll(".portfolio-link");
  const portfolioContentSections = document.querySelectorAll("#video, #grafika, #motionGrafika, #foto");

  portfolioLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Aktivní vzhled odkazu v portfoliu
      portfolioLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Cílové ID z hrefu (např. #motionGradika)
      const targetId = link.getAttribute("href").substring(1);

      // Přepnutí viditelnosti tabulek
      portfolioContentSections.forEach((sec) => {
        if (sec.id === targetId) {
          sec.style.display = "block"; // Zobrazíme sekci
        } else {
          sec.style.display = "none";  // Schováme ostatní
        }
      });
      
      console.log("Přepnuto na portfolio sekci:", targetId);
    });
  });

  // --- HLAVNÍ NAVIGACE (Home, About, Portfolio, Contact) ---
  const mainNavButtons = {
    "home-button": () => window.scrollTo({ top: 0, behavior: "smooth" }),
    "about-button": () => scrollToElement(".about"),
    "portfolio-button": () => {
        scrollToElement(".portfolio");
        document.querySelector(".portfolio")?.classList.remove("portfolioUnloaded");
    },
    "contact-button": () => scrollToElement(".contact-section")
  };

  Object.keys(mainNavButtons).forEach(id => {
    document.getElementById(id)?.addEventListener("click", (e) => {
        e.preventDefault();
        mainNavButtons[id]();
    });
  });

  document.querySelector(".top-button")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/**
 * 5. ÚVODNÍ ANIMACE (Opacity)
 */
document.addEventListener("DOMContentLoaded", () => {
  const introElements = ["nav", ".hero-section", ".about"];
  introElements.forEach((selector, index) => {
    const el = document.querySelector(selector);
    if (el) {
      setTimeout(() => {
        el.style.opacity = "1";
      }, index * 400);
    }
  });
});

let currentImage = 1;
const maxImages = 6;
 const imgElement = document.getElementById('carusel1');
const imgElement2 = document.getElementById('carusel2');
const imgElement3 = document.getElementById('carusel3');
const imgElement4 = document.getElementById('carusel4');
const imgElement5 = document.getElementById('carusel5');
const imgElement6 = document.getElementById('carusel6');

function rotateImage() {;
    // 2. Krok: Počkáme 500ms (délka animace v CSS), než změníme zdroj
    setTimeout(() => {
        currentImage++;
        if (currentImage > maxImages) {
            currentImage = 1;
        }

        // Změna cesty k obrázku
        imgElement.src = `img/disoa/${currentImage}.jpg`;
        imgElement2.src = `img/wafk/${currentImage}.jpg`;
        imgElement3.src = `img/beauty/${currentImage}.jpg`;
        imgElement4.src = `img/hankwoody/${currentImage}.jpg`;
        imgElement5.src = `img//${currentImage}.jpg`;
        imgElement6.src = `img/volno-cas/${currentImage}.jpg`;


    }, 500); 
}

// Spouštíme každé 4 sekundy (aby byl čas na animaci i prohlédnutí fotky)
setInterval(rotateImage, 4000);

/**
 * 6. OBECNÉ ANIMACE PŘI SCROLLOVÁNÍ
 */
document.addEventListener("DOMContentLoaded", () => {
  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll(".animate-on-scroll").forEach(el => {
    animationObserver.observe(el);
  });
});
