let userName = document.getElementById("name");
let userNumber = document.getElementById("phone-number");


if (!window.localStorage.getItem("formfilledCounter")) {
    window.localStorage.setItem("formfilledCounter", Number(0));
}
window.localStorage.clear();

document.forms[0].onsubmit = function (e) {
    let nameValid = false;
    let numValid = false;

    if (window.localStorage.getItem("formfilledCounter") < 2) {

        // Name Validation
        nameValid = nameValidate(userName);

        // Number Validation
        numValid = numberValidate(userNumber);

        if (nameValid === false || numValid === false) {
            e.preventDefault();
        } else {
            window.localStorage.setItem("formfilledCounter", Number(window.localStorage.getItem("formfilledCounter")) + 1);
            window.alert("تم أرسال الطلب بنجاح....");
        }
    }
    else {
        window.alert(" لا يمكنك تعبئة الطلب أكثر من مرتين..");
    }

}
// Name Validation
function nameValidate(userName) {
    let reName = /^[\u0621-\u064AA-Za-z]+$/;
    if (userName.value === "") {
        window.alert(" يجب ادخال اسم المستخدم");
        return false;
    }
    if (!reName.test(userName.value)) {
        window.alert(" يجب ادخال الاسم احرف فقط");
        return false;
    }
    else {
        return true;
    }
}
// Number Validation
function numberValidate(userNumber) {
    // let reNumber = /\+90\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}/; //'+90 (536) 708 11 09'
    let reNumber = /^[\u0660-\u06690-9]{10}$/

    if (userNumber.value === "") {
        window.alert(" يجب ادخال رقم المستخدم");
        return false;
    }
    if (!reNumber.test(userNumber.value)) {
        window.alert("يجب ادخال أرقام فقط وعدد الأرقام 10 ");
        return false;
    }
    else {
        return true;
    }
}