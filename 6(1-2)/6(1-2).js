"use strict";

var validRule = {
  phone: /^\+7\(\d{3}\)\d{3}-?\d{4}$/,
  email: /(^\w+(|(.|-)\w+))(?=@[a-z]{2,}\.[a-z]{2,4}\b)/i,
  name: /^[A-zА-яЁё]+( [a-zA-Zа-яА-Я']+)*$/,
}

var textError = {
    phone: 'Введенный номер не соотвествует формату +7 (777) 777-7777 ',
    email: 'Адрес электронной почты не соответствует формату user@mail.domain',
    name: 'Ошибка в формате написания имени',
}

window.onload = function () {
    

 document.getElementById('form').addEventListener('submit', function(e) {

     // очищаем сообщения в диалоге
     $('.dialog').children('li').remove();

     //проверка на выполнение правил
     Object.keys(validRule).forEach(function (rule) {
         var fields = document.querySelectorAll('[data-validation-rule = "' + rule + '"]');

         fields.forEach(function (field) {

             if (validRule[rule].test(field.value)) {

                 field.classList.remove ('invalid');

                 var text = 'Форма успешно отправлена!';

                 $('.dialog').append($('<li />', {class:success}).append(text));
                 $('#dialog').dialog({
                     position: ['left', 'top'],
                     minHeight: 100,
                     minWidth: 100,
                     buttons: [{text: "OK", click: function(){$(this).dialog("close")}}],
                     show: { effect: "blind", duration: 800 }
                 });

             } else {
                 field.classList.add('invalid');
                 Object.keys(textError).forEach(function (error) {

                     if (rule === error) {
                         $(function () {

                             var $li = $('<li />', {class:error});
                             $li.append(textError[error]);
                             $('.dialog').append($li);
                         });
                     }
                     $('#dialog').dialog({
                         position: ['left', 'top'],
                         minHeight: 200,
                         minWidth: 200,
                         show: { effect: "blind", duration: 800 },
                         buttons: [{text: "OK", click: function(){$(this).dialog("close")}}]
                     });
                     $('.invalid').effect( "bounce", "slow" );
                 })
             }


         })
     });

     e.preventDefault();
 });

     $(function () {
         $('#datepicker').datepicker({
             firstDay: 1,
             dateFormat: 'dd.mm.yy',
             dayNamesMin:['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
             changeYear: true,
             yearRange: '1920:2018',
             changeMonth: true,
             monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
             monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек" ]
         });
     });

}
