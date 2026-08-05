/**
 * 1. SCROLL SPY - Detection of visible sections for main navigation
 */
const observerOptions = {
  root: null,
  threshold: 0.3, // Activates when 30% of the section is visible
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionClass = entry.target.className;
      const sectionId = entry.target.id;
      
      const portfolioParent = document.querySelector(".portfolio-section");

      // Set active link in nav
      let activeId = "";
      if (sectionId === "domu") activeId = "home-button";
      if (sectionId === "o-mne") activeId = "about-button";
      if (sectionId === "portfolio") activeId = "portfolio-button";
      if (sectionId === "kontakt") activeId = "contact-button";

      if (activeId) {
        setActiveLink(activeId);
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

/**
 * 2. HELPERS
 */
const setActiveLink = (activeButtonId) => {
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.classList.toggle("active-link", link.id === activeButtonId);
  });
};

const scrollToElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    const headerOffset = 72;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};

/**
 * 3. STICKY NAV & SCROLL EFFECTS
 */
const scrollNav = document.querySelector("nav");
const scrollTopBtn = document.querySelector(".top-button");

window.addEventListener("scroll", () => {
  if (scrollNav) {
    if (window.scrollY > 20) scrollNav.classList.add("scrolled");
    else scrollNav.classList.remove("scrolled");
  }

  if (scrollTopBtn) {
    if (window.scrollY > 300) {
      scrollTopBtn.style.opacity = "1";
      scrollTopBtn.style.pointerEvents = "auto";
    } else {
      scrollTopBtn.style.opacity = "0";
      scrollTopBtn.style.pointerEvents = "none";
    }
  }
});

/**
 * 4. INITIALIZATION & HANDLERS
 */
window.addEventListener("load", () => {
  // Observe sections
  const sectionsToObserve = document.querySelectorAll(
    "section[id]"
  );
  sectionsToObserve.forEach((section) => observer.observe(section));

  // --- PORTFOLIO FILTER LOGIC ---
  const filterButtons = document.querySelectorAll(".portfolio-filter-btn");
  const categoryCards = document.querySelectorAll(".category-card");
  const portfolioItems = document.querySelectorAll(".portfolio-grid .portfolio-item");

  const runFilter = (category) => {
    // Update active class on filter buttons
    filterButtons.forEach((btn) => {
      const btnFilter = btn.getAttribute("data-filter");
      btn.classList.toggle("active", btnFilter === category);
    });

    // Hide/show portfolio items
    portfolioItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      const shouldShow = (category === "vse" || itemCategory === category || itemCategory === "cta");

      if (shouldShow) {
        item.classList.remove("hidden-item");
        setTimeout(() => {
          item.classList.remove("faded-out");
        }, 20);
      } else {
        item.classList.add("faded-out");
        setTimeout(() => {
          if (item.classList.contains("faded-out")) {
            item.classList.add("hidden-item");
          }
        }, 300);
      }
    });
  };

  // Filter Button click handlers
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-filter");
      runFilter(category);
    });
  });

  // Category Card click handlers
  categoryCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const targetCategory = card.getAttribute("data-target-filter");
      runFilter(targetCategory);
      
      // Scroll to filter bar smoothly
      scrollToElement(".portfolio-filter-bar");
    });
  });

  // --- TECH SWITCHER LOGIC ---
  const techTabs = document.querySelectorAll(".tech-tab");
  const techPanes = document.querySelectorAll(".tech-pane");

  techTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.getAttribute("data-tab");

      // Update active tab button
      techTabs.forEach((t) => t.classList.toggle("active", t === tab));

      // Update active pane
      techPanes.forEach((pane) => {
        const paneName = pane.getAttribute("data-pane");
        pane.classList.toggle("active", paneName === targetTab);
      });
    });
  });

  // --- MAIN NAVIGATION ---
  const navMap = {
    "home-button": "#domu",
    "about-button": "#o-mne",
    "portfolio-button": "#portfolio",
    "contact-button": "#kontakt"
  };

  Object.keys(navMap).forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToElement(navMap[id]);
      });
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

/**
 * 5. INITIALIZE TRANSITIONS ON DOM CONTENT LOAD
 */
document.addEventListener("DOMContentLoaded", () => {
  // Reveal elements on load
  const introSelectors = ["nav", ".hero-section", ".about-section"];
  introSelectors.forEach((sel, idx) => {
    const el = document.querySelector(sel);
    if (el) {
      setTimeout(() => {
        el.style.opacity = "1";
      }, idx * 250);
    }
  });

  initThemeToggle();
  initTiltEffect();
  initScrollParallax();
});

/**
 * 6. IMAGE CAROUSEL FOR FOTO ALBUMS
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

  imagesToRotate.forEach(item => {
    if (item.element) {
      const wrapper = item.element.parentElement;
      if (wrapper && wrapper.classList.contains('carousel-wrapper')) {
        wrapper.style.backgroundImage = `url('${item.element.src}')`;
      }
      item.element.style.opacity = '0';
    }
  });

  currentImage++;
  if (currentImage > maxImages) {
    currentImage = 1;
  }

  setTimeout(() => {
    imagesToRotate.forEach(item => {
      if (item.element) {
        item.element.src = `${item.prefix}${currentImage}.jpg`;
        
        item.element.onload = () => {
          item.element.style.opacity = '1';
        };

        if (item.element.complete) {
          item.element.style.opacity = '1';
        }
      }
    });
  }, 200);
}

setInterval(rotateImage, 4000);

/**
 * 7. SCROLL OBSERVER FOR FADE-IN SECTIONS
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
 * 8. LIGHT/DARK THEME TOGGLE
 */
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem("theme") || "dark";
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
 * 9. INTERACTIVE HERO PARALLAX TEXT
 */
function initScrollParallax() {
  const bgText = document.querySelector(".hero-bg-text");
  if (!bgText) return;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY < 800) {
      bgText.style.transform = `translateY(${scrollY * 0.35}px)`;
    }
  });
}

/**
 * 10. 3D TILT EFFECT
 */
function initTiltEffect() {
  const tiltElements = document.querySelectorAll(".portfolio-item, .category-card, .hero-image-wrapper, .about-image-wrapper, .contact-form, .billing-card");

  tiltElements.forEach(el => {
    let rect = null;

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

      const rotateX = ((y / height) - 0.5) * -8; // Slightly stronger tilt for premium feel
      const rotateY = ((x / width) - 0.5) * 8;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      const media = el.querySelector("img, video, iframe, .category-card-bg");
      const title = el.querySelector("h3, .category-card-title");
      const desc = el.querySelector("p, .category-card-desc");

      if (media) media.style.transform = `translateZ(20px) scale(1.02)`;
      if (title) title.style.transform = `translateZ(35px)`;
      if (desc) desc.style.transform = `translateZ(15px)`;
    });

    el.style.transition = "transform 0.15s ease-out";

    el.addEventListener("mouseleave", () => {
      rect = null;
      el.style.transition = "transform 0.5s ease-out";
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

      const media = el.querySelector("img, video, iframe, .category-card-bg");
      const title = el.querySelector("h3, .category-card-title");
      const desc = el.querySelector("p, .category-card-desc");

      if (media) {
        media.style.transition = "transform 0.5s ease-out";
        media.style.transform = `translateZ(0px) scale(1)`;
      }
      if (title) title.style.transform = `translateZ(0px)`;
      if (desc) desc.style.transform = `translateZ(0px)`;
    });
  });
}
