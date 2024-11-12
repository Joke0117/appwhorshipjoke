// Objeto para almacenar y precargar los sonidos de cada nota, incluyendo menores
const sounds = {
    "G": new Howl({ src: ['sounds/G.mp3'], loop: true, preload: true, html5: true }),
    "G#": new Howl({ src: ['sounds/G_3.mp3'], loop: true, preload: true, html5: true }),
    "A": new Howl({ src: ['sounds/A.mp3'], loop: true, preload: true, html5: true }),
    "A#": new Howl({ src: ['sounds/A_3.mp3'], loop: true, preload: true, html5: true }),
    "B": new Howl({ src: ['sounds/B.mp3'], loop: true, preload: true, html5: true }),
    "C": new Howl({ src: ['sounds/C.mp3'], loop: true, preload: true, html5: true }),
    "C#": new Howl({ src: ['sounds/C_3.mp3'], loop: true, preload: true, html5: true }),
    "D": new Howl({ src: ['sounds/D.mp3'], loop: true, preload: true, html5: true }),
    "D#": new Howl({ src: ['sounds/D_3.mp3'], loop: true, preload: true, html5: true }),
    "E": new Howl({ src: ['sounds/E.mp3'], loop: true, preload: true, html5: true }),
    "F": new Howl({ src: ['sounds/F.mp3'], loop: true, preload: true, html5: true }),
    "F#": new Howl({ src: ['sounds/F_3.mp3'], loop: true, preload: true, html5: true }),
    // Sonidos menores
    "Gm": new Howl({ src: ['sounds/Gm.mp3'], loop: true, preload: true, html5: true }),
    "G#m": new Howl({ src: ['sounds/Gm_3.mp3'], loop: true, preload: true, html5: true }),
    "Am": new Howl({ src: ['sounds/Am.mp3'], loop: true, preload: true, html5: true }),
    "A#m": new Howl({ src: ['sounds/Am_3.mp3'], loop: true, preload: true, html5: true }),
    "Bm": new Howl({ src: ['sounds/Bm.mp3'], loop: true, preload: true, html5: true }),
    "Cm": new Howl({ src: ['sounds/Cm.mp3'], loop: true, preload: true, html5: true }),
    "C#m": new Howl({ src: ['sounds/Cm_3.mp3'], loop: true, preload: true, html5: true }),
    "Dm": new Howl({ src: ['sounds/Dm.mp3'], loop: true, preload: true, html5: true }),
    "D#m": new Howl({ src: ['sounds/Dm_3.mp3'], loop: true, preload: true, html5: true }),
    "Em": new Howl({ src: ['sounds/Em.mp3'], loop: true, preload: true, html5: true }),
    "Fm": new Howl({ src: ['sounds/Fm.mp3'], loop: true, preload: true, html5: true }),
    "F#m": new Howl({ src: ['sounds/Fm_3.mp3'], loop: true, preload: true, html5: true })
};

const buttons = document.querySelectorAll('.footer .tabs button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Elimina la clase 'active' de todos los botones
        buttons.forEach(btn => btn.classList.remove('active'));
        // Añade la clase 'active' al botón clickeado
        button.classList.add('active');
    });
});


// Variable para almacenar la nota actual en reproducción
let currentNote = null;

// Función para reproducir o detener sonido de nota
function playSound(note) {
    const title = document.querySelector('.navbar'); // Elemento del título en el navbar

    if (currentNote === note) {
        // Si la nota actual es la misma que la presionada, detener el sonido
        sounds[note].stop();
        currentNote = null; // Resetear la nota actual
        title.textContent = "Mi Piano"; // Volver a mostrar el título original en el navbar
    } else {
        // Detener el sonido actual solo si hay una nota activa
        if (currentNote && sounds[currentNote].playing()) {
            sounds[currentNote].stop();
        }
        // Reproducir la nueva nota
        sounds[note].play();
        currentNote = note; // Actualizar la nota actual
        title.textContent = `Nota: ${note}`; // Cambiar el título en el navbar al nombre de la nota
    }
}

// Control de visibilidad para reanudar el sonido si se cambia de pestaña
document.addEventListener("visibilitychange", () => {
    if (!document.hidden && currentNote) {
        // Reanudar la nota actual si la pestaña vuelve a ser visible
        if (!sounds[currentNote].playing()) {
            sounds[currentNote].play();
        }
    }
});

// Función para mostrar el tab seleccionado y ocultar los demás
function showTab(tabId) {
    // Ocultar todos los tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';  // Esconde todas las pestañas
    });

    // Mostrar solo el tab seleccionado
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = 'block';  // Muestra la pestaña seleccionada
    }

    // Ocultar todos los botones de notas
    const allButtons = document.querySelectorAll('.pad-buttons');
    allButtons.forEach(buttonGroup => {
        buttonGroup.style.display = 'none';  // Esconde los botones de notas
    });

    // Mostrar los botones solo para el tab seleccionado
    if (tabId === 'mayores') {
        document.querySelector('#mayores .pad-buttons').style.display = 'grid';  // Muestra los botones de notas mayores
    } else if (tabId === 'menores') {
        document.querySelector('#menores .pad-buttons').style.display = 'grid';  // Muestra los botones de notas menores
    }
}

// Aseguramos que la primera pestaña (Mayores) se muestre por defecto
document.addEventListener('DOMContentLoaded', () => {
    showTab('mayores');  // Muestra la pestaña de notas mayores por defecto al cargar la página
});
