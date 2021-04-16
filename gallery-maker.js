import galleryItems from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector('.gallery'),
  modalIsOpen: document.querySelector('.lightbox'),
  originalImageAttr: document.querySelector('.lightbox__image'),
  modalIsClose: document.querySelector('button[data-action="close-lightbox"]'),
}

let currentIndex;

/*Создание и рендер разметки по массиву данных и предоставленному шаблону. */

const createGalleryItem = ({ preview, original, description }) => {
  return `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}"
      data-source="${original}" alt="${description}"/></a></li>`}

const markup = galleryItems.map(createGalleryItem);
refs.galleryList.insertAdjacentHTML("beforeend", markup.join(''));
// console.log(markup);
  
/*Реализация делегирования на галерее ul.js-gallery и получение url большого изображения. */

refs.galleryList.addEventListener('click', onImageClick);

function onImageClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  openModal();

  /*Подмена значения атрибута src элемента img.lightbox__image. */
  refs.originalImageAttr.src = evt.target.dataset.source;
  refs.originalImageAttr.alt = evt.target.alt;

  markup.forEach((item, index) => {
    if (item.includes(evt.target.dataset.source)) {
      currentIndex = index;
    }
  })

  // window.addEventListener('keydown', changeImage);

  // changeImage();
}

  // addCurrentImageAttr(currentImgUrl, currentImgAlt);

  /*Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо". */
  // const imagesListLink = galleryItems.map(item => item.original);
  // const imagesListDescription = galleryItems.map(item => item.description);
  // let currentIdx = markup.indexOf(refs.originalImageAttr.src);
  // console.log(currentIdx);
  
  window.addEventListener('keydown', changeImage);

  function changeImage(evt) {

    if (evt.code === 'ArrowRight') {
      if (currentIndex >= galleryList.length - 1) {
        return;
      }
        currentIndex += 1;
        refs.originalImageAttr.src = galleryList[currentIndex];
        refs.originalImageAttr.alt = galleryList[currentIndex];
    }

    if (evt.code === 'ArrowLeft') {
      if (currentIndex <= 0) {
        return;
      }
        currentIndex -= 1;
        refs.originalImageAttr.src = galleryList[currentIndex];
        refs.originalImageAttr.alt = galleryList[currentIndex];
    }
  }

/*Открытие модального окна по клику на элементе галереи. */

function openModal() {
  refs.modalIsOpen.classList.add('is-open');
  window.addEventListener('keydown', onEscPress);
  refs.modalIsOpen.addEventListener('click', onOverlayClickClose);
}

/*Подмена значения атрибута src элемента img.lightbox__image. */

// function addCurrentImageAttr (url, alt){
//   refs.originalImageAttr.src = `${url}`;
//   refs.originalImageAttr.alt = `${alt}`;
// }

/*Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]. */
/*Закрытие модального окна по клику на div.lightbox__overlay.
Закрытие модального окна по нажатию клавиши ESC. */

refs.modalIsClose.addEventListener('click', closeModal);

function closeModal() {
  window.removeEventListener('keydown', onEscPress);
  refs.modalIsOpen.removeEventListener('click', onOverlayClickClose);
  refs.modalIsOpen.classList.remove('is-open');

 /*Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того,
чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее. */
  refs.originalImageAttr.src = '';
  refs.originalImageAttr.alt = '';
}

function onOverlayClickClose (evt) {
  if (evt.target.nodeName !== 'IMG') {
    closeModal();
  }
}

function onEscPress(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

/*Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, 
чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее. */

// function clearImageSrc() {
//   refs.originalImageAttr.src = '';
//   refs. originalImageAttr.alt = '';
// }

/*Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо". */
// const imagesListLink = galleryItems.map(item => item.original);
// const imagesListDescription = galleryItems.map(item => item.description);
// console.log(imagesListLink);
// console.log(imagesListDescription);
  