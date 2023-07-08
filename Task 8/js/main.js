let popupBg = document.querySelector('.popup__bg');
let popup = document.querySelector('.popup');
let openPopupButtons = document.querySelectorAll('.btn');
let closePopupButton = document.querySelector('.close-popup');

let names = document.getElementById('inputName');
let email = document.getElementById('inputEmail');
let msg = document.getElementById('inputMsg');
let cb = document.getElementById('inputCB');

function save() {
  localStorage.setItem('Имя', names.value);
  localStorage.setItem('Почта', email.value);
  localStorage.setItem('Сообщение', msg.value);
  if (cb.checked) {
    localStorage.setItem('Чекбокс', 1);
  } else {
    localStorage.setItem('Чекбокс', 0);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  names.value = localStorage.getItem('Имя');
  email.value = localStorage.getItem('Почта');
  msg.value = localStorage.getItem('Сообщение');
  let checkBox = localStorage.getItem('Чекбокс');
  if (checkBox == 1) {
    cb.checked = true;
  } else if (checkBox == 0) {
    cb.checked = false;
  }

  names.oninput = save;
  email.oninput = save;
  msg.oninput = save;
  cb.oninput = save;

  openPopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      window.onpopstate = function () {
        window.history.back();
        popupBg.classList.remove('active');
        popup.classList.remove('active');
      };
      history.pushState({ page: 1 }, 'modal', '?modal');
      popupBg.classList.add('active');
      popup.classList.add('active');
    });
  });

  closePopupButton.addEventListener('click', () => {
    window.history.back();
    popupBg.classList.remove('active');
    popup.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg) {
      window.history.back();
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    }
  });

  $(function () {
    $('#form').submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'https://formcarry.com/s/2-eqWanmX',
        data: $(this).serialize(),
        success: function (response) {
          if (response.status == 'success') {
            alert('Успешно!');
            localStorage.removeItem('Имя');
            localStorage.removeItem('Почта');
            localStorage.removeItem('Сообщение');
            localStorage.removeItem('Чекбокс');
            names.value = localStorage.getItem('Имя');
            email.value = localStorage.getItem('Почта');
            msg.value = localStorage.getItem('Сообщение');
            cb.checked = false;
          }
        },
        error: function (jqxhr, status, errorMsg) {
          alert('Ошибка!');
        },
      });
    });
  });
});
