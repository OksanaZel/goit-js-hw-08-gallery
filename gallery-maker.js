import galleryItems from "./gallery-items.js";

/*Создание и рендер разметки по массиву данных и предоставленному шаблону. */
const galleryList = document.querySelector('.gallery');
// console.log(galleryList);

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
galleryList.insertAdjacentHTML("beforeend", markup);
  
/*Реализация делегирования на галерее ul.js-gallery и получение url большого изображения. */

galleryList.addEventListener('click', getOriginalImageUrl);

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
  // let currentDescription = imagesListDescription.indexOf(currentImgAlt);
  // console.log(currentDescription);
  
  window.addEventListener('keydown', turnaboutImg);
  
  const currentImage = document.querySelector('.lightbox__image');
  // console.log(currentImage);

  function turnaboutImg(evt) {

      if (evt.code === 'ArrowRight' && modalIsOpen.classList.contains('is-open')) {
      currentIdx += 1;
        currentImage.src = imagesListLink[currentIdx];
        currentImage.alt = imagesListDescription[currentIdx];
    }

    if (evt.code === 'ArrowLeft' && modalIsOpen.classList.contains('is-open')) {
      currentIdx -= 1;
      currentImage.src = imagesListLink[currentIdx];
      currentImage.alt = imagesListDescription[currentIdx];
    }
    }
}

/*Открытие модального окна по клику на элементе галереи. */

const modalIsOpen = document.querySelector('.lightbox');

function openModal() {
  modalIsOpen.classList.add('is-open');
}

/*Подмена значения атрибута src элемента img.lightbox__image. */

const originalImageAttr = document.querySelector('.lightbox__image');

function addCurrentImageAttr (url, alt){
  originalImageAttr.src = `${url}`;
  originalImageAttr.alt = `${alt}`;
}

/*Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]. */
/*Закрытие модального окна по клику на div.lightbox__overlay.
Закрытие модального окна по нажатию клавиши ESC. */

const modalIsClose = document.querySelector('button[data-action="close-lightbox"]');
modalIsClose.addEventListener('click', closeModal);

const modalOverlay = document.querySelector('.lightbox__overlay');
modalOverlay.addEventListener('click', closeModal);

function closeModal() {
  modalIsOpen.classList.remove('is-open');
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
  originalImageAttr.src = '';
  originalImageAttr.alt = '';
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