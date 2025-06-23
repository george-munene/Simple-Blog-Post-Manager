const baseUrl = "http://localhost:3000";

function displayPosts() {
    fetch("http://localhost:3000/posts")
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById("post-list");
            postList.innerHTML = '';
            posts.forEach(post => {
                const div = document.createElement("div");
                div.classsName = "post-item";
                div.innerHTML = `
                    <h3 data-id="${post.id} class="post-title">${post.title}</h3>
                    <img src="${post.image}" alt="${post.title}" width="100" />
                    `
                postList.appendChild(div);
            });

            //adding event listeners to post titles
            document.querySelectorAll(".post-title").forEach(title => {
                title.addEventListener('click', handlePostClick);
            });
        });
}


function handlePostClick(event) {
    const id = event.target.dataset.id;
    fetch(`http://localhost:3000/posts/${id}`)
    .then(response => response.json())
    .then(post => {
        const detail = document.getElementById('post-detail');
        detail.innerHTML = `
            <h2>${post.title}</h2>
            <img src="${post.image}" alt="${post.title}" width="200" />
            <p>${post.content}</p>
            <p>Author: ${post.author}</p>
        `;
    });
}

function addNewPostListener() {
    const form = document.getElementById('new-post-form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const title = form.title.value;
        const author = form.author.value;
        const content = form.content.value;
        const image = form.image.value;
        const postList = document.getElementById('post-list');
        const div = document.createElement('div');
        div.className = 'post-item';
        div.innerHTML = `
            <h3 class="post-title">${title}</h3>
            <img src="${image}" alt="${title}" width="100" />
        `;

        postList.appendChild(div);
        form.reset();
    });
}


function main(){
    displayPosts();
    addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);