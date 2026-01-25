// Sledujeme pohyb kolečka/scrollu
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  
  // Pokud je stránka odscrollovaná o víc než 10px
  if (window.scrollY > 10) {
    nav.classList.add('scrolled'); // Přidá třídu se stínem
  } else {
    nav.classList.remove('scrolled'); // Na začátku stránky stín zmizí
  }
});

window.addEventListener('scroll', () => {
    const top = document.querySelector('.top-button');
    if (window.scrollY > 100) {
        top.style.opacity = '1';
    } else if (window.scrollY > 80) {
    top.style.opacity = '0.5';
    }
    else {
        top.style.opacity = '0';
    }
});

window.addEventListener('load', () => {
    const top = document.querySelector('.top-button');
    top.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}); 

document.addEventListener('DOMContentLoaded', () => {
   const navbar = document.querySelector('nav');
   const heroSection = document.querySelector('.hero-section');
   const about = document.querySelector('.about');

   // 1. Navigace se objeví okamžitě po načtení
   navbar.style.opacity = '1';

   // 2. Hero sekce se objeví s prodlevou (např. 500ms = půl sekundy)
   setTimeout(() => {
       heroSection.style.opacity = '1';
   }, 400); // Tady můžeš změnit číslo pro delší/kratší čekání

    setTimeout(() => {
       about.style.opacity = '1';
   }, 800); // Tady můžeš změnit číslo pro delší/kratší čekání
});