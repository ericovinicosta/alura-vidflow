const containerVideos = document.querySelector('.videos__container');
const barraDePesquisa = document.querySelector('.pesquisar__input');
const botaoCategoria = document.querySelectorAll('.superior__item');

/*função asincrona para mostrar os videos do json*/
async function buscarEMostrarVideos() {
    try {
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();
        // .then(res => res.json())
        // .then((videos) => {
        videos.forEach((video) => {
            if (video.categoria === ''){
                throw new Error(`${video.id} - ${video.url}: Vídeo não foi categorizado`);
            }
            containerVideos.innerHTML += `
               <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <p class="categoria" hidden>${video.categoria}</p>
                <div class="descricao-video">
                    <img src="${video.imagem}" alt="Logo do Canal" class="img-canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                </div>
               </li>
            `;
        })
        /* })
        .catch((error) => {
            containerVideos.innerHTML = `<p> Houve um erro ao carregar os videos: ${error} </p>`;
        })*/
    } catch (error) {
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os videos: ${error} </p>`;
    } /*finally {
        alert('Isso sempre acontece!')
    }*/
}

const filtraPesquisa = () => {
    const videos = document.querySelectorAll('.videos__item');

    if(barraDePesquisa.value !== ''){

        videos.forEach(video => {
            let titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
            let valorFiltro = barraDePesquisa.value.toLowerCase();
            /*if(!titulo.includes(valorFiltro)){

                video.style.display = 'none';
            } else{
                video.style.display = 'block';
            }*/
            video.style.display = titulo.includes(valorFiltro) ? 'block' : 'none';
        });
    }
}

const filtraPorCategoria = (nomeDaCategoria) => {
    const videos = document.querySelectorAll('.videos__item');
    videos.forEach( video => {
        let categoria = video.querySelector('.categoria').textContent.toLowerCase();
        video.style.display = categoria.includes(nomeDaCategoria) || nomeDaCategoria === 'tudo' ? 'block' : 'none';
    });
}

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name').toLowerCase();
    botao.addEventListener('click',() => filtraPorCategoria(nomeCategoria));
});

barraDePesquisa.addEventListener('input', filtraPesquisa);

buscarEMostrarVideos();
