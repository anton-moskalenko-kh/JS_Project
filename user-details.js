// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.

let userInformationBlock = document.querySelector('.user-information')

let userUrl = new URL(location.href).searchParams.get('id');
let postLink = `https://jsonplaceholder.typicode.com/users/${userUrl}/posts`
fetch(`https://jsonplaceholder.typicode.com/users/${userUrl}`)
    .then(res => res.json())
    .then(user => {
        let userInfo = document.createElement('div')
        userInfo.classList.add('user')
        userInformationBlock.appendChild(userInfo);

        userInfo.innerHTML = `
        <h3>ID: ${user.id} ${user.name}</h3>
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
        <p>Website: ${user.website}</p>
        <h3>Address:</h3>
    `
        let addressBlock = document.createElement('div')
        addressBlock.classList.add('user-address')
        userInfo.appendChild(addressBlock);

        for (const userInfoKey in user.address) {
            if (userInfoKey === 'geo') {
                let geoBlock = document.createElement('div')
                geoBlock.innerHTML = '<h4>Geo Data:</h4>'
                addressBlock.appendChild(geoBlock);
                for (const geoKey in user.address[userInfoKey]) {
                    let p = document.createElement('p')
                    p.innerHTML = `${geoKey}: ${user.address[userInfoKey][geoKey]}`
                    geoBlock.appendChild(p)
                }
            } else {
                let p = document.createElement('p')
                p.innerHTML = `${userInfoKey} - ${user.address[userInfoKey]}`
                addressBlock.appendChild(p);
            }
        }

        let companyBlock = document.createElement('div')
        companyBlock.classList.add('user-company')
        userInfo.appendChild(companyBlock);

        let titleCompanyBlock = document.createElement('h3')
        titleCompanyBlock.innerText = 'Information about company';
        companyBlock.appendChild(titleCompanyBlock);

        for (const userInfoKey in user.company) {
            let p = document.createElement('p')
            p.innerHTML = `${userInfoKey} - ${user.company[userInfoKey]}`
            companyBlock.appendChild(p);
        }

        let postButton = document.createElement('a');
        postButton.innerText = 'Post of current user';
        userInformationBlock.appendChild(postButton);

        postButton.addEventListener('click', function () {
            showPostsOfUser(postLink, userInformationBlock)
        })
        /*postButton.addEventListener('click', function () {
            fetch(`https://jsonplaceholder.typicode.com/users/${userUrl}/posts`)
                .then(res => res.json())
                .then(posts => {
                    let postsBlock = document.createElement('div')
                    postsBlock.classList.add('posts-block')
                    userInformationBlock.appendChild(postsBlock);
                    for (const post of posts) {
                        let p = document.createElement('p');
                        p.innerText = `${post.title}`
                        postsBlock.appendChild(p);

                        let postDetails = document.createElement('a');
                        postDetails.innerText = 'Show information about post';
                        postsBlock.appendChild(postDetails);

                        postDetails.addEventListener('click', function () {
                            location.href = `post-details.html?id=${post.id}`;
                        })
                    }
                })
        })*/

    })

function showPostsOfUser(url, htmlBlock) {
    fetch(url)
        .then(res => res.json())
        .then(posts => {
            let postsBlock = document.createElement('div')
            postsBlock.classList.add('posts-block')
            htmlBlock.appendChild(postsBlock);
            for (const post of posts) {
                let p = document.createElement('p');
                p.innerText = `${post.title}`
                postsBlock.appendChild(p);

                let postDetails = document.createElement('a');
                postDetails.innerText = 'Show information about post';
                postsBlock.appendChild(postDetails);

                postDetails.addEventListener('click', function () {
                    location.href = `post-details.html?id=${post.id}`;
                })
            }
        })
}