function buildCart() {
  // Очищаем корзину
  $('#cart').empty();
  // Отправляем запрос на получение списка товаров в корзине
  $.ajax({
    url: 'http://localhost:3000/cart',
    dataType: 'json',
    success: function(cart) {
      // Создаем ul - элемент
      var $ul = $('<ul />');
      // Переменная для хранения стоимости товаров в корзине
      var amount = 0;

      // Перебираем товары
      cart.forEach(function(item) {

        // Создаем товар в списке
        var $li = $('<li />', {
          text: item.name //+ '(' + item.quantity + ')',
        });

       // Проверяем на огрничения по складу
          if (+item.quantity > +item.store ){
             var $qntTotal = +item.store;
              //console.log(qntTotal);
              amount += $qntTotal * +item.price;
              // Создаем поле для записи количества товара в корзине
              var $quantity = $('<span />',{text: 'Кол-во: ' + $qntTotal + ' ед.', class:'qnt'});
              var $p = $('<p />', {text: 'Доступно для заказа только ' + item.store + ' ед.'})
          } else {
              $qntTotal = +item.quantity;
              amount += $qntTotal * +item.price;
              var $quantity = $('<span />',{text: 'Кол-во: ' + $qntTotal + ' ед.', class:'qnt'});
          }

        // Создаем кнопку для удаления товара из корзины
        var $button = $('<button />', {
          text: 'x',
          class: 'delete',
          'data-id': item.id,
          'data-quantity': $qntTotal,
        });
        //Создаем кнопки уменьшения\увеличения товара

          var $plusButton = $('<button />', {
              text: '+',
              class: 'plus',
              'data-id': item.id,
              'data-quantity': $qntTotal,
          });

          var $minusButton = $('<button />', {
              text: '-',
              class: 'minus',
              'data-id': item.id,
              'data-quantity': $qntTotal,
          });

        // Добавляем все в dom
        $li
            .append($quantity)
            .append($plusButton)
            .append($minusButton)
            .append($button)
            .append($p);

        $ul.append($li);
      });
      // Добавляем все в dom
      $('#cart').append($ul);
      $('#cart').append('Total: ' + amount + ' rub.')
    }
  })
}

function buildGoodsList() {
  // Запрашиваем список товаров на складе
  $.ajax({
    url: 'http://localhost:3000/goods',
    dataType: 'json',
    success: function(cart) {
      var $ul = $('<ul />');

      // Перебираем список товаров
      cart.forEach(function(item) {
        // Создаем товар в списке
        var $li = $('<li />', {
          text: item.name + ' ' + item.price + ' rub.',
        });

        // Поле для ввода количества с ограничением по количеству на складе
          var $quantity = $('<input>', {
              name: item.name,
              type: 'number',
              min: '1',
              max: item.store,
              value: "1" });

        // Создаем кнопку для покупки
        var $button = $('<button />', {
          text: 'Buy',
          class: 'buy',
          'data-id': item.id,
          'data-name': item.name,
          'data-price': item.price,
          'store': item.store,
        });

        // Добавляем все в dom
        $li
            .append($quantity)
            .append($button);

        $ul.append($li);
      });
      // Добавляем все в dom
      $('#goods').append($ul);
    }
  })
}

(function($) {
  $(function() {
    // Рисуем корзину
    buildCart();
    // Рисуем список товаров
    buildGoodsList();

    // Слушаем нажатия на удаление товара из корзины
    $('#cart').on('click', '.delete', function() {
      // Получаем id товара, который пользователь хочет удалить
      var id = $(this).attr('data-id');

      // Отправляем запрос на удаление
      $.ajax({
        url: 'http://localhost:3000/cart/' + id,
        type: 'DELETE',
        success: function() {
          // Перерисовываем корзины
          buildCart();
        }
      })
    });

      // Слушаем нажатия на уменьшение товара из корзины
      $('#cart').on('click', '.minus', function() {
          // Получаем id товара, который пользователь хочет уменьшить
          var id = $(this).attr('data-id');
          var qnt = $(this).attr('data-quantity');
          console.log(qnt);
          if (qnt > 0) {
              // Отправляем запрос на уменьшение количества
              $.ajax({
                  url: 'http://localhost:3000/cart/' + id,
                  type: 'PATCH',
                  headers: {
                      'content-type': 'application/json',
                  },
                  data: JSON.stringify({
                      quantity: --qnt,
                  }),
                  success: function () {
                      // Перерисовываем корзины
                      buildCart();
                  }
              })
          }
      });

      // Слушаем нажатия на увеличение товара из корзины
      $('#cart').on('click', '.plus', function() {
          // Получаем id товара, который пользователь хочет уменьшить
          var id = $(this).attr('data-id');
          var qnt = $(this).attr('data-quantity');
          console.log(qnt);

              // Отправляем запрос на уменьшение количества
              $.ajax({
                  url: 'http://localhost:3000/cart/' + id,
                  type: 'PATCH',
                  headers: {
                      'content-type': 'application/json',
                  },
                  data: JSON.stringify({
                      quantity: ++qnt,
                  }),
                  success: function () {
                      // Перерисовываем корзины
                      buildCart();
                  }
              })

      });

    // Слушаем нажатия на кнопку Купить
    $('#goods').on('click', '.buy', function() {
      // Определяем id товара, который пользователь хочет удалить
      var id = $(this).attr('data-id');
      var name = $(this).attr('data-name');
      var qnt = $('input[name="' + name + '"]').val();
      // Пробуем найти такой товар в карзине
      var entity = $('#cart [data-id="' + id + '"]');
      if(entity.length) {
        // Товар в корзине есть, отправляем запрос на увеличение количества
        $.ajax({
          url: 'http://localhost:3000/cart/' + id,
          type: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          data: JSON.stringify({
            quantity: +$(entity).attr('data-quantity') + +qnt,
          }),
          success: function() {
            // Перестраиваем корзину
            buildCart();
          }
        })
      } else {
        // Товара в корзине нет - создаем в заданном количестве
        $.ajax({
          url: 'http://localhost:3000/cart',
          type: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          data: JSON.stringify({
            id: id,
            quantity: qnt,
            name: $(this).attr('data-name'),
            price: $(this).attr('data-price'),
            store:$(this).attr('store'),
          }),
          success: function() {
            // Перерисовываем корзину
            buildCart();
          }
        })
      }
    });    
  });
})(jQuery);