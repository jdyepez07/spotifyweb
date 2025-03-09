let player;
let isPlaying = false;
const videos = [
    { id: 'M7lc1UVf-VE', title: 'Video de prueba', description: 'Descripcion de video de prueba' },
    { id: 'K4TOrB7at0Y', title: 'Explorando el espacio', description: 'Como explorar el espacio en un taxi' },
    { id: '3JZ_D3ELwOQ', title: 'Cómo aprender JavaScript', description: 'Enseñamos javascript a estudiantes de arquitectura' },
    { id: 'oMvVOMwr6o8', title: 'Parta y la choke', description: 'que la parta y la chokeeeeeeeeeeeeeeeeeee' },
    { id: 'ydBVxOmFqVA', title: 'Cuando te veo', description: 'Cuando te veo, ohhhhhhhhhh' }
];

// Cargar la API de YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videos[0].id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            autoplay: 1,
            controls: 2,
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
    generarCarruselVideos();
}

// Generar la lista de videos
function generarCarruselVideos() {
    const videoListContainer = document.querySelector('.carousel-inner');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    videoListContainer.innerHTML = ''; // Limpia el contenido previo
    indicatorsContainer.innerHTML = ''; // Limpia indicadores previos

    videos.forEach((video, index) => {
        // Crear el item del carrusel
        const divItemOne = document.createElement('div');
        divItemOne.classList.add('carousel-item');
        if (index === 0) divItemOne.classList.add('active'); // Primer item activo

        // Imagen miniatura del video
        const thumbnail = document.createElement('img');
        thumbnail.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
        thumbnail.alt = video.title;
        thumbnail.classList.add('d-block', 'w-100');

        // Contenedor de texto
        const divItemTwo = document.createElement('div');
        divItemTwo.classList.add('carousel-caption', 'd-none', 'd-md-block');

        // Título
        const titleItem = document.createElement('h5');
        titleItem.classList.add('video-title');
        titleItem.textContent = video.title;

        // Descripción
        const descrItem = document.createElement('p');
        descrItem.classList.add('video-description');
        descrItem.textContent = video.description;

        // Agregar elementos al DOM
        divItemTwo.appendChild(titleItem);
        divItemTwo.appendChild(descrItem);
        divItemOne.appendChild(thumbnail);
        divItemOne.appendChild(divItemTwo);
        videoListContainer.appendChild(divItemOne);

        // Crear y agregar indicador del carrusel
        const indicator = document.createElement('button');
        indicator.type = "button";
        indicator.setAttribute("data-bs-target", "#carouselExampleCaptions");
        indicator.setAttribute("data-bs-slide-to", index);
        indicator.setAttribute("aria-label", `Slide ${index + 1}`);
        if (index === 0) {
            indicator.classList.add('active');
            indicator.setAttribute("aria-current", "true");
        }
        indicatorsContainer.appendChild(indicator);

        // Evento para cargar el video cuando se haga clic en el título o descripción
        thumbnail.addEventListener('click', () => cargarVideo(video.id));
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

function seekToSecond(seconds, option) {
    let new_time;
    if (option == 1) {
        new_time = player.getCurrentTime() - seconds;
    } else {
        new_time = player.getCurrentTime() + seconds;
    }
    player.seekTo(new_time, true);
}

function changeVideo(option) {
    let video_id = player.getVideoData().video_id;
    let posicion = videos.findIndex(obj => obj.id === video_id);
    let new_pos = posicion + (option === 2 ? 1 : -1);

    if (new_pos >= 0 && new_pos < videos.length) {
        let new_id = videos[new_pos].id;
        player.loadVideoById(new_id);
        document.getElementById("tituloVideo").innerText = videos[new_pos].title;
        document.getElementById("descripcionVideo").innerText = videos[new_pos].description;
    }
}

function activarTitulo(elemento) {
    let tituloActual = elemento.innerText;
    document.getElementById("tituloVideos").innerText = tituloActual;
}

function toggleMenu() {
    const navbarMenu = document.getElementById('navbarMenu');
    const sidebarMenu = document.getElementById('sidebarMenu');
    navbarMenu.classList.toggle('is-active');
    sidebarMenu.classList.toggle('is-active');
}

document.addEventListener('DOMContentLoaded', function () {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.menu');

    navbarToggle.addEventListener('click', function () {
        menu.classList.toggle('is-active');
    });
});