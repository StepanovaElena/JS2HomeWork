"use strict";

function Gallery (id, images) {
    this.id = id;
    this.images = images;
}

Gallery.prototype.render = function () {
    var div = document.createElement('div');
    div.id = this.id;
    this.images.forEach(function(image){
        if(image instanceof Image){
            div.appendChild(image.render());
        }
    });
    return div;
}


function Image (src, alt, target, href) {
  this.src = src;
  this.alt = alt;
  this.href = href;
  this.target = target;
}

Image.prototype.render = function () {
  var newImg = document.createElement('img');
    newImg.src = this.src;
    newImg.alt = this.alt;
  var newLink =document.createElement('a');
  newLink.href = this.href;
  newLink.target = this.target;

  newLink.appendChild(newImg);

  return newLink;
  }

// При загрузке страницы инициализирует выполнение
window.onload = function () {

    var xhr = new XMLHttpRequest();
    xhr.open('GET',' http://localhost:3000/image');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var images = JSON.parse(xhr.responseText);
            images = images.map(function(image) {
               return new Image(image.src, image.alt, image.target, image.href);
            });
            var gallery = new Gallery('gallery', images);
            document.getElementById('Wrapper').appendChild(gallery.render());
           }
        }
    }