const toast = document.querySelector('#toast');
document.querySelector('#briefButton').addEventListener('click', () => {
  toast.textContent = 'Daily brief is being prepared ✦';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
});
document.querySelector('#askForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const question = document.querySelector('#question');
  if (!question.value.trim()) return question.focus();
  toast.textContent = 'Your policy answer is on its way ✦';
  toast.classList.add('show');
  question.value = '';
  setTimeout(() => toast.classList.remove('show'), 2800);
});
document.querySelectorAll('.suggestions button').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#question').value = button.textContent;
  document.querySelector('#question').focus();
}));
