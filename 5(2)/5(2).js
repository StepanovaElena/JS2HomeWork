"use strict";
function reviewExam () {
    $.ajax ({
    url: 'http://localhost:3000/review',
    dataType: 'json',
    success: function (review) {
        review.forEach(function (item) {

           var $p = $('<p />', {
                id: item.userId,
            });

            var $text = item.text;

            var $btnApprove = $('<button />', {
                class: "approve",
                text: "Одобрить",
                id: item.userId
            });

            var $btnDelete = $('<button />', {
                class: "delete",
                text: "Удалить",
                'data-id': item.userId,
                id: item.id
            });


            $p.append("User ID: " + item.userId + "  Отзыв: " + $text);

            var $divElem = $('<div />',{class: 'review', id: item.userId})
            .append($p)
            .append($btnApprove)
            .append($btnDelete);

            $('#newReviewContainer').append($divElem);

            $('#newReview').children('#userText').remove();

        });


        $('.review').on('click', '.approve', function () {
            $('div[id = "' + this.id +'"]').children().hide();
            $('div[id = "' + this.id +'"]').append('Вы подтвердили отзыв пользователя ID: '+ this.id).show();

        });

        $('.review').on('click', '.delete', function () {
            $('div[id = "' + $(this).data("id") +'"]').children().hide();
            $('div[id = "' + $(this).data("id") +'"]').append('Вы отклонили отзыв пользвателя ID: ' + $(this).data("id") ).show();
            var userId = $(this).data("id");
            var idElem = $(this).attr('id');

                $.ajax ({
                    url: 'http://localhost:3000/review/'+ idElem,
                    type: 'DELETE',
                    success: function () {
                        $('div[id = "' + userId +'"]').children().remove();
                    }
                })
            });
    }
});
}

function userText(text) {

    var $span = $('<span />', {
        id: "userText",
    });

    $span.append(text);
    $('.fieldReview').val('');
    $('#newReview').append($span).show();
}

(function($){
    $(function(){
        $('.submit').click(function() {
            if ($('.fieldReview').val() !== '') {
            var element = {text: $('.fieldReview').val(), userId: Math.round(Math.random() * 1001)};
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/review',
                headers: {'content-type': 'application/json'},
                data: JSON.stringify(element)
            });
                reviewExam ();
                $('#newReview').children('#userText').remove();
                var $text = "Спасибо! Bаш отзыв отправлен модератору";
                userText($text);

        } else {
                $('#newReview').children('#userText').remove();
                var $textError = "Ваш отзыв пустой!!! Повторите попытку";
                userText($textError);


            }

        });

    });
})(jQuery);




