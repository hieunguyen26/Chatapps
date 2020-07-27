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
            document.getElementById('welcome').innerHTML = `Welcome ` + model.currentUser.displayName;
            break;
    }
}
