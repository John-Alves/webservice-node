exports.leftPad = (number, width, filler = '0') => {

    let string = '' + number;
    while (string.length < width) {
        string = filler + string;
    }

    return string;
}