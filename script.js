document.addEventListener("DOMContentLoaded", () => {
  const username = sessionStorage.getItem("username");
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  if (!username || !userData) {
    location.href = "index.html";
    return;
  }

  document.getElementById("welcome-message").textContent =
    `${userData.course.toUpperCase()}コースの${userData.grade}年${userData.class}組の${userData.number}番の${userData.name}さん、ようこそ！`;

  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", () => {
    sessionStorage.clear();
    location.href = "index.html";
  });

  showSection("home");
});

function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(sec => sec.classList.remove("active"));

  document.getElementById(`${sectionId}-section`).classList.add("active");

  const buttons = document.querySelectorAll(".nav-buttons button");
  buttons.forEach(btn => btn.classList.remove("active"));
  document.getElementById(`btn-${sectionId}`).classList.add("active");
}

function linkGoogle() {
  alert("Google連携機能は今後実装予定です。");
}

function unlinkGoogle() {
  alert("Google連携解除は今後実装予定です。");
}
