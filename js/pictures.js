'use strict';

var PICTURES_COUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 5;
var COMMENTS_MAX = 10;
var AVATAR_SRC_MIN = 1;
var AVATAR_SRC_MAX = 6;

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var detailedPicture = document.querySelector('.big-picture');
var commentTemplate = document.querySelector('.social__comment');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomArray = function () {
  var randomArray = [];
  var commentsCount = getRandomNumber(COMMENTS_MIN, COMMENTS_MAX);

  for (var i = 0; i < commentsCount; i++) {
    var randomValue = getRandomValue(comments);
    randomArray.push(randomValue);
  }

  return randomArray;
};

var removeElements = function (el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

var getPicturesList = function () {
  var picturesList = [];

  for (var i = 0; i < PICTURES_COUNT; i++) {
    var pictureItem = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: getRandomArray(),
      description: getRandomValue(descriptions),
    };

    picturesList.push(pictureItem);
  }

  return picturesList;
};


var createPicture = function (pictureData) {
  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = pictureData.url;
  picture.querySelector('.picture__likes').textContent = pictureData.likes;
  picture.querySelector('.picture__comments').textContent = pictureData.comments.length;

  return picture;
};

var renderPictures = function (pictures, count, createPictureElement) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < count; i++) {
    var picture = createPictureElement(pictures[i]);
    fragment.appendChild(picture);
  }

  return fragment;
};

var createDetailedPicture = function (pictureData) {
  detailedPicture.querySelector('.big-picture__img img').src = pictureData.url;
  detailedPicture.querySelector('.likes-count').textContent = pictureData.likes;
  detailedPicture.querySelector('.comments-count').textContent = pictureData.comments.length;
  detailedPicture.querySelector('.social__caption').textContent = pictureData.description;
};

var renderComments = function (pictureData) {
  var commentsFragment = document.createDocumentFragment();

  for (var i = 0; i < pictureData.comments.length; i++) {
    var comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__text').textContent = pictureData.comments[i];
    comment.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(AVATAR_SRC_MIN, AVATAR_SRC_MAX) + '.svg';
    commentsFragment.appendChild(comment);
  }

  return commentsFragment;
};

var addPictures = function () {
  var picturesContainerElement = document.querySelector('.pictures');
  picturesContainerElement.appendChild(renderPictures(picturesList, PICTURES_COUNT, createPicture));
};

var addDetailedPicture = function () {
  var commentsList = detailedPicture.querySelector('.social__comments');

  createDetailedPicture(picturesList[0]);
  removeElements(commentsList);
  commentsList.appendChild(renderComments(picturesList[0]));
  detailedPicture.classList.remove('hidden');
};

var picturesList = getPicturesList();
addPictures();
addDetailedPicture();
