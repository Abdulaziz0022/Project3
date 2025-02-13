const regist_form = document.getElementById("regist_form");
regist_form.addEventListener("submit", async event => {
    event.preventDefault();
    register();
});


let full_name = document.querySelector("#name");
let phone_number = document.querySelector("#phone_number");
let password = document.querySelector("#password");
let password2 = document.querySelector("#password2");
let avatar = document.querySelector("#photo");

async function register() {
    try {
        if (password.value !== password2.value) {
            throw new Error("Passwords are not the same");
        }

        const body = new FormData();
        body.append("full_name", full_name.value);
        body.append("phone_number", phone_number.value);
        body.append("password", password.value);
        body.append("password2", password2.value);
        body.append("avatar", avatar.files[0]);

        let response = await fetch("https://asadbek6035.pythonanywhere.com/account/register/", {
            method: "POST",
            body: body
        });

        let result = await response.json();
        console.log(result);
        if (result?.success) {
            window.location.pathname = '/pages/singin.html'
        }
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}
