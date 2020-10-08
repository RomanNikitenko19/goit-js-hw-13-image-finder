import refs from './refs.js';

const API_key = '18623542-c3ea86fe133d4cad85931c408';
const baseUrl =`https://pixabay.com/api/`
// let query = 'js';
// let page = 1;
// let perPage = 12;

export default {
     query: 'cat',
     page: 1,
     perPage: 12,
     fetchImages() {
          let url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${API_key}`;
          return fetch(url).then(res => res.json()).catch(error => displayError(error))
          // .then(({hits}) => hits);
     },
};

function displayError(error) {
     const errorH2 = document.createElement('h2');
     errorH2.textContent = error;
     refs.body.prepend(errorH2);
}