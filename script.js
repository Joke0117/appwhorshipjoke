// Objeto para almacenar y precargar los sonidos de cada nota
const sounds = {
    "G": new Howl({ src: ['sounds/G.mp3'], loop: true, preload: true, html5: true }),
    "G#": new Howl({ src: ['sounds/G%23.mp3'], loop: true, preload: true, html5: true }),
    "A": new Howl({ src: ['sounds/A.mp3'], loop: true, preload: true, html5: true }),
    "A#": new Howl({ src: ['sounds/A%23.mp3'], loop: true, preload: true, html5: true }),
    "B": new Howl({ src: ['sounds/B.mp3'], loop: true, preload: true, html5: true }),
    "C": new Howl({ src: ['sounds/C.mp3'], loop: true, preload: true, html5: true }),
    "C#": new Howl({ src: ['sounds/C%23.mp3'], loop: true, preload: true, html5: true }),
    "D": new Howl({ src: ['sounds/D.mp3'], loop: true, preload: true, html5: true }),
    "D#": new Howl({ src: ['sounds/D%23.mp3'], loop: true, preload: true, html5: true }),
    "E": new Howl({ src: ['sounds/E.mp3'], loop: true, preload: true, html5: true }),
    "F": new Howl({ src: ['sounds/F.mp3'], loop: true, preload: true, html5: true }),
    "F#": new Howl({ src: ['sounds/F%23.mp3'], loop: true, preload: true, html5: true })
};


// Variable para almacenar la nota actual en reproducción
let currentNote = null;

// Función para reproducir o detener sonido de nota
function playSound(note) {
    if (currentNote === note) {
        // Si la nota actual es la misma que la presionada, detener el sonido
        sounds[note].stop();
        currentNote = null; // Resetear la nota actual
    } else {
        // Detener el sonido actual solo si hay una nota activa
        if (currentNote && sounds[currentNote].playing()) {
            sounds[currentNote].stop();
        }
        // Reproducir la nueva nota
        sounds[note].play();
        currentNote = note; // Actualizar la nota actual
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
