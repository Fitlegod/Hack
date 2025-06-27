function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Валидация регистрации
function validateRegisterForm(data) {
    const errors = {};

    if (!data.name || data.name.length < 2 || data.name.length > 15) {
        errors.name = 'Имя должно быть от 2 до 15 символов';
    }

    if (!data.email || !validateEmail(data.email)) {
        errors.email = 'Некорректный email';
    }

    if (!data.password || data.password.length < 6) {
        errors.password = 'Пароль должен быть минимум 6 символов';
    }

    if (data.password !== data.passwordConfirm) {
        errors.passwordConfirm = 'Пароли не совпадают';
    }

    return errors;
}

// Валидация логина
function validateLoginForm(data) {
    const errors = {};

    if (!data.email || !validateEmail(data.email)) {
        errors.email = 'Некорректный email';
    }

    if (!data.password) {
        errors.password = 'Пароль обязателен';
    }

    return errors;
}

// Показываем ошибки на форме
function showErrors(formPrefix, errors) {
    const fields = ['name', 'email', 'password', 'passwordConfirm'];

    fields.forEach(field => {
        const errorElem = document.getElementById(`error-${formPrefix}-${field}`);
        if (errorElem) {
            errorElem.textContent = errors[field] || '';
        }
    });
}

// Обработка регистрации
async function onRegisterSubmit(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('register-name').value.trim(),
        email: document.getElementById('register-email').value.trim(),
        password: document.getElementById('register-password').value,
        passwordConfirm: document.getElementById('register-password-confirm').value,
    };

    const errors = validateRegisterForm(data);
    showErrors('register', errors);

    if (Object.keys(errors).length > 0) return;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
            }),
        });

        const resData = await response.json();

        const messageElem = document.getElementById('register-message');

        if (response.ok) {
            messageElem.style.color = 'green';
            messageElem.textContent = 'Регистрация прошла успешно!';
            document.getElementById('register-form').reset();
        } else {
            messageElem.style.color = 'red';
            messageElem.textContent = resData.errors.map(e => e.msg).join(', ');
        }
    } catch (error) {
        alert('Ошибка сервера');
    }
}

// Обработка входа
async function onLoginSubmit(event) {
    event.preventDefault();

    const data = {
        email: document.getElementById('login-email').value.trim(),
        password: document.getElementById('login-password').value,
    };

    const errors = validateLoginForm(data);

    const errorEmailElem = document.getElementById('error-login-email');
    const errorPassElem = document.getElementById('error-login-password');

    errorEmailElem.textContent = errors.email || '';
    errorPassElem.textContent = errors.password || '';

    if (Object.keys(errors).length > 0) return;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const resData = await response.json();

        const messageElem = document.getElementById('login-message');

        if (response.ok) {
            messageElem.style.color = 'green';
            messageElem.textContent = `Добро пожаловать, ${resData.name}!`;
            document.getElementById('login-form').reset();

            window.location.href = './personal-account.html';
            // Можно сохранить токен в localStorage и перенаправить
            localStorage.setItem('token', resData.token);
            // location.href = '/dashboard.html'; // например
        } else {
            messageElem.style.color = 'red';
            messageElem.textContent = resData.errors.map(e => e.msg).join(', ');
        }
    } catch (error) {
        alert('Ошибка сервера');
    }
}

// Навешиваем обработчики на формы
document.getElementById('register-form').addEventListener('submit', onRegisterSubmit);
document.getElementById('login-form').addEventListener('submit', onLoginSubmit);
