import { galleryItems } from './gallery-items.js';
// Change code below this line
const gallery = document.querySelector('.gallery');

const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item">
         <a class="gallery__link" href="${original}">
           <img
             class="gallery__image"
             src="${preview}"
             data-source="${original}"
             alt="${description}"
           />
         </a>
       </li>`
  )
  .join('');

gallery.insertAdjacentHTML('beforeend', galleryMarkup);

gallery.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  const target = event.target;
  if (target.nodeName !== 'IMG') {
    return;
  }

  const originalUrl = target.dataset.source;

  const instance = basicLightbox.create(`
    <img src="${originalUrl}" width="800" height="600">
  `);

  instance.show();

  document.addEventListener('keydown', onEscKeyPress);

  function onEscKeyPress(event) {
    if (event.code === 'Escape') {
      instance.close();
      document.removeEventListener('keydown', onEscKeyPress);
    }
  }
}