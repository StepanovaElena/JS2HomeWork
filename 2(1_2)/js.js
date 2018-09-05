"use strict";


function Container(id, className) {
    this.id = id;
    this.class = className;
}

Container.prototype.remove = function () {
  var menuElem = document.getElementById(this.id);
  menuElem.parentNode.removeChild(menuElem);
}

Container.prototype.render = function () {
    var div =document.createElement('div');
    div.className = this.class;
    div.id = this.id;
    return div;
}
// Конструктор Menu
function Menu(id, className, items) {
    Container.call(this, id, className);
    this.items = items;
}
Menu.prototype = Object.create(Container.prototype);

Menu.prototype.render = function () {
    var ul = document.createElement('ul');
    ul.className = this.class;
    ul.id = this.id;
    this.items.forEach(function(item){
            if(item instanceof Container){
            ul.appendChild(item.render());
        }
    });
    return ul;
}

// Класс элемента меню
function MenuItem(href, lable, subMenu) {
    Container.call(this, id, className);
    this.href = href;
    this.lable = lable;
    this.subMenu = subMenu;
}

MenuItem.prototype = Object.create(Container.prototype);

MenuItem.prototype.render = function () {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = this.href;
    a.textContent = this.lable;

    li.appendChild(a);
    li.appendChild(this.subMenu.render());
    li.className = this.class;
    return li;
}
function menuFromJson(object) {
    var item = [];
    var i = 0;
    for (var obj in object.items) {
        item[i] = new MenuItem(object.items[obj].href, object.items[obj].title,
                  menuFromJson(object.items[obj].subMenu));
        i++;
    }
    var menu = new Menu('menu', 'menu', item);
    return menu;
}

// Конструктор подменю
/** function SubMenu(id, className, items, title, href) {
    Menu.call(this, id, className, items);
    this.title = title;
    this.href = href;
}

SubMenu.prototype = Object.create(Menu.prototype);

SubMenu.prototype.render = function() {
    if (this.title && this.href) {
        var menuItem = new MenuItem(this.href, this.title).render();
        menuItem.appendChild(Menu.prototype.render.call(this));
        return menuItem;
    } else {
        return Menu.prototype.render.call(this);
    }
}*/

// При загрузке страницы инициализирует меню.
    window.onload = function () {

        var xhr = new XMLHttpRequest();
        xhr.open('GET','http://localhost:3000/items');
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var objectJson = JSON.parse(xhr.responseText);
                console.log(objectJson);
                var menu = menuFromJson(objectJson);
                document.body.appendChild(menu.render());
            }
        }
    }

