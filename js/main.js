// Мобильное меню
const navMenu = document.querySelector('.nav-menu');
const navMenuBtn = document.querySelector('.nav-menu-btn');

navMenuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navMenuBtn.classList.toggle('close');
});

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navMenuBtn.classList.remove('close');
  });
});

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Изменение фона хедера при прокрутке
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Анимация появления элементов при прокрутке с помощью ScrollReveal
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 1000,
  delay: 400
});

sr.reveal('.home-content, .section-title', {});
sr.reveal('.home-img', { origin: 'right' });
sr.reveal('.about-img', { origin: 'left' });
sr.reveal('.about-content', { origin: 'right' });
sr.reveal('.skill-item', { interval: 100 });
sr.reveal('.portfolio-item', { interval: 200 });
sr.reveal('.contact-item', { interval: 200 });
sr.reveal('.contact-form', { origin: 'bottom', delay: 600 });
sr.reveal('.contact-header', { delay: 500 });

// Переключение темы (светлая/темная)
const body = document.body;
const themeToggleBtn = document.createElement('button');
themeToggleBtn.classList.add('theme-toggle');
themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
document.querySelector('.header-wrapper').appendChild(themeToggleBtn);

// Проверка сохраненной темы в localStorage
if (localStorage.getItem('dark-theme') === 'true') {
  body.classList.add('dark-theme');
  themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-theme');

  if (body.classList.contains('dark-theme')) {
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('dark-theme', 'true');
  } else {
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('dark-theme', 'false');
  }
});

// Валидация формы
const contactForm = document.querySelector('.contact-form form');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');

// Функция для создания и отображения сообщения об ошибке
function showError(input, message) {
  // Удаляем предыдущее сообщение об ошибке, если оно есть
  const existingError = input.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Создаем новое сообщение об ошибке
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  // Добавляем сообщение после поля ввода
  input.parentElement.appendChild(errorDiv);
  
  // Добавляем класс error для поля с ошибкой
  input.classList.add('error');
}

// Функция для удаления сообщения об ошибке
function removeError(input) {
  const existingError = input.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  input.classList.remove('error');
}

// Валидация имени
function validateName() {
  const nameValue = nameInput.value.trim();
  if (nameValue === '') {
    showError(nameInput, 'Пожалуйста, введите ваше имя');
    return false;
  } else if (nameValue.length < 2) {
    showError(nameInput, 'Имя должно содержать минимум 2 символа');
    return false;
  } else {
    removeError(nameInput);
    return true;
  }
}

// Валидация email
function validateEmail() {
  const emailValue = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (emailValue === '') {
    showError(emailInput, 'Пожалуйста, введите ваш email');
    return false;
  } else if (!emailRegex.test(emailValue)) {
    showError(emailInput, 'Пожалуйста, введите корректный email');
    return false;
  } else {
    removeError(emailInput);
    return true;
  }
}

// Валидация сообщения
function validateMessage() {
  const messageValue = messageInput.value.trim();
  if (messageValue === '') {
    showError(messageInput, 'Пожалуйста, введите сообщение');
    return false;
  } else if (messageValue.length < 10) {
    showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
    return false;
  } else {
    removeError(messageInput);
    return true;
  }
}

// Добавляем обработчики событий для валидации при вводе
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

// Обработчик отправки формы
contactForm.addEventListener('submit', function(event) {
  // Проверяем все поля перед отправкой
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();
  
  // Если хотя бы одно поле не прошло валидацию, отменяем отправку формы
  if (!isNameValid || !isEmailValid || !isMessageValid) {
    event.preventDefault();
  }
});