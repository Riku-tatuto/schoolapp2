// auth.js（すべての保護ページで読み込む）
document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (!isLoggedIn || isLoggedIn !== 'true') {
    // ログインしていない場合はログインページへリダイレクト
    window.location.href = "index.html";
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorBanner = document.getElementById("error-banner");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("users.csv");
      const text = await res.text();

      const lines = text.split("\n").slice(1); // ヘッダー除く
      let isAuthenticated = false;

      for (const line of lines) {
        const [csvUser, csvPass, name, course, grade, classNum, number] = line.trim().split(",");

        if (username === csvUser && password === csvPass) {
          // セッション保存
          sessionStorage.setItem("name", name);
          sessionStorage.setItem("course", course.toUpperCase() + "コース");
          sessionStorage.setItem("grade", grade);
          sessionStorage.setItem("class", classNum);
          sessionStorage.setItem("number", number);
          isAuthenticated = true;
          break;
        }
      }

      if (isAuthenticated) {
        location.href = "home.html";
      } else {
        errorBanner.style.display = "block";
      }

    } catch (err) {
      console.error("CSV読み込みエラー", err);
    }
  });
});
