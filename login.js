document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Mock login
  const email = this.querySelector("input[type=email]").value;
  const pass = this.querySelector("input[type=password]").value;

  if (!email || !pass) {
    alert("Please fill all fields");
    return;
  }

  // Fake success
  this.querySelector(".btn-login").textContent = "VERIFYING...";
  this.querySelector(".btn-login").disabled = true;

  setTimeout(() => {
    this.querySelector(".btn-login").textContent = "LOGIN";
    this.querySelector(".btn-login").disabled = false;
  }, 1200);
});

const form = document.getElementById("loginForm");
const errorBox = document.getElementById("loginError");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorBox.style.display = "none";
  errorBox.textContent = "";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    showError("Email and password are required.");
    return;
  }

  try {
    const res = await fetch("users.json");
    const data = await res.json();

    const user = data.users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      showError("Invalid email or password.");
      return;
    }

    // ✅ Başarılı giriş
    localStorage.setItem("tbc_logged_in", "true");
    localStorage.setItem("tbc_user_email", email);

    // ✅ RUSSIA KONTROLÜ
    if (email === "admin@tbcrussia.com") {
      window.location.href = "index-russia.html";
    } else {
      window.location.href = "index.html";
    }

  } catch {
    showError("Login system is temporarily unavailable.");
  }
});

function showError(message){
  errorBox.textContent = message;
  errorBox.style.display = "block";
}
