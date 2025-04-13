document.addEventListener("DOMContentLoaded", () => {
  const course = sessionStorage.getItem("course");
  const grade = sessionStorage.getItem("grade");
  const classNum = sessionStorage.getItem("class");
  const number = sessionStorage.getItem("number");
  const name = sessionStorage.getItem("name");

  // ようこそメッセージ
  document.getElementById("welcome").textContent =
    `ようこそ、${course}の${grade}年${classNum}組の${number}番の${name}さん！`;

  // ページ切り替え
  document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".menu-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const page = item.dataset.page;
      document.querySelectorAll(".page").forEach(p => p.style.display = "none");
      document.getElementById(page).style.display = "block";

      if (page === "schedule") {
        showSchedule(course);
      }
    });
  });

  // ログアウト
  document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.clear();
    location.href = "index.html";
  });

  function showSchedule(course) {
    const timetableDiv = document.getElementById("timetable");
    let scheduleHTML = "";

    if (course.includes("AG")) {
      scheduleHTML = getAGSchedule();
    } else if (course.includes("SG")) {
      scheduleHTML = getSGSchedule();
    } else {
      scheduleHTML = getDefaultSchedule();
    }

    timetableDiv.innerHTML = scheduleHTML;
  }

  function getAGSchedule() {
    return `
      <table>
        <tr><th>曜日</th><th>1限</th><th>2限</th><th>3限</th><th>4限</th><th>中</th><th>5限</th><th>6限</th></tr>
        <tr><td>月曜</td><td>国語<br>301<br>田中</td><td>英語<br>202<br>山田</td><td>数学<br>203<br>佐藤</td><td>理科<br>305<br>吉田</td><td>—</td><td>社会<br>204<br>高橋</td><td>体育<br>体育館<br>加藤</td></tr>
        <!-- 以下省略・必要なら追加 -->
      </table>
    `;
  }

  function getSGSchedule() {
    return `
      <table>
        <tr><th>曜日</th><th>1限</th><th>2限</th><th>3限</th><th>4限</th><th>中</th><th>5限</th><th>6限</th></tr>
        <tr><td>月曜</td><td>化学<br>402<br>中村</td><td>英語<br>202<br>鈴木</td><td>数学<br>203<br>佐々木</td><td>体育<br>体育館<br>田村</td><td>—</td><td>国語<br>301<br>渡辺</td><td>社会<br>204<br>斎藤</td></tr>
        <!-- 以下省略 -->
      </table>
    `;
  }

  function getDefaultSchedule() {
    return `
      <table>
        <tr><th>曜日</th><th>1限</th><th>2限</th><th>3限</th><th>4限</th><th>昼</th><th>5限</th></tr>
        <tr><td>月曜</td><td>情報<br>401<br>大野</td><td>英語<br>202<br>佐野</td><td>数学<br>203<br>青木</td><td>社会<br>204<br>岡田</td><td>—</td><td>体育<br>体育館<br>中田</td></tr>
        <!-- 以下省略 -->
      </table>
    `;
  }
});
