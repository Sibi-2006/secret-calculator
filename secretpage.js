let head = document.createElement('h1');
let password = document.createElement('input');
let passBTN = document.createElement('button');
let resetBtn = document.createElement('button');
let photoBtn = document.createElement('a');
let noteBtn = document.createElement('a');
let secretBtn = document.createElement('button');
let page = document.getElementById('page')

head.textContent = "Create Password 🔐";
password.type = "password";
passBTN.textContent = "Enter";
resetBtn.textContent = "Reset Password";
resetBtn.style.display = "none";

page.appendChild(head);
page.appendChild(password);
page.appendChild(passBTN);
page.appendChild(resetBtn);

let newUser = localStorage.getItem("userPassword") === null;
let num = 0;

passBTN.addEventListener('click', () => {
    if (newUser) {
        localStorage.setItem("userPassword", password.value);
        alert("Password was saved ✅");
        newUser = false;
        head.textContent = "Login with Password 🔒";
        password.value = "";
    } else {
        const savedPassword = localStorage.getItem("userPassword");
        head.textContent = "Login with Password 🔒";

        if (savedPassword === password.value) {
            alert("Login successful ✅");
            num = 0;
            SecretPage();
        } else {
            num++;
            alert("Wrong password! Try again 🙅‍♂️");

            if (num === 3) {
                passBTN.style.display = "none";
                resetBtn.style.display = "block";
            }
        }
    }
});

resetBtn.addEventListener('click', () => {
    localStorage.removeItem("userPassword");
    newUser = true;
    head.textContent = "Create Password 🔐";
    password.value = "";
    passBTN.style.display = "block";
    resetBtn.style.display = "none";
    alert("Password was reset! 🔁");
    num = 0;
});

function SecretPage() {
    password.style.display = "none";
    passBTN.style.display = "none";
    resetBtn.style.display = "none";

    
    secretBtn.textContent = "Go to Secret Page 🔒";
    page.appendChild(secretBtn);

    secretBtn.addEventListener('click', () => {
        secretBtn.style.display = "none";

        photoBtn.href="secretPhoto.html"
        photoBtn.textContent="Secret Photo 📸"

        noteBtn.href="SecretNote.html";
        noteBtn.textContent="Secret Note 😊"
        page.appendChild(photoBtn);
        page.appendChild(noteBtn);

    });
}

