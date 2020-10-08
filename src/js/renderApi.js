import rets from './refs.js';
import apiService from './apiService.js';
import template from '../template/template.hbs';
import refs from './refs.js';

console.log(rets);

// apiService.fetchImages().then(({ hits }) => console.log(hits));
apiService.fetchImages().then(({ hits }) => renderImages(hits));

function renderImages(data) {
     const items = template(data);
     refs.galleryList.insertAdjacentHTML('beforeend', items);
}

