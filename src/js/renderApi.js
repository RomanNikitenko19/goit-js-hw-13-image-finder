import apiService from './apiService.js';
import template from '../template/template.hbs';
import refs from './refs.js';
import debounce from 'lodash.debounce';

refs.form.addEventListener(
     'input',
     debounce(event => {
          event.preventDefault();
          // console.dir(event.target.value)
          apiService.query = event.target.value;
          renderApi();
          refs.input.value = '';
     }, 500),
);

// apiService.fetchImages().then(({ hits }) => console.log(hits));

function renderApi() {
     apiService.fetchImages().then(({ hits }) => renderImages(hits));
}

const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load more ...';
loadMoreBtn.classList.add('loadMore-button');

function renderImages(data) {
     const items = template(data);
     refs.galleryList.insertAdjacentHTML('beforeend', items);
     if(!refs.galleryList.length) {
          refs.body.insertAdjacentElement('beforeend', loadMoreBtn);
          loadMoreBtn.classList.remove('hidden');
     }else{
          loadMoreBtn.classList.add('hidden');
     }
}

loadMoreBtn.addEventListener('click', loadMore);

function loadMore() {
     apiService.setPage()
     apiService.fetchImages().then(({ hits }) => renderImages(hits))
}

