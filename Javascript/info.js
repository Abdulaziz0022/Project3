let accessToken = localStorage.getItem('accessToken');
let blog_image = document.querySelector('#blog_image');
let title = document.querySelector('#title');
let comment = document.querySelector('#comment');

let id = new URLSearchParams(window.location.search)
id = id,get("blog_id")

(function checkAuth() {
    if (!accessToken) {
        window.location.href = "/";
    }
})();

async function getBlog() {
    try {
        let response = await fetch(`https://asadbek6035.pythonanywhere.com/blog/comment/list?blog_id=81`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken} ` 
            }
        });

        let result = await response.json();

        if (result) {
            blog_image.src = result?.image;
            title.innerText = result?.title;
        }
    } catch (error) {
        console.error("Error fetching blog:", error);
    }
}

async function getBlogComments() {
    try {
        let response = await fetch(`https://asadbek6035.pythonanywhere.com/blog/comment/list?blog_id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Token ' + accessToken
            }
        });

        let result = await response.json();
        console.log(result);
    } catch (error) {
        console.error("Error fetching comments:", error);
    }
}

async function addComment() {
    try {
        let commentText = comment.value.trim();

        if (!commentText) {
            console.warn("Comment cannot be empty!");
            return;
        }

        let body = {
            comment: commentText,
            blog_id: id
        };

        let response = await fetch(`https://asadbek6035.pythonanywhere.com/blog/comment/post/`, {
            method: 'POST',
            headers: {
                'Authorization': 'Token ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        let result = await response.json();

        if (result) {
            console.log(result);
            comment.value = "";
            getBlogComments();
        }
    } catch (error) {
        console.error("Error adding comment:", error);
    }
}

getBlog();
getBlogComments();
