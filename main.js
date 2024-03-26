// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули

let usersSection = document.querySelector('.users-block')
fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => {
        for (const user of users) {
            let userBlock = document.createElement('div');
            userBlock.classList.add('user-block');
            userBlock.innerHTML = `
                <p>User ID: ${user.id}</p>
                <h3>${user.name}</h3>
            `
            usersSection.appendChild(userBlock);

            let userLink = document.createElement('a')
            userLink.classList.add('button')
            userLink.innerText = 'Show information about User';
            userLink.addEventListener('click', function () {
                location.href = `user-details.html?id=${user.id}`
            })
            userBlock.appendChild(userLink);
        }

    })
    .catch(e => console.log(`Щось пішло не так: ${e}`));