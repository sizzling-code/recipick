// Handle Login
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;
      alert(`Login attempted!\nUsername: ${username}\nPassword: ${password}`);
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const pass = document.getElementById("regPassword").value;
      const confirm = document.getElementById("regConfirm").value;

      if (pass !== confirm) {
        alert("Passwords do not match!");
        return;
      }

      const username = document.getElementById("regUsername").value;
      const email = document.getElementById("regEmail").value;
      alert(`Registered!\nUsername: ${username}\nEmail: ${email}`);
    });
  }
});

