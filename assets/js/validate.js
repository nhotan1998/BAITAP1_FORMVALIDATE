    window.addEventListener("load", function () {
    const inputFullName = document.querySelector("#full-name");
    const inputEmail = document.querySelector("#email");
    const inputPhone = document.querySelector("#phone");
    const inputBirthday = document.querySelector("#birthday");
    const inputPassword = document.querySelector("#password");
    const inputRePassword = document.querySelector("#confirm-password");
    const btnSubmit = document.querySelector(".btn-submit");
    const resultFullName = document.querySelector(".full-name");
    const resultEmail = document.querySelector(".email");
    const resultPhone = document.querySelector(".phone");
    const resultBirthday = document.querySelector(".birthday");
    const btnUpload = document.querySelector("#btn-upload");
    const avatarUpload = document.querySelector(".avatar-upload");
    const imgPreview = document.querySelector(".img-preview");
    const iconUploadAvatar = document.querySelector(".icon-upload-avatar");
    const avatarWrapper = document.querySelector(".avatar-wrapper");
    const avatarCenter = document.querySelector(".avatar-center");
    const btnReset = document.querySelector(".btn-reset");
    
    
    /* ValidityState-typeMismatch-email */
    const regexName = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;

    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const regexPhone = /^[0][0-9]{9}/;

    const regexBirthday = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

    
    // click btn shift to submit and click btn delete to reset
    (function () {
        document.querySelector("html").addEventListener("keydown", function (e) {
            //Away 2  e.which == 16
            if (e.key == "Shift") {
                submitForm(e);
            } else if (e.key == "Delete"){
                resetForm(e);
            }
        })
    })();

    //click button
    btnSubmit.addEventListener("click", submitForm);
    btnReset.addEventListener("click", resetForm);

    // Validation 
    function Validation(selector , msgError = "") {
        if (msgError) {
        selector.classList.add("is-invalid");
        selector.classList.remove("is-valid");
        selector.nextElementSibling.textContent = msgError;
        } else {
            selector.classList.add("is-valid");
            selector.classList.remove("is-invalid");
        }
    }
    // check Length 
    function checkLength(selector, field, maxLength) {
        if (selector.value.trim().length > maxLength) {
            return Validation(selector , `${field} max length is ${maxLength} characters`
            );
        } else {
            Validation(selector);
        }

        if (!selector.value) {
            selector.classList.remove("is-valid");
            selector.classList.remove("is-invalid");
            return;
        }
    }

    // check regex 
    function inputValidation(selector, regex, textError = "") {
        if (!regex.test(selector.value)) {
            Validation(selector, textError) 
        }
        if (!selector.value) {
            selector.classList.remove("is-valid");
            selector.classList.remove("is-invalid");
            return;
        }
    }

    //check regex input FullName
    inputFullName.addEventListener("input", function () {
        checkLength(inputFullName, "Full Name", 30);
        inputValidation(inputFullName, removeAscent(regexName), "Invalid Name");
    })

    //Accented characters
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
    
    //Automatically capitalize the first letter
    function fullNameCase(str) {
    let arr = str.toLowerCase().split(" ");
    let save = "";
    arr.forEach(x => {
        x = x.charAt(0).toUpperCase() + x.substr(1);
        save += x + " ";
    });
    return save;
    }

    //Uppercase first characters
    inputFullName.addEventListener("change", function() {
        if (inputFullName.value) {
           inputFullName.value = fullNameCase(inputFullName.value);
        }
    })

    //check regex input Email 
    inputEmail.addEventListener("input", function() {
        checkLength(inputEmail, "Email", 50);
        inputValidation(inputEmail, regexEmail, "Invalid Email");
    })

    // check regex input Phone
    inputPhone.addEventListener("input", function() {
        checkLength(inputPhone, "Phone", 10);
        inputValidation(inputPhone, regexPhone, "Start 0 Ex: 0123456789");
    })
    
    //check birthday 
    inputBirthday.addEventListener("input", function() {
        if (this.value.length == 2) {
            this.value = this.value + "-";
          }
        if (this.value.length == 5) {
            this.value = this.value + "-";
          }
          checkFormatDate(this);
    })

    //check password
    inputPassword.addEventListener("input", function() {
        if (inputPassword.value.trim().length > 7 && inputPassword.value.trim().length < 30) {
            //Begins with the letter
            if (!/^[a-zA-Z]{1}/.test(inputPassword.value.trim())) {
                return Validation(inputPassword, "Password must start with letter")
            } else {
                Validation(inputPassword);
            }
            //Special characters
            if (!/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(inputPassword.value.trim())) {
                return Validation(inputPassword, "Password must contain special characters")
            } else {
                Validation(inputPassword);
            }
            //Contains number
            if (!/[\d]/.test(inputPassword.value.trim())) {
                return Validation(inputPassword, "Password must contain number")
            } else {
                Validation(inputPassword);
            }
            //Uppercase letter
            if (!/[A-Z]/.test(inputPassword.value.trim())) {
                return Validation(inputPassword, "Password must have the first character capitalized");
            } else {
                Validation(inputPassword);
            }
        } else {
            Validation(inputPassword, "Passwords are 8-30 characters long");
        }
        if (!inputPassword.value) {
            inputPassword.classList.remove("is-valid");
            inputPassword.classList.remove("is-invalid");
          }
    })
    //upload avatar
    btnUpload.addEventListener("change", function () {
        const [avatar] = btnUpload.files;
        if (
          avatar &&
          (avatar.type == "image/jpeg" ||
            avatar.type == "image/png" ||
            avatar.type == "image/jpg")
        ) {
          avatarUpload.style.display = "block";
          avatarUpload.src = URL.createObjectURL(avatar);
          iconUploadAvatar.style.display = "none";
        } else {
          avatarWrapper.children[2].textContent = "Not file img";
        }
      });

    //check confirm Password
    inputRePassword.addEventListener("input", function() {
        if (inputPassword.value != inputRePassword.value) {
            Validation(inputRePassword, "Passwords do not match");
        } else {
            Validation(inputRePassword);
        }
        if (!inputRePassword.value) {
            inputRePassword.classList.remove("is-invalid");
            inputRePassword.classList.remove("is-valid");

        }
    })

    //check FormatDate
    function checkFormatDate(field) {
        checkLength(inputBirthday, "Birthday", 10);
        inputValidation(inputBirthday, regexBirthday, "Invalid Birthday");
        const inputValue = field.value.trim();
        const x = inputValue.split("-").reverse();
        const dateCurrent = new Date();
        const dateInput = new Date(x[0],x[1], x[2]);
        if (dateInput > dateCurrent) Validation(inputBirthday, "Input date is greater than current date");
        checkNullField(inputBirthday, "Birthday")
    }



    //check Null Field 
    function checkNullField(field,msg) {
        if (field.value.trim().length < 1) {
            Validation(field, `${msg} is Required`);
        }
    }



    function submitForm(e) {
        e.preventDefault();
        checkNullField(inputFullName, "Full name");
        checkNullField(inputEmail, "Email");
        checkNullField(inputPhone, "Phone");
        checkNullField(inputPassword, "Password");
        checkNullField(inputRePassword, "Re-password");
        checkFormatDate(inputBirthday);

        const listInvalid = document.querySelectorAll("input.is-invalid");
        if (listInvalid.length) return;
        resultFullName.innerText = inputFullName.value;
        resultEmail.innerText = inputEmail.value;
        resultPhone.innerText = inputPhone.value.slice(0, 3) + "-" 
        + inputPhone.value.slice(3, 6) + "-" + inputPhone.value.slice(6, 10);
        resultBirthday.innerText = inputBirthday.value.split("-").join("/");

        if (avatarUpload.getAttribute("src") !== "#") {
            imgPreview.setAttribute("src", avatarUpload.getAttribute("src"));
            imgPreview.style.display = "block";
            avatarCenter.children[1].style.display = "none";

        }
    }

    function resetForm(e) {
        e.preventDefault();
        const listValid = document.querySelectorAll("input.is-valid");
        const listInvalid = document.querySelectorAll("input.is-invalid");

        document.querySelectorAll("input").forEach(x => {
            x.value = "";
        })
        listValid.forEach(x => {
            x.classList.remove("is-valid");
        })
        listInvalid.forEach(x => {
            x.classList.remove("is-invalid");
        })
        iconUploadAvatar.style.display = "block";
        avatarUpload.style.display = "none";
    }

    })