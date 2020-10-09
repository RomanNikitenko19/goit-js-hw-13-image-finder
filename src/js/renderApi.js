import apiService from './apiService.js';
import template from '../template/template.hbs';
import refs from './refs.js';
import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox'
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import '@babel/polyfill';

refs.galleryList.addEventListener('click', (event) => {
     if(event.target.nodeName === "IMG") {
          let modelSrc = event.target.dataset.src;

          const instance = basicLightbox.create(`
          <div class="modal">
          <button class="js-mod-btn">close</button>
          <img src="${modelSrc}" alt="picture" class="js-mod-img">
          </div>
          `)
          instance.show();
     };
     const btnModal = document.querySelector('.js-mod-btn');
     const imageModal = document.querySelector('.js-mod-img');
     console.log(imageModal);
     console.dir(event.target);
});

refs.form.addEventListener(
     'input',
     debounce(event => {
          event.preventDefault();
          refs.galleryList.innerHTML = ``;
          apiService.query = event.target.value;
          renderApi();
          refs.input.value = '';
     }, 500),
);

// apiService.fetchImages().then(({ hits }) => console.log(hits));

function renderApi() {
     apiService.fetchImages().then((data) => renderImages(data));
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
     // let curentStart = document.documentElement.offsetHeight;

     apiService.setPage()
     apiService.fetchImages().then((data) => renderImages(data))
     setTimeout(() => {

          window.scrollTo({
               top: document.documentElement.offsetHeight - 4000,
               behavior: 'smooth'
          });

     }, 500);
     // console.dir(document);
     // // console.log(document.documentElement);
     // console.log(document.documentElement.offsetHeight);

     // console.log(window.outerHeight);
     // console.log(window.innerHeight);
}

