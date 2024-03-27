// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.

const userInformationBlock = document.querySelector('.user-information')
const returnBnt = document.querySelector('.return-btn')

const userUrlParams = new URL(location.href).searchParams.get('id');
const userLink = `https://jsonplaceholder.typicode.com/users/${userUrlParams}`
const postLink = `https://jsonplaceholder.typicode.com/users/${userUrlParams}/posts`
returnBnt.addEventListener('click', function () {
    location.href = 'index.html'
})
fetch(userLink)
    .then(res => res.json())
    .then(user => {
        const {id, name, username, email, phone, website, address, company} = user;

        const userInfo = createDomElement('div', ['user'], '', userInformationBlock);

        userInfo.innerHTML = `
        <div class="main-info">
            <h3>ID: ${id} ${name}</h3>
            <p>Username: ${username}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Website: ${website}</p>
        </div>
    `
        const addressBlock = createDomElement('div', ['user-address'], '', userInfo)
        const addressHeadTitle = createDomElement('h3', '', 'Address:', addressBlock)

        for (const userAddressInfo in address) {
            if (userAddressInfo === 'geo') {
                const geoBlock = createDomElement('div', ['geo-block'], '', addressBlock)
                geoBlock.innerHTML = '<h4>Geo Data:</h4>';

                for (const geoKey in address[userAddressInfo]) {
                    const p = createDomElement('p', '', '', geoBlock)
                    p.innerHTML = `${geoKey}: ${address[userAddressInfo][geoKey]}`
                }
            } else {
                const p = createDomElement('p', '', '', addressBlock)
                p.innerHTML = `${userAddressInfo} - ${address[userAddressInfo]}`
            }
        }

        const companyBlock = createDomElement('div', ['user-company'], '', userInfo)
        const titleCompanyBlock = createDomElement('h3', '', 'Information about company', companyBlock)

        for (const userCompanyInfo in company) {
            const p = createDomElement('p', '', '', companyBlock)
            p.innerHTML = `${userCompanyInfo} - ${company[userCompanyInfo]}`
        }

        const postButton = createDomElement('a', ['button', 'post-button'], 'Show posts of current user', userInformationBlock)
        const hidePostsButton = createDomElement('a', ['button', 'post-button', 'hidden-button'], 'Hide posts', userInformationBlock)

        const postsSection = createDomElement('div', ['posts-section'], '', userInformationBlock)

        postButton.addEventListener('click', function () {
            showPostsOfUser(postLink, postsSection)
            changeButton(postButton, hidePostsButton, 'hidden-button')
        })

        hidePostsButton.addEventListener('click', function () {
            postsSection.innerHTML = '';
            changeButton(postButton, hidePostsButton, 'hidden-button')
        })

    })
    .catch(e => console.log(`Щось пішло не так: ${e}`))


function showPostsOfUser(url, htmlBlock) {
    htmlBlock.innerHTML = '';

    fetch(url)
        .then(res => res.json())
        .then(posts => {
            for (const post of posts) {
                let {id, title} = post;
                const postBlock = createDomElement('div', ['post'], '', htmlBlock)
                const p = createDomElement('p', '', title, postBlock)

                const postDetailsLink = createDomElement('a', ['post-information-button', 'button'], 'Show information about post', postBlock)

                postDetailsLink.addEventListener('click', function () {
                    location.href = `post-details.html?id=${id}`;
                })
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