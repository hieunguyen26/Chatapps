const view = {}
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'welcomeScreen':
            document.getElementById('app').innerHTML = components.welcomeScreen
            break;
            // case 'loginScreen':
            // break;

        case 'registerScreen':
            document.getElementById('app').innerHTML = components.registerScreen
            const registerForm = document.getElementById('register-form');
            registerForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const data = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value
                }
                console.log(data);
                controller.register(data)
            })
            document.getElementById('redirect-to-login').addEventListener('click', () => view.setActiveScreen('loginScreen'))
            break;

        case 'loginScreen':
            document.getElementById('app').innerHTML = components.loginScreen
            const loginForm = document.getElementById('login-form');
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                loginForm.email.value = loginForm.email.value.trim();
                const dataLogin = {
                    email: loginForm.email.value,
                    password: loginForm.password.value
                }
                console.log(dataLogin);
                controller.login(dataLogin)
            })
            document.getElementById('redirect-to-register').addEventListener('click', () => view.setActiveScreen('registerScreen'))

            break;

        case 'chatScreen':
            document.getElementById('app').innerHTML = components.chatScreen
            const sendMessageForm = document.getElementById('send-message-form');
            sendMessageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const message = {
                    content: sendMessageForm.message.value,
                    owner: model.currentUser.email
                }
                view.addMessage(message)
                console.log(sendMessageForm.message.value)
            })
            break;
    }
}

view.addMessage = (message) => {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-container')
    if(message.owner === model.currentUser.email) {
        messageWrapper.classList.add('mine')
        messageWrapper.innerHTML = `
        <div class = 'content'>
        ${message.content}
        </div>
        `
    } else {
        messageWrapper.classList.add('their')
        messageWrapper.innerHTML = `
        <div class = 'content'>
        ${message.content}
        </div>`
    }
    document.querySelector('.list-messages').appendChild(messageWrapper)
}