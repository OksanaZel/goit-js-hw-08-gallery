import galleryItems from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector('.gallery'),
  modalIsOpen: document.querySelector('.lightbox'),
  originalImageAttr: document.querySelector('.lightbox__image'),
  modalIsClose: document.querySelector('button[data-action="close-lightbox"]'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
  currentImage: document.querySelector('.lightbox__image'),
}

/*Создание и рендер разметки по массиву данных и предоставленному шаблону. */

const createGalleryItem = ({ preview, original, description }) => {
  return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
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
refs.galleryList.insertAdjacentHTML("beforeend", markup);
  
/*Реализация делегирования на галерее ul.js-gallery и получение url большого изображения. */

refs.galleryList.addEventListener('click', getOriginalImageUrl);

function getOriginalImageUrl(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const currentImgUrl = evt.target.dataset.source;
  const currentImgAlt = evt.target.alt;

  addCurrentImageAttr(currentImgUrl, currentImgAlt);
  openModal();

  const imagesListLink = galleryItems.map(item => item.original);
  let currentIdx = imagesListLink.indexOf(currentImgUrl);
  const imagesListDescription = galleryItems.map(item => item.description);
  
  window.addEventListener('keydown', turnaboutImg);

  function turnaboutImg(evt) {

      if (evt.code === 'ArrowRight' && refs.modalIsOpen.classList.contains('is-open')) {
      currentIdx += 1;
        refs.currentImage.src = imagesListLink[currentIdx];
        refs.currentImage.alt = imagesListDescription[currentIdx];
    }

    if (evt.code === 'ArrowLeft' && refs.modalIsOpen.classList.contains('is-open')) {
      currentIdx -= 1;
      refs.currentImage.src = imagesListLink[currentIdx];
      refs.currentImage.alt = imagesListDescription[currentIdx];
    }
    }
}

/*Открытие модального окна по клику на элементе галереи. */

function openModal() {
  refs.modalIsOpen.classList.add('is-open');
}

/*Подмена значения атрибута src элемента img.lightbox__image. */

function addCurrentImageAttr (url, alt){
  refs.originalImageAttr.src = `${url}`;
  refs.originalImageAttr.alt = `${alt}`;
}

/*Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]. */
/*Закрытие модального окна по клику на div.lightbox__overlay.
Закрытие модального окна по нажатию клавиши ESC. */

refs.modalIsClose.addEventListener('click', closeModal);

refs.modalOverlay.addEventListener('click', closeModal);

function closeModal() {
  refs.modalIsOpen.classList.remove('is-open');
  clearImageSrc();
}

window.addEventListener('keydown', onEscPress);

function onEscPress(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

/*Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, 
чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее. */

function clearImageSrc() {
  refs.originalImageAttr.src = '';
  refs. originalImageAttr.alt = '';
}

/*Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо". */

// const galleryListItems = document.querySelector('.gallery__item');
// console.log(galleryListItems);

// window.addEventListener('keydown', changeSibling);

//   function changeSibling(evt){
//   if (evt.code === 'ArrowRight') {
//     console.log(galleryListItems.nextSibling.childNodes);
//   }

//   if (evt.code === 'ArrowLeft') {
//     console.log(galleryListItems.previousSibling);
//   }
// }

// const imagesList = galleryItems.map(item => item.original);
// console.log(imagesList);