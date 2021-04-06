import galleryItems from "./gallery-items.js";

/*Создание и рендер разметки по массиву данных и предоставленному шаблону. */
const galleryList = document.querySelector('.gallery');

const createGalleryItem = ({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
}

const markup = galleryItems.map(createGalleryItem).join('');
galleryList.insertAdjacentHTML("beforeend", markup);


/*Реализация делегирования на галерее ul.js-gallery и получение url большого изображения. */

// galleryList.addEventListener('.js-gallery', getOriginalImage)

// function getOriginalImage(evt) {
//     console.log(evt.target.dataset.value);
// }