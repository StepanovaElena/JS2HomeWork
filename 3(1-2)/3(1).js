"use strict";

var text = document.getElementById('text').innerText;
var newText = text.replace(/(?!s'|[a-z]'[a-z])([\s\S])'|^'/g, '"' );
console.log(newText);


/**
var textReplace = text.replace(/'/g, '"');
console.log(textReplace);

function replacer(string) {
    var result = string.match(/([a-z]"[a-z])/g);
    if (result != null) {
        result = result.map(function(elem) {
            return elem.replace(/"/g,"'");
        })
    }
    return result;
}

var newText = textReplace.replace(/([a-z]"[a-z])/g, function(match, offset) {
    return result[offset];
});
console.log(newText); **/