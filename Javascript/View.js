const view = {}
view.setActiveScreen = (screenName, fromCreateConversation = false) => {
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
                // const messageFromBot = {
                //     owner: 'Bot',
                //     content: sendMessageForm.message.value
                // }
                if(message.content.trim() === ''){
                    alert('Please input message')
                } else {
                model.addMessage(message)
                // view.addMessage(message)
                sendMessageForm.message.value = ``;
                //view.addMessage(messageFromBot)
                console.log(sendMessageForm.message.value)
                
            } })
            if(!fromCreateConversation){
                model.loadConversations()
                model.listenConversationsChange()
            } else {
                view.showConversations()
                view.showCurrentConversation()
            }
            document.querySelector('.create-conversation .btn').addEventListener('click', () => {
                view.setActiveScreen('createConversation')
            })
            break;

        case 'createConversation':
            document.getElementById('app').innerHTML = components.createConversation
            document.querySelector('#back-to-chat').addEventListener('click', () => {
                view.setActiveScreen('chatScreen', true)
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

view.showCurrentConversation = () => {
    document.querySelector('.list-messages').innerHTML = ''

    // doi ten cuoc tro chuyen
    document.getElementsByClassName('conversation-header')[0].innerText = model.currentConversation.title;
    

    //in cac tin nhan len man hinh
    for(message of model.currentConversation.message){
    view.addMessage(message)
    }
view.scrollToEndElement()
}

view.scrollToEndElement = () => {
    const element = document.querySelector('.list-messages')
    element.scrollTop = element.scrollHeight
}

view.showConversations = () => {
    for(oneConversation of model.conversations){
        view.addConversation(oneConversation)
    }
}
view.addConversation = (conversation) => {
    const conversationWrapper = document.createElement('div')
    // conversationWrapper.classList.add('conversation')
    conversationWrapper.className = 'conversation cursor-pointer'
    if(model.currentConversation.id === conversation.id){
        conversationWrapper.classList.add('current')
    }
    conversationWrapper.innerHTML = `
    <div class='conversation-title'>${conversation.title}</div>
    <div class='conversation-num-user'>${conversation.users.length} users</div>
    `
    conversationWrapper.addEventListener('click', () => {
        //thay doi giao dien, doi current
        document.querySelector('.current').classList.remove('current')
        conversationWrapper.classList.add('current')
        //thay doi model.currentConversation
        model.currentConversation = conversation
        //in cac tin nhac cua model.currentConversation len man hinh
        view.showCurrentConversation()
        
    })
    document.querySelector('.list-conversation').appendChild(conversationWrapper)
}

