function methodCopySlice(array, begin, end) {

    if ( Array.isArray(array) && (!begin || isNumeric(begin))
        && (!end || isNumeric(end))) {

        var newArray = [];
        start = (begin < 0) ? array.length - Math.abs(begin) : begin;
        finish = (end < 0) ? array.length - Math.abs(end) : end;

        if (begin === undefined && end === undefined) {
            array.forEach(function (elem, index) {
                newArray[index] = elem;
            });

        } else if (end === undefined) {
            for (i = start; i < array.length; i++) {
                newArray.push(array[i]);
            }

        } else {
            for (i = start; i < finish; i++) {
                newArray.push(array[i]);
            }
        }
        return newArray;

    }
        return "Данные неверны";
}

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

module.exports = methodCopySlice;