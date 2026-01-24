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

// Tento kód vlož na konec svého HTML před </body>
document.addEventListener('DOMContentLoaded', () => {
   const navbar = document.querySelector('nav');
   navbar.style.opacity = '1';

   setTimeout(() => {
        if (navbar) {
            navbar.classList.add('is-visible');
            console.log("Animace spuštěna"); // Kontrola v konzoli (F12)
        }
    }, 100);
});