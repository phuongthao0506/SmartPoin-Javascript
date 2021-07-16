export const checkEmpty = (selector, error_selector, name) => {
    const value = document.querySelector(selector).value;
    if (value.trim() === "") {
        document.querySelector(error_selector).innerHTML=`${name} không được bỏ trống !`
        return false
    }
    document.querySelector(error_selector).innerHTML=''
    return true
}
function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}
export const checkText = (selector, error_selector, name) => {
    const value = document.querySelector(selector).value;
    const valueRemoveAscent = removeAscent(value)
    const regex = /^([a-zA-Z\s])+$/;
    if (regex.test(valueRemoveAscent)) {
        document.querySelector(
            error_selector
        ).innerHTML = ''
        return true
    }
    document.querySelector(error_selector).innerHTML = name + ' không hợp lệ !'
    return false
}
export const checkNumber = (selector, error_selector, name) => {
    const value = document.querySelector(selector).value;
    const regex = /^[0-9]+$/;
    if (regex.test(value)) {
        document.querySelector(
            error_selector
        ).innerHTML = ''
        return true
    }
    document.querySelector(error_selector).innerHTML = name + ' không hợp lệ! '
    return false
}
export const checkEmail = function (selector, error_selector) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(document.querySelector(selector).value)) {
        document.querySelector(error_selector).innerHTML = '';
        return true;
    }
    document.querySelector(error_selector).innerHTML = 'Email không hợp lệ !';
    return false;
}


export const capitalize = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }
 