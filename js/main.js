document.addEventListener('DOMContentLoaded', () => {
  // 1. Menú hamburguesa para celulares
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('activo');
    });

    // Cerrar menú al hacer clic en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('activo');
      });
    });
  }

  // 2. Filtro de categorías para Emprendimientos de Vecinos
  const botonesFiltro = document.querySelectorAll('.filtro-btn');
  const tarjetasVecinos = document.querySelectorAll('.card-vecino');

  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
      // Quitar clase activo de todos los botones
      botonesFiltro.forEach(btn => btn.classList.remove('activo'));
      boton.classList.add('activo');

      const categoriaSeleccionada = boton.getAttribute('data-categoria');

      tarjetasVecinos.forEach(tarjeta => {
        const categoriaTarjeta = tarjeta.getAttribute('data-categoria');
        if (categoriaSeleccionada === 'todos' || categoriaSeleccionada === categoriaTarjeta) {
          tarjeta.style.display = 'flex';
        } else {
          tarjeta.style.display = 'none';
        }
      });
    });
  });
  // 3. Carrusel automático en la portada
  const slides = document.querySelectorAll('.hero-slider .slide');
  if (slides.length > 1) {
    let indiceActual = 0;
    setInterval(() => {
      slides[indiceActual].classList.remove('activa');
      indiceActual = (indiceActual + 1) % slides.length;
      slides[indiceActual].classList.add('activa');
    }, 5000);
  }
});
