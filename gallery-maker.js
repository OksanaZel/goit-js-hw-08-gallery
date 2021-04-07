import galleryItems from "./gallery-items.js";

/*Создание и рендер разметки по массиву данных и предоставленному шаблону. */
const galleryList = document.querySelector('.gallery');
console.log(galleryList);

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

galleryList.addEventListener('click', getOriginalImageUrl);

function getOriginalImageUrl(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const originalImgUrl = evt.target.dataset.source;
  const originalImgAlt = evt.target.alt;

  openModal();
  addOriginalImagePreview(originalImgUrl);
  // console.log(originalImgUrl)
}

/*Открытие модального окна по клику на элементе галереи. */

  const modalIsOpen = document.querySelector('.lightbox');
  console.log(modalIsOpen);

function openModal() {
  modalIsOpen.classList.add('is-open');
}

/*Подмена значения атрибута src элемента img.lightbox__image. */

const originalImageDiv = document.querySelector('.lightbox__image');

function addOriginalImagePreview (url, alt){
  originalImageDiv.src = `${url}`;
  originalImageDiv.alt = `${alt}`;
}

/*Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]. */

const modalIsClose = document.querySelector('button[data-action="close-lightbox"]');
console.log(modalIsClose);

modalIsClose.addEventListener('click', closeModal)

function closeModal() {
  modalIsOpen.classList.remove('is-open');
  clearImageSrc();
}

/*Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, 
чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее. */

function clearImageSrc() {
  originalImageDiv.src = '';

  console.log(originalImageDiv);
}
