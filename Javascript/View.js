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
                    owner: model.currentUser.email,
                    createdAt: new Date().toISOString()
                }
                const messageFromBot = {
                    owner: 'Bot',
                    content: sendMessageForm.message.value
                }
                if(message.content.trim() === ''){
                    alert('Please input message')
                } else {
                model.addMessage(message)
                view.addMessage(message)
                sendMessageForm.message.value = ``;
                view.addMessage(messageFromBot)
                console.log(sendMessageForm.message.value)
                
            } })
            model.loadConversations()
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
        <div class = 'owner'>
        ${message.owner}
        </div>
        <div class = 'content'>
        ${message.content}
        </div>`
    }
   const listMessage = document.querySelector('.list-messages')
    listMessage.appendChild(messageWrapper)
    listMessage.scrollTop = listMessage.scrollHeight
}

view.getCurrentMessage = async() => {
    const messages = await firebase.firestore().collection('Conversations').get();
    const listMessages = messages.docs[0].data().messages;
    return listMessages;
}