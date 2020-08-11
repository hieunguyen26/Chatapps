const model = {}
model.currentUser = undefined

model.conversations = undefined
model.currentConversation = undefined

model.collectionName = 'Conversations'


model.register = async (data) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        firebase.auth().currentUser.updateProfile({
            displayName: data.firstName + ' ' + data.lastName
        })
        firebase.auth().currentUser.sendEmailVerification()
        alert('Your email has been registered, please check your inbox')
        view.setActiveScreen('loginScreen')
    } catch (err) {
        console.log(err)
        alert(err.message)
    }

    // .then((res) => {
    //     firebase.auth().currentUser.updateProfile({
    //         displayName: data.firstName + ' ' + data.lastName
    //     })
    //     firebase.auth().currentUser.sendEmailVerification()
    // }).catch((err) => {
    //     console.log(err)
    // })
}


model.login = async (dataLogin) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(dataLogin.email, dataLogin.password)
        console.log(response)
        if (response.user.emailVerified === false) {
            alert('Please verify your email')
        } else {
            model.currentUser = {
                displayName: response.user.displayName,
                email: response.user.email
            }
            view.setActiveScreen('chatScreen')
        }
    } catch (err) {
        switch (err.code) {
            case "auth/invalid-email":
                document.getElementById('email-error').innerText = err.message
                break;
            case "auth/user-not-found":
                document.getElementById('email-error').innerText = err.message
                break;
            case "auth/wrong-password":
                document.getElementById('password-error').innerText = err.message
                break;
        }
    }
}


model.addMessage = (message) => {
    const dataToUpdate = {
        message: firebase.firestore.FieldValue.arrayUnion(message)
    }
    firebase.firestore().collection(model.collectionName).doc('NhqHM5MVenV6jse8i8yi').update(dataToUpdate)
}

model.loadConversations = async () => {
   const response = await firebase.firestore().collection(model.collectionName).where('users', 'array-contains', model.currentUser.email).get()

   model.conversations = getDataFromDocs(response.docs)

   if(model.conversations.length != 0){
   model.currentConversation = model.conversations[0];
   view.showCurrentConversation()
} 
    view.showConversations()
}

model.listenConversationsChange = () => {
let isFirstRun = true

    firebase.firestore().collection(model.collectionName).where('users', 'array-contains', model.currentUser.email).onSnapshot((res) => {  
        if (isFirstRun) {
            isFirstRun = false
            return
        }
        const docChanges = res.docChanges()
        console.log(docChanges)
        for(oneChange of docChanges){
            console.log(oneChange)
            const type = oneChange.type
            if(type === 'modified'){
                const docData = getDataFromDoc(oneChange.doc)
                for(let index = 0; index < model.conversations.length; index++){
                    if(model.conversations[index].id === docData.id) {
                        model.conversations[index] = docData
                    }
                }
                //update model.currentConversation
                if(docData.id === model.currentConversation.id) {
                    model.currentConversation = docData
                    const lastMessage = docData.message[docData.message.length - 1]
                    view.addMessage(lastMessage)
                    view.scrollToEndElement()
                }
            }
        }
    }) 
}