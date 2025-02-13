let phone_number = document.querySelector('#phone_number');
let password = document.querySelector('#password');
const regist_form = document.querySelector('#regist_form');

regist_form.addEventListener("submit", async event => {
    event.preventDefault();
    signin();
});

async function signin() {
    try {
        let body = {
            phone_number: phone_number.value,
            password: password.value
        }
        let result = await fetch("https://asadbek6035.pythonanywhere.com/account/login/",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        )
        result = await result.json()
        console.log(result);
        if (result?.success) {
            localStorage.setItem("accessToken", result.data.token.access);
            localStorage.setItem("refreshToken", result.data.token.refresh);
            window.location.pathname = '/pages/main.html'
        }
    } catch (error) {
        alert("Someting is wrong");
    }
}