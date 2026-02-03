const form = document.getElementById("loginForm");
const errorBox = document.getElementById("loginError");
const loginBtn = form.querySelector(".btn-login");

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

  // Button state
  loginBtn.textContent = "VERIFYING...";
  loginBtn.disabled = true;

  try {
    const res = await fetch("user.json");
    const data = await res.json();

    const user = data.user.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      showError("Invalid email or password.");
      resetButton();
      return;
    }

    // ✅ Başarılı giriş
    localStorage.setItem("tbc_logged_in", "true");
    localStorage.setItem("tbc_user_email", email);

    // ✅ YÖNLENDİRMELER
    if (email === "admin@tbcrussia.com") {
      window.location.href = "index-russia.html";
    }
    else if (email === "tbc@goldconnect.com") {
      window.location.href = "jewelery.html";
    }
    else if (email === "tbcadmin@goldconnect.ru") {
      window.location.href = "jewelery-russia.html";
    }
     else if (email === "tbcadmin@goldconnect.uk") {
      window.location.href = "jewelery-uk.html";
    }
    else {
      window.location.href = "index.html";
    }

  } catch (err) {
    showError("Login system is temporarily unavailable.");
    resetButton();
  }
});

function showError(message) {
  errorBox.textContent = message;
  errorBox.style.display = "block";
}

function resetButton() {
  loginBtn.textContent = "LOGIN";
  loginBtn.disabled = false;
}
