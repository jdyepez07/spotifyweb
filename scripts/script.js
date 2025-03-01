let player; // Variable global para el reproductor
const videos = [
    { id: 'M7lc1UVf-VE', title: 'Video de prueba', description: 'Descripcion de video de prueba'},
    { id: 'K4TOrB7at0Y', title: 'Explorando el espacio', description: 'Como explorar el espacio en un taxi' },
    { id: '3JZ_D3ELwOQ', title: 'Cómo aprender JavaScript', description: 'Enseñamos javascript a estudiantes de arquitectura' },
    { id: 'oMvVOMwr6o8', title: 'Parta y la choke', description: 'que la parta y la chokeeeeeeeeeeeeeeeeeee' },
    { id: 'ILIHH8I8aCA', title: 'Cuando te veo', description: 'Cuando te veo, ohhhhhhhhhh' }
];

// Cargar la API de YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videos[0].id, // Primer video por defecto
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            autoplay: 1,  // 1 para autoplay
            controls: 1,  // Mostrar controles
        }
    });
    
    document.getElementById("playPauseBtn").addEventListener("click", togglePlayPause);
    document.getElementById("tituloVideo").innerText = videos[0].title;
    document.getElementById("descripcionVideo").innerText = videos[0].description;
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        document.getElementById("playPauseBtn").innerText = "⏸️"; // Cambia icono a pausa
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.UNSTARTED) {
        isPlaying = false;
        document.getElementById("playPauseBtn").innerText = "▶️"; // Cambia icono a play
    }
}

function togglePlayPause() {
    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

function onPlayerReady(event) {
    generarListaVideos();
}

// Generar la lista de videos
function generarListaVideos() {
    const videoListContainer = document.getElementById('video-list');
    videoListContainer.innerHTML = ''; // Limpia la lista antes de agregar nuevos videos

    videos.forEach(video => {
        const listItem = document.createElement('li');

        // Crear imagen de miniatura
        const thumbnail = document.createElement('img');
        thumbnail.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
        thumbnail.alt = video.title;
        thumbnail.classList.add('thumbnail');

        // Agregar evento de clic para cargar el video
        listItem.addEventListener('click', () => cargarVideo(video.id));

        // Agregar la miniatura al elemento de lista
        listItem.appendChild(thumbnail);
        videoListContainer.appendChild(listItem);
    });
}


// Cambiar el video en el reproductor
function cargarVideo(videoId) {
    player.loadVideoById(videoId);
    let posicion = videos.findIndex(obj => obj.id === videoId)
    document.getElementById("tituloVideo").innerText = videos[posicion].title;
    document.getElementById("descripcionVideo").innerText = videos[posicion].description;
}

function playVideo() {
    player.playVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

function stopVideo() {
    player.stopVideo();
}

function getCurrentTime() {
    alert("Tiempo actual: " + player.getCurrentTime() + " segundos");
}

function seekToSecond() {
    player.seekTo(player.getCurrentTime() + 30, true);
}

function changeVideo(option) {
    let new_id = ""
    
    video_id = player.getVideoData().video_id;
    const posicion = videos.findIndex(obj => obj.id === video_id);

    if (option == 2){
        new_id = videos[posicion+1].id
    } else if (option == 1) {
        new_id = videos[posicion-1].id
    }
    
    player.loadVideoById(new_id);
}

function activarTitulo(elemento) {
    let tituloActual = elemento.innerText;
    document.getElementById("tituloVideos"). innerText = tituloActual;
}