const model = {}
model.currentUser = undefined
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
    firebase.firestore().collection('Conversations').doc('NhqHM5MVenV6jse8i8yi').update(dataToUpdate)
}