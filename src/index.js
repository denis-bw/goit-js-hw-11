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
    if (newsAPIservice.query === '') return;
    btnLoadMoreRef.hidden = false;
    newsAPIservice.resetPage();
    newsAPIservice.fetchCards().then(data => {
        
           
                if (data.hits.length === 0) {
                    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                    return;
                }
                
                const markupCards = createCards(data.hits)
                ClearCardsContent();
                CreateMarkupCards(markupCards)
    }).finally(
        e.currentTarget.elements.searchQuery.value =''
    )
}

    
function onLoadMore() { 
    newsAPIservice.fetchCards().then(data => {
                
                if (data.hits.length === 0) {
                    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                    return;
                }
                
        
                const markupCards = createCards(data.hits)
                CreateMarkupCards(markupCards)
    }); 
}

function CreateMarkupCards(markupCards) { 
    divRef.insertAdjacentHTML('beforeend', markupCards );
}

function createCards(array) {
        
    return array.map(element => {
        
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
}

function ClearCardsContent() {
    divRef.innerHTML = '';
}

