const postsGet = document.getElementById("posts");
const postTitle = document.getElementById("post-title");
const postBody = document.getElementById("post-body");
let postsArr = [];
const url = "https://apis.scrimba.com/jsonplaceholder/posts";

// ---------------------------------------------------------------------------------------------

function renderPosts() {
  let postsStr = "";
  postsArr.forEach((post) => {
    postsStr += `<div class='post'><h3>${post.title}</h3><p>${post.body}</p></div>`;
  });
  postsGet.innerHTML = postsStr;
}

// ---------------------------------------------------------------------------------------------

fetch(url, { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    postsArr = data.slice(0, 10);
    renderPosts();
  });

// ---------------------------------------------------------------------------------------------

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = {
    title: postTitle.value,
    body: postBody.value,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => data.json)
    .then(postsArr.unshift(data), renderPosts(), form.reset());
});
