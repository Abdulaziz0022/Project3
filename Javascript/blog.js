async function fetchBlogs() {
    try {
        const response = await fetch('https://asadbek6035.pythonanywhere.com/blog/list/');
        if (!response.ok) throw new Error("Failed to fetch blogs");

        const blogs = await response.json();
        const blogContainer = document.querySelector('#blog-container');
        blogContainer.innerHTML = '';

        if (blogs.length === 0) {
            blogContainer.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-300">No blogs found.</p>`;
            return;
        }

        let blogHTML = '';

        blogs.forEach(blog => {
            blogHTML += `
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                            w-full min-w-[320px] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto sm:mx-0 mb-5 lg:mb-10">
                    <img src="${blog.image || 'https://via.placeholder.com/500'}" 
                        alt="Blog Image" class="w-full h-56 min-w-[320px] object-cover">
                    <div class="p-4">
                        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            ${blog.title}
                        </h4>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            ${truncateText(blog.description, 100)}
                        </p>
                        <div class="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                            <p>${formatDate(blog.date_created)}</p>
                            <a href="./info.html?id=${blog.id}" 
                               class="text-blue-500 font-semibold hover:underline flex items-center">
                                Read More
                                <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });

        blogContainer.innerHTML = blogHTML;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        document.querySelector('#blog-container').innerHTML = `
            <p class="text-red-500 text-center">Error loading blogs: ${error.message}</p>`;
    }
}

function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, text.lastIndexOf(" ", maxLength)) + "...";
}

fetchBlogs();
