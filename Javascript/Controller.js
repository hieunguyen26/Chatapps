const controller = {};
controller.register = (data) => {
    if (data.firstName === '') {
        document.getElementById('first-name-error').innerText = 'Please input First Name';
    } else {
        document.getElementById('first-name-error').innerText = '';
    };
    if (data.LastName === '') {
        document.getElementById('last-name-error').innerText = 'Please input Last Name';
    } else {
        document.getElementById('last-name-error').innerText = '';
    };
    if (data.email === '') {
        document.getElementById('email-error').
        innerText = `Please input email`
    } else {
        document.getElementById('email-error').
        innerText = '';
    }
    if (data.password === '') {
        document.getElementById('password-error').
        innerText = `Please input password`
    } else {
        document.getElementById('password-error').
        innerText = '';
    }
    if (data.confirmPassword === '') {
        document.getElementById('confirm-password-error').
        innerText = `Please confirm password`
    } else {
        document.getElementById('confirm-password-error').
        innerText = '';
    }
    if(data.firstName != '' && data.LastName !== '' &&
    data.email !== '' &&
    data.password !== '' &&
    data.confirmPassword !== '' &&
    data.password === data.confirmPassword){
        model.register(data)
    }
};
//Login
controller.login = (dataLogin) => {
    if (dataLogin.email === '') {
        document.getElementById('email-error').
        innerText = `Please input email`
    } else {
        document.getElementById('email-error').
        innerText = '';
    }
    if (dataLogin.password === '') {
        document.getElementById('password-error').
        innerText = `Please input password`
    } else {
        document.getElementById('password-error').
        innerText = '';
    }

    if(dataLogin.email !== '' &&
        dataLogin.password !== ''){
        model.login(dataLogin)
    }

};

