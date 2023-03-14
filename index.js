const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');
const dateInput = document.getElementById('date');
const commentsList = document.getElementById('comments');

const nameError = document.getElementById('name-error');
const commentError = document.getElementById('comment-error');
const nameErrorText = 'Имя обязательно';
const commentErrorText = 'Поле комментария не может быть пустым';

const createComment = ({ name, comment, date }) => {
  const commentItem = document.createElement('li');
  commentItem.className = 'comment-item';

  commentItem.innerHTML = `      
      <article>
        <p class="comment-text">           
          ${comment}
        </p>
        <div class="comment-bottom">
          <div class="comment-info">              
            <span class="comment-author">
              <span class="visually-hidden">Автор комментария:</span>                 
              ${name}
            </span>
            <span class="comment-date">
              <span class="visually-hidden">Комментарий создан:</span>                  
              ${date}
            </span>
          </div>

          <div class="comment-actions">
            <button class="btn like-btn">
              <span class="visually-hidden like-btn-text">Лайкнуть комментарий</span>
            </button>
            <button class="btn delete-btn">
              <span class="visually-hidden">Удалить комментарий</span>
            </button>
          </div>
        </div>
      </article>`;

  const deleteBtn = commentItem.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    commentsList.removeChild(commentItem);
  });

  const likeBtn = commentItem.querySelector('.like-btn');
  const likeBtnText = likeBtn.querySelector('.like-btn-text');

  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('liked');
    likeBtnText.textContent = likeBtn.classList.contains('liked')
      ? 'Убрать лайк'
      : 'Поставить лайк';
  });

  return commentItem;
};

const makeDateMessage = (date) => {
  const dateObj = new Date(date);
  const options = { hour: 'numeric', minute: 'numeric' };

  const today = new Date();
  const currentTime = today.toLocaleTimeString('ru-RU', options);

  if (dateObj.toDateString() === today.toDateString()) {
    return `сегодня, ${currentTime}`;
  }

  if (
    dateObj.getDate() + 1 === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  ) {
    return `вчера, ${currentTime}`;
  }

  return dateObj.toLocaleDateString('ru-RU');
};

const validate = ({ target }) => {
  const { name, value } = target;

  if (name === 'name') {
    if (value.trim() === '') {
      nameError.textContent = `${nameErrorText}`;
    } else {
      nameError.textContent = '';
    }
  }

  if (name === 'comment') {
    if (value.trim() === '') {
      commentError.textContent = `${commentErrorText}`;
    } else {
      commentError.textContent = '';
    }
  }
};

const handleSubmit = (e) => {
  if (!e.key) e.preventDefault();

  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (!name) nameError.textContent = `${nameErrorText}`;
  if (!comment) commentError.textContent = `${commentErrorText}`;

  if (nameError.textContent !== '') return;
  if (commentError.textContent !== '') return;

  const date = dateInput.value || new Date();

  const commentItem = createComment({
    name,
    comment,
    date: makeDateMessage(date),
  });

  commentsList.appendChild(commentItem);

  form.reset();
  nameInput.blur();
  commentInput.blur();
};

form.addEventListener('submit', handleSubmit);
nameInput.addEventListener('input', validate);
commentInput.addEventListener('input', validate);

nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleSubmit(e);
  }
});

commentInput.addEventListener('keydown', (e) => {
  if (e.shiftKey && e.key === 'Enter') return;

  if (e.key === 'Enter') {
    e.preventDefault();
    handleSubmit(e);
  }
});
