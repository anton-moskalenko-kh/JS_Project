//На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

let postInformationBlock = document.querySelector('.post-information')

let postUrl = new URL(location.href).searchParams.get('id');

fetch(`https://jsonplaceholder.typicode.com/posts/${postUrl}`)
.then(res => res.json())
.then(post => {
    console.log(post);
    let {userId, id, title, body} = post;

    postInformationBlock.innerHTML = `
        <p>${userId}</p>
        <p>${id}</p>
        <p>${title}</p>
        <p>${body}</p>
        <button class="comments-button">Show comments of this post</button>
    `
    let commentsButton = document.querySelector('.comments-button')
    commentsButton.addEventListener('click', function () {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postUrl}/comments`)
            .then(res => res.json())
            .then(comments => {
                console.log(comments)
                let commentsBlock = document.createElement('div')
                commentsBlock.classList.add('comments-block')
                postInformationBlock.appendChild(commentsBlock);
                for (const comment of comments) {
                    let commentInfo = document.createElement('div')
                    commentInfo.classList.add('comment-info')
                    commentInfo.innerHTML = `
                        <p>${comment.id}</p>
                        <p>${comment.name}</p>
                        <p>${comment.email}</p>
                        <p>${comment.body}</p>
                    `
                    commentsBlock.appendChild(commentInfo);
                }
            })
    })
    
})