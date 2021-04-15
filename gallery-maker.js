import galleryItems from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector('.gallery'),
  modalIsOpen: document.querySelector('.lightbox'),
  originalImageAttr: document.querySelector('.lightbox__image'),
  modalIsClose: document.querySelector('button[data-action="close-lightbox"]'),
}

/*Создание и рендер разметки по массиву данных и предоставленному шаблону. */

const createGalleryItem = ({ preview, original, description }) => {
  return `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}"
      data-source="${original}" alt="${description}"/></a></li>`}

const markup = galleryItems.map(createGalleryItem).join('');
refs.galleryList.insertAdjacentHTML("beforeend", markup);
  
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
  console.log(refs.originalImageAttr.src);
  console.log(refs.originalImageAttr.alt)


  

  // addCurrentImageAttr(currentImgUrl, currentImgAlt);

  /*Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо". */
  // const imagesListLink = galleryItems.map(item => item.original);
  // const imagesListDescription = galleryItems.map(item => item.description);
  // let currentIdx = imagesListLink.indexOf(currentImgUrl);
  
  // window.addEventListener('keydown', changeImage);

  // function changeImage(evt) {

  //   if (evt.code === 'ArrowRight') {
  //     if (currentIdx >= galleryItems.length - 1) {
  //       return;
  //     }
  //       currentIdx += 1;
  //       refs.currentImage.src = imagesListLink[currentIdx];
  //       refs.currentImage.alt = imagesListDescription[currentIdx];
  //   }

  //   if (evt.code === 'ArrowLeft') {
  //     if (currentIdx <= 0) {
  //       return;
  //     }
  //       currentIdx -= 1;
  //       refs.currentImage.src = imagesListLink[currentIdx];
  //       refs.currentImage.alt = imagesListDescription[currentIdx];
  //   }
  // }
}

/*Открытие модального окна по клику на элементе галереи. */

function openModal() {
  refs.modalIsOpen.classList.add('is-open');
  window.addEventListener('keydown', onEscPress);
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
  refs.modalIsOpen.classList.remove('is-open');

 /*Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того,
чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее. */
  refs.originalImageAttr.src = '';
  refs.originalImageAttr.alt = '';
}

refs.modalIsOpen.addEventListener('click', onOverlayClickClose);

// function onOverlayClickClose (evt) {
//   if (evt.target.nodeName !== 'IMG') {
//     closeModal();
//   }
// }

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
  