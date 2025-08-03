function saveQuizHistory(category, score) {
  const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  history.push({
    date: new Date().toLocaleString(),
    category,
    score
  });
  localStorage.setItem("quizHistory", JSON.stringify(history));
}

function renderQuizHistory() {
  const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  const list = document.getElementById("quiz-history-list");
  list.innerHTML = "";
  if (history.length === 0) {
    list.innerHTML = "<li>No quizzes taken yet.</li>";
    return;
  }
  history.reverse().forEach(entry => {
    const item = document.createElement("li");
    item.textContent = `${entry.date} — [${entry.category}] Scored: ${entry.score}`;
    list.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuizHistory();
});