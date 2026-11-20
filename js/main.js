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

  // 4. Reproducir video de La Olla automáticamente al llegar a la sección
  const videoOlla = document.getElementById('video-olla');
  if (videoOlla) {
    const observadorVideo = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          videoOlla.play().catch(() => {});
        } else {
          videoOlla.pause();
        }
      });
    }, { threshold: 0.4 });

    observadorVideo.observe(videoOlla);
  }

// Visor en grande al hacer clic en las fotos de las crónicas
  const fotosGaleria = Array.from(document.querySelectorAll('.galeria-cronica img'));
  if (fotosGaleria.length > 0) {
    let indiceFoto = 0;

    const visor = document.createElement('div');
    visor.style.cssText = 'display:none; position:fixed; inset:0; background:rgba(0,0,0,0.92); z-index:2000; align-items:center; justify-content:center; padding:1rem;';
    visor.innerHTML = `
      <button id="visor-cerrar" style="position:absolute; top:18px; right:24px; background:none; border:none; color:#fcbf49; font-size:2.4rem; cursor:pointer;">✕</button>
      <button id="visor-prev" style="position:absolute; left:16px; background:rgba(0,0,0,0.5); border:2px solid #fcbf49; color:#fff; font-size:1.8rem; padding:0.3rem 0.8rem; border-radius:8px; cursor:pointer;">‹</button>
      <img id="visor-img" style="max-width:90%; max-height:85vh; border-radius:10px; border:3px solid #fcbf49; object-fit:contain;">
      <button id="visor-next" style="position:absolute; right:16px; background:rgba(0,0,0,0.5); border:2px solid #fcbf49; color:#fff; font-size:1.8rem; padding:0.3rem 0.8rem; border-radius:8px; cursor:pointer;">›</button>
    `;
    document.body.appendChild(visor);

    const imgVisor = visor.querySelector('#visor-img');
    const mostrarFoto = (i) => {
      indiceFoto = (i + fotosGaleria.length) % fotosGaleria.length;
      imgVisor.src = fotosGaleria[indiceFoto].src;
      visor.style.display = 'flex';
    };

    fotosGaleria.forEach((foto, idx) => {
      foto.style.cursor = 'pointer';
      foto.addEventListener('click', () => mostrarFoto(idx));
    });

    visor.querySelector('#visor-cerrar').addEventListener('click', () => visor.style.display = 'none');
    visor.querySelector('#visor-prev').addEventListener('click', () => mostrarFoto(indiceFoto - 1));
    visor.querySelector('#visor-next').addEventListener('click', () => mostrarFoto(indiceFoto + 1));
    visor.addEventListener('click', (e) => { if (e.target === visor) visor.style.display = 'none'; });
  }
  
});
