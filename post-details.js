//На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

const postInformationBlock = document.querySelector('.post-information')
const btnUsersSelection = document.querySelector('.btn-users-selection')
const btnUserInfo = document.querySelector('.btn-users-info')

const postUrlParams = new URL(location.href).searchParams.get('id');
const postLink = `https://jsonplaceholder.typicode.com/posts/${postUrlParams}`;
const commentsLink = `https://jsonplaceholder.typicode.com/posts/${postUrlParams}/comments`;

btnUsersSelection.addEventListener('click', function () {
    location.href = 'index.html';
})
fetch(postLink)
.then(res => res.json())
.then(post => {
    let {userId, id, title, body} = post;

    postInformationBlock.innerHTML = `
        <p>User ID: ${userId}</p>
        <p>Post ID: ${id}</p>
        <p>Post Title: ${title}</p>
        <p>Main content: ${body}</p>
        <button class="comments-button button">Show comments of this post</button>
    `
    const commentsButton = document.querySelector('.comments-button')

    const hideCommentsButton = createDomElement('button', ['button', 'comments-button', 'hidden-button'], 'Hide posts', postInformationBlock)

    const commentsBlock = document.querySelector('.comments-section')
    commentsButton.addEventListener('click', function () {
        showCommentsOfPost(commentsLink, commentsBlock)
        changeButton(commentsButton, hideCommentsButton, 'hidden-button')
    })

    hideCommentsButton.addEventListener('click', function () {
        commentsBlock.innerHTML = '';
        changeButton(commentsButton, hideCommentsButton, 'hidden-button')
    })

    btnUserInfo.addEventListener('click', function () {
        location.href = `user-details.html?id=${userId}`
    })
})

function showCommentsOfPost(url, htmlBlock) {
    htmlBlock.innerHTML = '';

    fetch(url)
        .then(res => res.json())
        .then(comments => {
            for (const comment of comments) {
                let {id, name, email, body} = comment;
                const commentInfo = createDomElement('div', ['comment-info'], '', htmlBlock)
                commentInfo.innerHTML = `
                        <p>ID: ${id}</p>
                        <p>Name: ${name}</p>
                        <p>Email: ${email}</p>
                        <p>Content: ${body}</p>
                    `
            }
        })
        .catch(e => console.log(`Щось пішло не так: ${e}`))
}

function changeButton(showBtn, hideBtn, nameOfClass) {
    showBtn.classList.toggle(nameOfClass)
    hideBtn.classList.toggle(nameOfClass);
}

function createDomElement(tagName, arrayClassList, innerText, htmlBlock) {
    const elem = document.createElement(tagName)
    if (Array.isArray(arrayClassList) && arrayClassList.length !== 0) {
        elem.classList.add(...arrayClassList)
    }

    (innerText) ? elem.innerText = innerText :  elem.innerText = '';

    htmlBlock.appendChild(elem);

    return elem;
}