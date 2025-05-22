document.addEventListener('DOMContentLoaded', () => {
    // Cambio de tema (claro/oscuro)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
  
    function setTheme(isDark) {
      if (isDark) {
        body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
      }
    }
  
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark);
    }
  
    themeToggleBtn.addEventListener('click', () => {
      const isDark = body.classList.contains('dark-theme');
      setTheme(!isDark);
    });
  
    // Carrusel discografía
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const carousel = document.querySelector('.carousel');
    const scrollAmount = 240;
  
    if (prevBtn && nextBtn && carousel) {
      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
  
      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
  
      function updateButtons() {
        prevBtn.disabled = carousel.scrollLeft <= 0;
        nextBtn.disabled = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth;
      }
  
      carousel.addEventListener('scroll', updateButtons);
      window.addEventListener('resize', updateButtons);
      updateButtons();
    }

   const albumModal = document.getElementById("album-modal");
const albumCover = document.getElementById("album-cover");
const albumTitle = document.getElementById("album-title");
const albumInfo = document.getElementById("album-info");
const closeAlbumModal = albumModal.querySelector(".modal-close");

// Datos de álbumes
const albumData = {
    "album-true": {
        cover: "img/true.png",
        title: "True (2013)",
        info: `• Incluye "Wake Me Up", mezcla de EDM y folk.<br>
                • Colaboraciones: Aloe Blacc, Adam Lambert.<br>
                • Considerado uno de los álbumes que modernizó la electrónica comercial.<br>
                • Curiosidad: Grabado entre giras, en habitaciones de hotel.`
    },
    "album-stories": {
        cover: "img/stories.png",
        title: "Stories (2015)",
        info: `• Explora un lado más personal y emotivo de Avicii.<br>
                • Colaboraciones: Chris Martin, Zac Brown.<br>
                • Éxitos: "Waiting for Love", "For a Better Day".`
    },
    "album-tim": {
        cover: "img/tim.jpg",
        title: "Tim (2019)",
        info: `• Publicado tras su fallecimiento.<br>
                • Colaboraciones: Vargas & Lagola, Aloe Blacc.<br>
                • Éxitos: "SOS", "Heaven".`
    },
    "album-avicii01": {
        cover: "img/avicci01.jpg",
        title: "Avīci (01) (2017)",
        info: `• Último EP antes de retirarse.<br>
                • Éxitos: "Without You".<br>
                • Colaboraciones: Sandro Cavazza.`
    }
};


// Abrir modal al hacer clic en un álbum
document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('click', () => {
        const albumId = item.getAttribute("data-album");  // Aquí está la corrección
        const album = albumData[albumId];
        if(album){
            albumCover.src = album.cover;
            albumCover.alt = album.title;
            albumTitle.innerText = album.title;
            albumInfo.innerHTML = album.info;
            albumModal.style.display = 'block';
        }
    });
});


// Cerrar modal al hacer clic en la "X"
closeAlbumModal.addEventListener('click', () => {
    albumModal.style.display = 'none';
    albumModal.setAttribute('aria-hidden', 'true');
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', e => {
    if(e.target === albumModal){
        albumModal.style.display = 'none';
        albumModal.setAttribute('aria-hidden', 'true');
    }
});

const playlist = [
  { title: "Wake Me Up", src: "audio/wake-me-up.mp3" },
  { title: "SOS", src: "audio/sos.mp3" },
  { title: "Waiting for Love", src: "audio/waiting-for-love.mp3" }
];

let currentTrackIndex = 0;
const audio = new Audio();
const trackInfo = document.getElementById("current-track");
const playPauseBtn = document.getElementById("play-pause");
const playPauseIcon = playPauseBtn.querySelector("i");

function loadTrack(index) {
  audio.src = playlist[index].src;
  trackInfo.textContent = playlist[index].title;
  audio.play();
  playPauseIcon.classList.remove("fa-play");
  playPauseIcon.classList.add("fa-pause");
}

// Reproducir siguiente canción al terminar
audio.addEventListener("ended", () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
});

// Play/Pause manual
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseIcon.classList.remove("fa-play");
    playPauseIcon.classList.add("fa-pause");
  } else {
    audio.pause();
    playPauseIcon.classList.remove("fa-pause");
    playPauseIcon.classList.add("fa-play");
  }
});

// Ocultar splash después de 3 segundos
window.addEventListener("load", () => {
  setTimeout(() => {
    closeSplash();
  }, 3000);
});

// Función para cerrar splash y reproducir música
function closeSplash() {
  const splash = document.querySelector(".splash-screen");
  const audio = document.getElementById("avicii-audio");

  if (!splash.classList.contains("hide")) {
    splash.classList.add("hide");
    audio.volume = 0.4;
    audio.play();
  }
}

// Cargar primer track al iniciar
window.addEventListener("load", () => {
  loadTrack(currentTrackIndex);
});



    // Modal para galería de imágenes
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('modal-img');
    const caption = document.getElementById('caption');
    const modalClose = document.querySelector('.modal-close');
  
    if (modal && modalImg && caption && modalClose) {
      document.querySelectorAll('.gallery img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
          modal.style.display = 'block';
          modal.setAttribute('aria-hidden', 'false');
          modalImg.src = img.src;
          modalImg.alt = img.alt;
          caption.textContent = img.alt;
          modalClose.focus();
        });
      });
  
      modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
      });
  
      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
          modal.setAttribute('aria-hidden', 'true');
        }
      });
  
      window.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal.style.display === 'block') {
          modal.style.display = 'none';
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    }
  });
  
