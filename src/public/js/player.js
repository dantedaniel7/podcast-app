const socket = io();
const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('playButton');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const podcastTitle = document.getElementById('podcastTitle');
const podcastDescription = document.getElementById('podcastDescription');
const listenersCount = document.getElementById('listenersCount');
const errorMessage = document.getElementById('errorMessage');

let isPlaying = false;
let streamLive = false;

// Manejar el botón de reproducción
playButton.addEventListener('click', () => {
    if (!streamLive) {
        showError('No hay transmisión en vivo en este momento');
        return;
    }

    if (isPlaying) {
        audioPlayer.pause();
        playButton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            Reproducir
        `;
        isPlaying = false;
    } else {
        audioPlayer.play().catch(error => {
            console.error('Error al reproducir:', error);
            showError('Error al reproducir el stream');
        });
    }
});

// Eventos del reproductor de audio
audioPlayer.addEventListener('play', () => {
    isPlaying = true;
    playButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
        Pausar
    `;
});

audioPlayer.addEventListener('pause', () => {
    isPlaying = false;
    playButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
        </svg>
        Reproducir
    `;
});

audioPlayer.addEventListener('error', (e) => {
    console.error('Error en el reproductor:', e);
    showError('Error al cargar el stream');
    updateStreamStatus(false);
});

// Socket.IO eventos
socket.on('stream-status', (status) => {
    streamLive = status.isLive;
    updateStreamStatus(status.isLive);
    updateStreamInfo(status.title, status.description);
});

socket.on('listeners-update', (count) => {
    listenersCount.textContent = count;
});

// Funciones auxiliares
function updateStreamStatus(isLive) {
    if (isLive) {
        statusDot.classList.add('live');
        statusText.textContent = 'En vivo';
        errorMessage.style.display = 'none';
        playButton.disabled = false;
    } else {
        statusDot.classList.remove('live');
        statusText.textContent = 'Sin conexión';
        playButton.disabled = true;
        if (isPlaying) {
            audioPlayer.pause();
        }
    }
}

function updateStreamInfo(title, description) {
    podcastTitle.textContent = title || 'Podcast en Vivo';
    podcastDescription.textContent = description || 'Bienvenido a nuestra transmisión';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Intentar reconectar si se pierde la conexión
let reconnectInterval;
socket.on('disconnect', () => {
    updateStreamStatus(false);
    statusText.textContent = 'Reconectando...';
});

socket.on('connect', () => {
    statusText.textContent = 'Conectado';
    if (reconnectInterval) {
        clearInterval(reconnectInterval);
    }
});