
let userName = document.getElementById("name");
let userNumber = document.getElementById("phone-number");

if (!window.localStorage.getItem("formfilledCounter")) {
    window.localStorage.setItem("formfilledCounter", Number(0));
}
//window.localStorage.clear();

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
            // window.toastr.success("تم أرسال الطلب بنجاح....", { timeOut: 5000 });
            window.alert("تم أرسال الطلب بنجاح....");

        }
    }
    else {
        toastr.error('لا يمكنك تعبئة الطلب أكثر من مرتين..');
        // window.alert(" لا يمكنك تعبئة الطلب أكثر من مرتين..");
        e.preventDefault();
    }

}
// Name Validation
function nameValidate(userName) {
    let reName = /^[\u0621-\u064AA-Za-z]+$/;
    if (userName.value === "") {
        // window.alert(" يجب ادخال اسم المستخدم");
        window.toastr.error('يجب ادخال اسم المستخدم');
        return false;
    }
    if (!reName.test(userName.value)) {
        // window.alert(" يجب ادخال الاسم احرف فقط");
        window.toastr.error("يجب ادخال الاسم احرف فقط");
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
        toastr.error('يجب ادخال رقم المستخدم');
        // window.alert(" يجب ادخال رقم المستخدم");
        return false;
    }
    if (!reNumber.test(userNumber.value)) {
        toastr.error('يجب ادخال أرقام فقط وعدد الأرقام يجب أن يكون 10 ');
        // window.alert("يجب ادخال أرقام فقط وعدد الأرقام يجب أن يكون 10 ");
        return false;
    }
    else {
        return true;
    }
}
// comboBox 
async function readData() {
    const response = await fetch("offers.json");
    let myData = await response.json();
    return myData;
}
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
let countryFlag = document.getElementById("country-flag");
var select = document.getElementById("comboBoxPhone");
select.addEventListener('change', function () {
    countryFlag.src = `https://www.countryflagsapi.com/png/${select.value.slice(0, 3)}`;
});

async function getUserCountry() {
    const response = await fetch("https://ipgeo.2p-host.com/");
    let myData = await response.json();
    return myData;
}
async function getCountryPhoneCode() {
    const response = await fetch("CountryCodes.json");
    let myData = await response.json();
    let userCountryCode = await getUserCountry();
    // let userCountryPhoneCode = myData.find((element) => element.code === userCountryCode.countryCode).dial_code;
    let comboBox = document.getElementById("comboBoxPhone");


    myData.forEach((e) => {
        let option = document.createElement("option");
        option.text = `${e.code} : ${e.dial_code}`;
        comboBox.appendChild(option);

        if (e.code === userCountryCode.country_code2) {
            option.selected = true;
            countryFlag.src = `https://www.countryflagsapi.com/png/${e.code}`;
        }
    });
}

//call functions
fillComboBox();
getCountryPhoneCode();

