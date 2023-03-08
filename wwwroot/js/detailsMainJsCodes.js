
const addMail = document.getElementById('add_mail');
const inputMail = document.getElementById('email_input');
const innerDivMail = document.getElementById('mail_tabs_menu');

let mailsArray = [];
let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

addMail.addEventListener('click',function() {
    
    if(inputMail && inputMail.value) {
        if(inputMail.value.match(mailformat)) {
            let newElement = 
                `<span onclick="remove(this);" class="mail_tab_span">${inputMail.value}<span class="delete_button">X</span></span>`;
            innerDivMail.innerHTML += newElement;
            mailsArray.push(inputMail.value);
            inputMail.value = "";
            
        } else {
            alert("Lütfen geçerli bir e-mail hesabı giriniz.")
        }
    } else {
        alert("Lütfen göndermek istediğiniz kişinin e-mail hesabını giriniz.")
    }
    
});

function remove(element) {
    let str = element.textContent;
    let newStr = str.substring(0,str.length - 1);
    let indexToRemove = mailsArray.indexOf(newStr);
    element.style.display = 'none';
    if(indexToRemove > -1) {
        mailsArray.splice(indexToRemove,1);
    }
}

$("#comment-form").submit(function(e) {
    e.preventDefault();

    // Get the form data
    let action = document.getElementById('action').value;
    let refNo = document.getElementById('refNo').value;
    let userName = document.getElementById('user').value;
    
    if(action !== "") {
        // Submit the form data using AJAX
        $.ajax({
            url:"/DetailsPage/AddNewAction/",
            type:"POST",
            data:{action:action,refNo:refNo},
            dataType: "json",
            success: function(data){
                if(data === "true") {
                    let dateTime = new Date($.now());
                    const innerDivAction = document.getElementById('yapilan_islem');
                    let newElement = `<div class="card mb-4">
                <div class="card-body card-style">
                <div class="d-flex justify-content-between" style="margin:10px 0 0 10px">
                <div class="d-flex flex-row align-items-center">
                <img src="img/user.png" alt="avatar" width="25" height="25" />
                <span id="action_span" class="small mb-0 ms-2" style="margin-left: 10px"><b>${userName}</b> /
                ${dateTime.getDate()+"."+(dateTime.getMonth()+1)+"."+dateTime.getFullYear()+" / "+dateTime.getHours()+"."+dateTime.getMinutes() + "." + dateTime.getSeconds()}</span>
                </div>
                </div>
                <p class="card_paragraph" style="margin-top: 10px">${action}</p>
                </div>`;
                    innerDivAction.innerHTML += newElement;
                    document.getElementById('action').value = "";
                } else {
                    alert(data)
                }
            } ,
            error: function(data) {
                alert(data);
            }
        });
    } else {
        alert("Lütfen yapılan işlemi girin");
    }
});

function getUserInfo(name) {
    $.ajax( {
        url:'DetailsPage/GetUserInfo/',
        data:{name:name.textContent},
        dataType:'json',
        type:'GET',
        success: function (data) {
            if(data === "False") alert("Kullanıcının telefon numarası ve email hesabına eişmedi");
            else {
                document.getElementById('TalepEden').value = name.textContent;
                document.getElementById('EmailHesabi').value = data.userMail;
                document.getElementById('userEmail').value = data.userMail;
                document.getElementById('TelNo').value = data.userTelNo;
                document.getElementById('userTelNo').value = data.userTelNo;
                
            }
            $("#gorusulenKisiModal").modal('hide')
        },
        error: function () {
            alert("Bağlantı hatası");
        }
    })
}





