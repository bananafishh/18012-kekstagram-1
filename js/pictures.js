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
var commentsList = detailedPicture.querySelector('.social__comments');
var comment = detailedPicture.querySelector('.social__comment');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomArray = function (arr, min, max) {
  var randomArray = [];
  var randomLength = getRandomNumber(min, max);

  for (var i = 0; i < randomLength; i++) {
    var randomValue = getRandomValue(arr);
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
      comments: getRandomArray(comments, COMMENTS_MIN, COMMENTS_MAX),
      description: getRandomValue(descriptions),
    };

    picturesList.push(pictureItem);
  }

  return picturesList;
};

var getCommentsFragment = function (commentsArr) {
  var commentsFragment = document.createDocumentFragment();

  for (var i = 0; i < commentsArr.length; i++) {
    var commentTemplate = comment.cloneNode(true);
    var commentText = commentTemplate.querySelector('.social__text');
    var commentAvatar = commentTemplate.querySelector('.social__picture');

    commentText.textContent = commentsArr[i];
    commentAvatar.src = 'img/avatar-' + getRandomNumber(AVATAR_SRC_MIN, AVATAR_SRC_MAX) + '.svg';
    commentsFragment.appendChild(commentTemplate);
  }

  return commentsFragment;
};

var createPicture = function (pictureItem) {
  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = pictureItem.url;
  picture.querySelector('.picture__likes').textContent = pictureItem.likes;
  picture.querySelector('.picture__comments').textContent = pictureItem.comments.length;

  return picture;
};

var createDetailedPicture = function (pictureItem) {
  detailedPicture.querySelector('.big-picture__img img').src = pictureItem.url;
  detailedPicture.querySelector('.likes-count').textContent = pictureItem.likes;
  detailedPicture.querySelector('.comments-count').textContent = pictureItem.comments.length;
  detailedPicture.querySelector('.social__caption').textContent = pictureItem.description;
  commentsList.appendChild(getCommentsFragment(pictureItem.comments));
};

var getPicturesfragment = function (pictures, count, createPictureElement) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < count; i++) {
    var picture = createPictureElement(pictures[i]);
    fragment.appendChild(picture);
  }

  return fragment;
};

var renderPictures = function () {
  var picturesContainerElement = document.querySelector('.pictures');

  picturesContainerElement.appendChild(getPicturesfragment(picturesList, PICTURES_COUNT, createPicture));
};

var renderDetailedPicture = function (pictures, count) {
  removeElements(commentsList);

  for (var i = 0; i < count; i++) {
    createDetailedPicture(pictures[i]);
  }

  detailedPicture.classList.remove('hidden');
};

var picturesList = getPicturesList();
renderPictures();
renderDetailedPicture(picturesList, 1);
