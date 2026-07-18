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
const scrollNav = document.querySelector("nav");
const scrollTopBtn = document.querySelector(".top-button");

window.addEventListener("scroll", () => {
  if (scrollNav) {
    if (window.scrollY > 10) scrollNav.classList.add("scrolled");
    else scrollNav.classList.remove("scrolled");
  }

  if (scrollTopBtn) {
    if (window.scrollY > 100) {
      scrollTopBtn.style.opacity = "1";
      scrollTopBtn.style.pointerEvents = "auto";
    } else {
      scrollTopBtn.style.opacity = "0";
      scrollTopBtn.style.pointerEvents = "none";
    }
  }
});

/**
 * 4. INICIALIZACE A KLIKNUTÍ
 */
window.addEventListener("load", () => {
  // Sledování sekcí pro Scroll Spy
  const sectionsToObserve = document.querySelectorAll(
    ".hero-section, .about, .portfolio, .contact-section"
  );
  sectionsToObserve.forEach((section) => observer.observe(section));

  // --- LOGIKA PŘEPÍNÁNÍ PORTFOLIA (FILTROVÁNÍ) ---
  const portfolioLinks = document.querySelectorAll(".portfolio-link");
  const portfolioItems = document.querySelectorAll(".portfolio-grid .portfolio-item");

  portfolioLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Aktivní vzhled odkazu v portfoliu
      portfolioLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Cílová kategorie z hrefu
      const targetCategory = link.getAttribute("href").substring(1);

      portfolioItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        // CTA karta se zobrazuje vždy
        const shouldShow = (targetCategory === "vse" || itemCategory === targetCategory || itemCategory === "cta");

        if (shouldShow) {
          // Zobrazit: nejprve odebereme display: none class
          item.classList.remove("hidden-item");
          // Poté s malým zpožděním spustíme fade-in a scale
          setTimeout(() => {
            item.classList.remove("faded-out");
          }, 20);
        } else {
          // Skrýt: nejprve spustíme fade-out
          item.classList.add("faded-out");
          // Po dokončení transition (350ms) úplně schováme z layoutu
          setTimeout(() => {
            if (item.classList.contains("faded-out")) {
              item.classList.add("hidden-item");
            }
          }, 350);
        }
      });
      
      console.log("Přepnuto na portfolio kategorii:", targetCategory);
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
 * 5. ÚVODNÍ ANIMACE A INICIALIZACE NOVÝCH PRVKŮ
 */
document.addEventListener("DOMContentLoaded", () => {
  // Animace načtení
  const introElements = ["nav", ".hero-section", ".about"];
  introElements.forEach((selector, index) => {
    const el = document.querySelector(selector);
    if (el) {
      setTimeout(() => {
        el.style.opacity = "1";
      }, index * 400);
    }
  });

  // Inicializace nových interaktivních prvků
  initThemeToggle();
  initTiltEffect();
  initScrollParallax();
});

/**
 * 6. ROTACE OBRÁZKŮ (CAROUSEL) S DEFENSIVNÍ KONTROLOU (OPRAVA CHYBY)
 */
let currentImage = 1;
const maxImages = 6;

const imgElement = document.getElementById('carusel1');
const imgElement2 = document.getElementById('carusel2');
const imgElement3 = document.getElementById('carusel3');
const imgElement4 = document.getElementById('carusel4');
const imgElement5 = document.getElementById('carusel5');
const imgElement6 = document.getElementById('carusel6');

function rotateImage() {
  const imagesToRotate = [
    { element: imgElement, prefix: 'disoa' },
    { element: imgElement2, prefix: 'wafk' },
    { element: imgElement3, prefix: 'beauty' },
    { element: imgElement4, prefix: 'hankwoody' },
    { element: imgElement5, prefix: 'relax_zen' },
    { element: imgElement6, prefix: 'volnocas' }
  ];

  // 1. Nastavíme background-image obalového wrapperu na současný obrázek (před fade-outem)
  imagesToRotate.forEach(item => {
    if (item.element) {
      const wrapper = item.element.parentElement;
      if (wrapper && wrapper.classList.contains('carousel-wrapper')) {
        wrapper.style.backgroundImage = `url('${item.element.src}')`;
      }
      item.element.style.opacity = '0';
    }
  });

  // Zvýšíme index pro další obrázek
  currentImage++;
  if (currentImage > maxImages) {
    currentImage = 1;
  }

  // 2. Změna src a plynulý fade-in
  setTimeout(() => {
    imagesToRotate.forEach(item => {
      if (item.element) {
        item.element.src = `${item.prefix}${currentImage}.jpg`;
        
        // Plynulý návrat opacity na 1 po načtení nového obrázku
        item.element.onload = () => {
          item.element.style.opacity = '1';
        };

        // Pojistka pro případ, že je obrázek v mezipaměti a onload se nespustí
        if (item.element.complete) {
          item.element.style.opacity = '1';
        }
      }
    });
  }, 250);
}

// Spuštění koloběhu obrázků
setInterval(rotateImage, 4000);

/**
 * 7. OBECNÉ ANIMACE PŘI SCROLLOVÁNÍ
 */
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll(".animate-on-scroll").forEach(el => {
  animationObserver.observe(el);
});

/**
 * 8. DETEKCE A PŘEPÍNÁNÍ SVĚTLÉHO/TMAVÉHO REŽIMU
 */
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem("theme");
  // Výchozí motiv je nyní světlý (white)
  const isDark = savedTheme === "dark";

  const setDarkTheme = () => {
    document.documentElement.classList.add("dark-mode");
    document.documentElement.classList.remove("light-mode");
    if (themeIcon) themeIcon.textContent = "light_mode";
  };

  const setLightTheme = () => {
    document.documentElement.classList.add("light-mode");
    document.documentElement.classList.remove("dark-mode");
    if (themeIcon) themeIcon.textContent = "dark_mode";
  };

  if (isDark) setDarkTheme();
  else setLightTheme();

  themeToggle.addEventListener("click", () => {
    const isNowDark = document.documentElement.classList.contains("dark-mode");
    if (isNowDark) {
      setLightTheme();
      localStorage.setItem("theme", "light");
    } else {
      setDarkTheme();
      localStorage.setItem("theme", "dark");
    }
  });
}



/**
 * 10. INTERAKTIVNÍ PARALAXNÍ EFEKT TEXTU V HERO SEKCI
 */
function initScrollParallax() {
  const bgText = document.querySelector(".bgText");
  if (!bgText) return;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY < 800) {
      bgText.style.transform = `translateY(${scrollY * 0.4}px)`;
    }
  });
}

/**
 * 11. INTERAKTIVNÍ 3D TILT EFEKT PRO KARTY A PORTRAIT
 */
function initTiltEffect() {
  const tiltElements = document.querySelectorAll(".portfolio-item, .aboutImg, .contact-form, .billing-card");

  tiltElements.forEach(el => {
    let rect = null;

    // Načteme rozměry pouze při najetí myši (ne při každém pohybu)
    el.addEventListener("mouseenter", () => {
      rect = el.getBoundingClientRect();
    });

    el.addEventListener("mousemove", (e) => {
      if (!rect) {
        rect = el.getBoundingClientRect();
      }
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;

      const rotateX = ((y / height) - 0.5) * -5; // jemný náklon do 5 stupňů
      const rotateY = ((x / width) - 0.5) * 5;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;

      // Vrstvený 3D efekt na vnitřní prvky
      const media = el.querySelector("img, video, iframe");
      const title = el.querySelector("h3");
      const desc = el.querySelector("p");

      if (media) media.style.transform = `translateZ(25px) scale(1.02)`;
      if (title) title.style.transform = `translateZ(40px)`;
      if (desc) desc.style.transform = `translateZ(18px)`;
    });

    el.style.transition = "transform 0.15s ease-out"; // Rychlejší odezva při pohybu

    el.addEventListener("mouseleave", () => {
      rect = null; // Resetujeme rect
      el.style.transition = "transform 0.5s ease-out"; // Hladký návrat
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

      const media = el.querySelector("img, video, iframe");
      const title = el.querySelector("h3");
      const desc = el.querySelector("p");

      if (media) {
        media.style.transition = "transform 0.5s ease-out";
        media.style.transform = `translateZ(0px) scale(1)`;
      }
      if (title) title.style.transform = `translateZ(0px)`;
      if (desc) desc.style.transform = `translateZ(0px)`;
    });
  });
}


