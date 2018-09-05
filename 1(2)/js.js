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
    //if (typeof (item) != "undefined"){
    this.items.forEach(function(item){
            if(item instanceof Container){
            ul.appendChild(item.render());
        }
    });
   // }
    return ul;
}

// Класс элемента меню
function MenuItem(href, lable) {
    Container.call(this, '', 'menu-item');
    this.href = href;
    this.lable = lable;
}

MenuItem.prototype = Object.create(Container.prototype);

MenuItem.prototype.render = function () {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = this.href;
    a.textContent = this.lable;

    li.appendChild(a);
    li.className = this.class;
    return li;
}

// Конструктор подменю
function SubMenu(id, className, items, title, href) {
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
}

// При загрузке страницы инициализирует меню.
    window.onload = function () {

        var items = [
        new MenuItem('/', 'Home'),
        new MenuItem('/Men', 'Men'),
            new SubMenu('Submenu', 'Submenu', [
                new MenuItem('/Women/Catalog', 'Catalog')], 'Women','/Women'),
    ];
        var menu = new Menu ('menu', 'menu', items);
    document.body.appendChild(menu.render());
}

