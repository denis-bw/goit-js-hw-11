import APIservice from "./js/api";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import "./sass/index.scss";

const formRef = document.querySelector('.search-form')
const divRef = document.querySelector('.gallery')
// const inputRef = document.querySelector('form.search-form input')
const btnLoadMoreRef = document.querySelector('.load-more')


formRef.addEventListener('submit', searchImg);
btnLoadMoreRef.addEventListener('click', onLoadMore);

const newsAPIservice = new APIservice();

if (newsAPIservice.query === '') {
        btnLoadMoreRef.hidden = true;
}
else {
    btnLoadMoreRef.hidden = false;
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    alertError: false,
});

 function searchImg(e) {
    e.preventDefault();
    
    newsAPIservice.query = e.currentTarget.elements.searchQuery.value;

    if (newsAPIservice.query === '') {
        return Notiflix.Notify.failure('Nothing entered in the search box.');
    };
     
     
    btnLoadMoreRef.classList.remove('load-more-hiden')
    newsAPIservice.resetPage();

    try {
         newsAPIservice.fetchCards().then(data => {
                ClearCardsContent();
                createCards(data)
             
        })
    } catch {
        Notiflix.Notify.failure('server error');
     }
     
}

async function onLoadMore() { 
    const data = await newsAPIservice.fetchCards(); 
    createCards(data.hits)
}



function createCards(data) {

        if (data.hits.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            btnLoadMoreRef.classList.add('load-more-hiden');
            return;
    }
        console.log(data)

        Notiflix.Notify.success(`'Hooray! We found ${data.totalHits} images.'`);

        if (newsAPIservice.page >= data.totalHits) {
            Notiflix.Notify.failure('We`re sorry but you`ve reached the end of search results');
            btnLoadMoreRef.hidden = true;
        }

    
    const markupCards = data.hits.map(element => {

        return `<a class="gallery__item" href="${element.largeImageURL}">
                    <div class="photo-card">
                        <img width="350px height="400" src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
                        <div class="info">
                            <p class="info-item">
                             <b>Likes ${element.likes}</b>
                             </p>
                             <p class="info-item">
                             <b>Views ${element.views}</b>
                             </p>
                             <p class="info-item">
                             <b>Comments ${element.comments}</b>
                             </p>
                             <p class="info-item">
                            <b>Downloads ${element.downloads}</b>
                           </p>
                        </div>
                     </div>
                </a>`
    }).join('');

    new SimpleLightbox('.gallery a', {
        captionDelay: 250,
    })
    
    divRef.insertAdjacentHTML('beforeend', markupCards);
    lightbox.refresh();
}

function ClearCardsContent() {
    divRef.innerHTML = '';
}



// `<a class="gallery__item" href="${element.largeImageURL}">
//                     <div class="photo-card">
//                         <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
//                         <div class="info">
//                             <p class="info-item">
//                             <b>Likes ${element.likes}</b>
//                             </p>
//                             <p class="info-item">
//                             <b>Views ${element.views}</b>
//                             </p>
//                             <p class="info-item">
//                             <b>Comments ${element.comments}</b>
//                             </p>
//                             <p class="info-item">
//                             <b>Downloads ${element.downloads}</b>
//                             </p>
//                         </div>
//                     </div>
//                 </a>`