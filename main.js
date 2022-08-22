// import { toast } from "./node_modules/toastr/toastr.js"


let userName = document.getElementById("name");
let userNumber = document.getElementById("phone-number");

async function readData() {
    const response = await fetch("offers.json");
    let myData = await response.json();
    return myData;
}


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
            // toastr.success('Success messages');
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
        window.alert("يجب ادخال أرقام فقط وعدد الأرقام يجب أن يكون 10 ");
        return false;
    }
    else {
        return true;
    }
}
// comboBox 
async function fillComboBox() {
    let comboBox = document.getElementById("comboBox");
    let data = await readData();

    Object.keys(data).forEach((key) => {
        let optgroup = document.createElement("optgroup");
        optgroup.label = key;
        comboBox.appendChild(optgroup);

        data[key].forEach((element) => {
            let option = document.createElement("option");
            option.text = element.title;
            comboBox.appendChild(option);
        })

    });
}
fillComboBox();

async function getUserCountry() {
    const response = await fetch("https://api.db-ip.com/v2/free/self");
    let myData = await response.json();
    return myData;
}
async function getCountryPhoneCode() {
    const response = await fetch("CountryCodes.json");
    let myData = await response.json();
    let userCountryCode = await getUserCountry();

    let countryPhoneCode = myData.find((element) => element.code === userCountryCode.countryCode).dial_code;
    let countryPhoneCodeDiv = document.getElementById("country-code");
    let myText = document.createTextNode(`${userCountryCode.countryCode} : ${countryPhoneCode}`);
    countryPhoneCodeDiv.appendChild(myText);

    let countryFlag = document.getElementById("country-flag");
    countryFlag.src = `https://www.countryflagsapi.com/png/${userCountryCode.countryCode}`;
}
getCountryPhoneCode();
