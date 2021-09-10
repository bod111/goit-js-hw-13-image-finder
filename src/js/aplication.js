import refs from './refs';
import 'material-design-icons';
import makeImgMarkup from '../templates/card';

refs.serchForm.addEventListener('submit', showImages);

let currenInput = null;
let currentPage = 1;

function showImages(e) {
  e.preventDefault();
  // console.dir(e.currentTarget);
  const input = e.currentTarget.elements.query.value;
  currenInput = input;
  currentPage = 1;
  console.log('showImages ~ input', input);
  const BASE_URL = 'https://pixabay.com/api';
  const queryParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    q: input,
    page: 1,
    per_page: 12,
    key: '23311871-6dfcca62e78c0a60decb58f13',
  });

  return fetch(`${BASE_URL}/?${queryParams}`)
    .then(response => response.json())
    .then(data => makeImgMarkup(data.hits))
    .then(markup => (refs.pictureExposition.innerHTML = markup));
}
refs.loadMoreBtn.addEventListener('click', onClick);
function onClick() {
  currentPage += 1;
  const BASE_URL = 'https://pixabay.com/api';
  const queryParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    q: currenInput,
    page: currentPage,
    per_page: 12,
    key: '23311871-6dfcca62e78c0a60decb58f13',
  });

  return fetch(`${BASE_URL}/?${queryParams}`)
    .then(response => response.json())
    .then(data => makeImgMarkup(data.hits))
    .then(markup => {
      refs.pictureExposition.insertAdjacentHTML('beforeend', markup);
      function scrollInto() {
        refs.loadMoreBtn.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }

      setTimeout(scrollInto, 1000);
    });
}
