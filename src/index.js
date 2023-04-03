// import api from "./js/api.js";
import APIservice from "./js/api";
import Notiflix from 'notiflix';

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


 function searchImg(e) {
    e.preventDefault();
    
    newsAPIservice.query = e.currentTarget.elements.searchQuery.value;

    if (newsAPIservice.query === '') {
        return Notiflix.Notify.failure('Nothing entered in the search box.');
    };

    btnLoadMoreRef.hidden = false;
    newsAPIservice.resetPage();

    try {
         newsAPIservice.fetchCards().then(data => {
         
                ClearCardsContent();
                createCards(data.hits)
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

        // if (!data.hits.length) {
        //     return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        // }
        // if (newsAPIservice.page >= data.totalHits) {
        //     Notiflix.Notify.failure('We`re sorry but you`ve reached the end of search results');
        //     btnLoadMoreRef.hidden = true;
        // }

    
    const markupCards = data.map(element => {
        
        return `<div class="photo-card">
                <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
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
                </div>`
    }).join();

     divRef.insertAdjacentHTML('beforeend', markupCards );
}

function ClearCardsContent() {
    divRef.innerHTML = '';
}

