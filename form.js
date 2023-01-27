const mainData = [];
const formerror = document.querySelectorAll('formerror');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const contact = document.getElementById('contact');
const address = document.getElementById('address');
const password = document.getElementById('password');
const btnSubmit = document.getElementById('btnSubmit');
const btnEdit = document.getElementById('btnEdit');
const form = document.getElementById('form');
const tablebody = document.getElementById('demo');
btnSubmit.innerHTML = "Submit"
class Data {
    constructor(fullname, email, contact, address, password) {
        this.fullname = fullname;
        this.email = email
        this.contact = contact;
        this.address = address;
        this.password = password;
        this.id = mainData.length; //Dynamic Id
        mainData.push(this.getData())
    }
    getData() {
        return {
            fullname: this.fullname,
            email: this.email,
            contact: this.contact,
            address: this.address,
            password: this.password,
            id: this.id
        }
    }
}
function validateForm() {
    let returnVal = true;
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var num = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
    if (fullname.value == "") {
        document.getElementsByClassName('formerror')[0].innerHTML = "*Name is Empty"
        returnVal = false;
    }
    else if (fullname.value.length < 5) {
        document.getElementsByClassName('formerror')[0].innerHTML = "*Name is too Short"
        returnVal = false;
    }
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
        document.getElementsByClassName('formerror')[1].innerHTML = "*Invalid Email"
        returnVal=false;
    }
    if(!/^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/.test(contact.value)){
        document.getElementsByClassName('formerror')[2].innerHTML = "*Invalid Number"
        returnVal=false;
    }
    if (password.value.length < 8 || password.value.length > 15) {
        document.getElementsByClassName('formerror')[4].innerHTML = "*Password should be grater than 8 letters"
        returnVal = false
    }
    return returnVal
}
btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    if (validateForm()){
        const data = new Data(fullname.value, email.value, contact.value, address.value, password.value);
        form.reset();
        console.log('Hello')
        console.log(mainData)
        display(mainData);
    }
})

function editData(id) {

    btnSubmit.style.display = "none"
    btnEdit.style.display = "block"
    let currentUser = mainData[id]
    console.log(currentUser)
    document.getElementById('fullname').value = currentUser.fullname
    document.getElementById('email').value = currentUser.email
    document.getElementById('contact').value = currentUser.contact
    document.getElementById('address').value = currentUser.address
    document.getElementById('password').value = currentUser.password
    btnEdit.onclick = (e) => {
        e.preventDefault()
        updateRecord(currentUser.id)
    }
}

function updateRecord(index) {
    if(validateForm()){
        let user = {
            fullname: fullname.value,
            email: email.value,
            contact: contact.value,
            address: address.value,
            password: password.value,
            id: index
        }
        mainData[index] = user
        display(mainData)
        form.reset();
        btnSubmit.style.display = "block"
        btnEdit.style.display = "none"
    }
        
    }


function deleteData(id) {
    let confirmation = confirm('Are you Sure You want to Delete');
    if (confirmation) {
        console.log("Deleted")
        mainData.splice(id, 1);
        display(mainData);
        form.reset();
    } else {
        return
    }
}

function display(mainData) {
    let text = "<table style='border: 5px solid black;'>"
    for (i = 0; i < mainData.length; i++) {
        text += "<tr>";
        text += "<td>" + mainData[i].fullname + "</td>";
        text += "<td>" + mainData[i].email + "</td>";
        text += "<td>" + mainData[i].contact + "</td>";
        text += "<td>" + mainData[i].address + "</td>";
        text += "<td>" + mainData[i].password + "</td>";
        text += `<td><button id='btnEdit' onclick='editData(${mainData[i].id})'>Edit</button></td>`;
        text += `<td><button id='btnEdit' onclick='deleteData(${i})'>Delete</button></td>`;
        text += "</tr>";
    }
    text += "</table>"
    tablebody.innerHTML = text;
    form.reset();
}
