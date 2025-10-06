// ====== Show / Hide Pages ======
function showHome() {
  hideAllPages();
  document.getElementById("homePage").classList.remove("hidden");
}

function showRegister() {
  hideAllPages();
  document.getElementById("registerPage").classList.remove("hidden");
}

function showLogin() {
  hideAllPages();
  document.getElementById("loginPage").classList.remove("hidden");
}

function showDashboard() {
  hideAllPages();
  document.getElementById("dashboardPage").classList.remove("hidden");
}

function hideAllPages() {
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("registerPage").classList.add("hidden");
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("dashboardPage").classList.add("hidden");
}

// ====== Registration ======
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", function(e) {
  e.preventDefault();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let newUser = {
    name: document.getElementById("regName").value.trim(),
    email: document.getElementById("regEmail").value.trim().toLowerCase(),
    password: document.getElementById("regPassword").value.trim(),
    balance: parseFloat(document.getElementById("regBalance").value.trim()) || 0,
    transactions: []
  };

  // Check if email already exists
  if (users.some(u => u.email === newUser.email)) {
    alert("Email already registered. Please login.");
    showLogin();
    return;
  }

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful! Please login.");
  showLogin();
});

// ====== Login ======
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let email = document.getElementById("loginEmail").value.trim().toLowerCase();
  let password = document.getElementById("loginPassword").value.trim();

  let user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    showDashboard();
    updateDashboard();
  } else {
    alert("Invalid credentials. Please try again.");
  }
});

// ====== Update Dashboard ======
function updateDashboard() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  document.getElementById("welcomeMessage").textContent = `Welcome, ${user.name}!`;

  // Update transaction history table
  const historyTable = document.getElementById("historyTable");
  historyTable.innerHTML = ""; // clear previous rows

  let last5 = user.transactions.slice(-5).reverse();
  last5.forEach(tx => {
    let row = `<tr>
      <td>${tx.recipient}</td>
      <td>${tx.date}</td>
      <td>${tx.type}</td>
      <td>${tx.id}</td>
      <td>${tx.amount.toFixed(2)}</td>
    </tr>`;
    historyTable.innerHTML += row;
  });
}
