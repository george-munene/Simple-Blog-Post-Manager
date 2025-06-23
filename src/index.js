//creates function for displaying posts
function displayPosts() {
    //gets posts from the JSON file
    fetch("http://localhost:3000/posts")    
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById("post-list");
            postList.innerHTML = '';
            posts.forEach(post => {
                const div = document.createElement("div");
                div.ClassName = "post-item";
                div.innerHTML = `
                    <h3 data-id="${post.id}" class="post-title">${post.title}</h3>
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

//creates function for handling post click events
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

//creates function for adding new posts
function addNewPostListener() {
    const form = document.getElementById('new-post-form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const title = form.title.value;
        const author = form.author.value;
        const content = form.content.value;
        const image = form.image.value;


        //Posts directly to JSON file
        fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, author, content, image })
        })         
            .then(() => {
                displayPosts(); 
                form.reset();
            })
            .catch(error => console.error("Error creating post:", error));
    });
}


function main(){
    displayPosts();
    addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);