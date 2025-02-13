let blog_title = document.querySelector("#blog-title")
let blog_category = document.querySelector("#blog-category")
let blog_description = document.querySelector("#blog-description")
let blog_url = document.querySelector("#blog-image")
let blog_form = document.querySelector("#blog-form")
let accessToken = localStorage.getItem("accessToken")

blog_form.addEventListener("submit", async event => {
    event.preventDefault();
    addblog();
});

async function addblog() {
    const formData = new FormData();
    formData.append('title', blog_title.value);
    formData.append('category', blog_category.value);
    formData.append('description', blog_description.value);
    formData.append('image', blog_url.files[0]);

    let result = await fetch("https://asadbek6035.pythonanywhere.com/blog/create/",
        {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: formData,
        }
    )

    result = await result.json()
    if (result) {
        window.location.pathname = "/pages/main.html"
    }
    console.log(result)
}