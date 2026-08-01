const accountBtn = document.getElementById('accountBtn');

if(accountBtn){
  accountBtn.addEventListener('click', function(){
    window.location.href = "login.html";
  });
}
const loginForm = document.getElementById('loginForm');

if(loginForm){
  loginForm.addEventListener('submit', async function(e){
    e.preventDefault();

    let isValid = true;

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const successMsg = document.getElementById('successMsg');

    // Reset errors
    emailError.textContent = '';
    passwordError.textContent = '';
    email.classList.remove('input-error');
    password.classList.remove('input-error');
    successMsg.textContent = '';

    // Frontend validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.value.trim() === ''){
      emailError.textContent = 'Email is required.';
      email.classList.add('input-error');
      isValid = false;
    } else if(!emailPattern.test(email.value.trim())){
      emailError.textContent = 'Please enter a valid email.';
      email.classList.add('input-error');
      isValid = false;
    }

    if(password.value.trim() === ''){
      passwordError.textContent = 'Password is required.';
      password.classList.add('input-error');
      isValid = false;
    }

    if(!isValid) return;

    // Backend ko call karein
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.value.trim(),
          password: password.value
        })
      });

      const data = await response.json();

      if(response.ok){
        successMsg.textContent = '✓ ' + data.message;
        loginForm.reset();
      } else {
        passwordError.textContent = data.message;
        password.classList.add('input-error');
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Server se connect nahi ho pa raha. Kya backend chal raha hai?');
    }
  });
}
// SIGNUP FORM VALIDATION 
const signupForm = document.getElementById('signupForm');

if(signupForm){
  signupForm.addEventListener('submit', async function(e){  
    e.preventDefault();

    let isValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const successMsg = document.getElementById('successMsg');

    // Reset errors
    [nameError, emailError, passwordError, confirmPasswordError].forEach(el => el.textContent = '');
    [name, email, password, confirmPassword].forEach(el => el.classList.remove('input-error'));
    successMsg.textContent = '';

    // Name validation
    if(name.value.trim() === ''){
      nameError.textContent = 'Name is required.';
      name.classList.add('input-error');
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.value.trim() === ''){
      emailError.textContent = 'Email is required.';
      email.classList.add('input-error');
      isValid = false;
    } else if(!emailPattern.test(email.value.trim())){
      emailError.textContent = 'Please enter a valid email.';
      email.classList.add('input-error');
      isValid = false;
    }

    // Password validation
    if(password.value.length < 6){
      passwordError.textContent = 'Password must be at least 6 characters.';
      password.classList.add('input-error');
      isValid = false;
    }

    // Confirm password validation
    if(confirmPassword.value !== password.value || confirmPassword.value === ''){
      confirmPasswordError.textContent = 'Passwords do not match.';
      confirmPassword.classList.add('input-error');
      isValid = false;
    }

    if(!isValid) return;

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.value.trim(),
          email: email.value.trim(),
          password: password.value
        })
      });

      const data = await response.json();

      if(response.ok){
        successMsg.textContent = '✓ ' + data.message;
        signupForm.reset();
      } else {
        emailError.textContent = data.message;
        email.classList.add('input-error');
      }

    } catch (error) {
      console.error('Error:', error);
      alert('not connected to the server is backend works?');
    }
  });
}
