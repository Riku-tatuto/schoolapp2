document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch("users.csv")
    .then(response => response.text())
    .then(data => {
      const lines = data.split("\n").slice(1); // 1行目はヘッダー
      let isAuthenticated = false;

      for (let line of lines) {
        const [csvUsername, csvPassword] = line.split(",");
        if (csvUsername === username && csvPassword === password) {
          isAuthenticated = true;
          break;
        }
      }

      if (isAuthenticated) {
        localStorage.setItem("loggedInUser", username); // セッション保持
        window.location.href = "home.html";
      } else {
        document.getElementById("error-banner").style.display = "block";
      }
    });
});

// ログアウト関数（他のJSファイルでも使うなら共通関数に）
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
