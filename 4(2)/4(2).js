"use strict";

$.ajax({
    type: 'GET',
    url: 'http://localhost:3000/cities',
    dataType: 'json',
    success: function (data) {
        for (var i = 0; i < data.length; i++) {
            var selectElement = $('<option></option>');
            selectElement.attr('value', data[i]);
            selectElement.text(data[i]);
            $('.city').append(selectElement);
        }
    },
    error: function (error) {
        console.log(error);
    }
});
