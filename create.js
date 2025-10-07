document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  
  form.addEventListener('submit', e => {
    const pass = form.password.value;
    const confirm = form.confirm.value;
    
    if (pass !== confirm) {
      e.preventDefault();
      alert('Passwords do not match.');
      form.confirm.focus();
      return;
    }
  });
});
