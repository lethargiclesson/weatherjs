
const appContainer = document.querySelector('.app-container');

export default (error) => {
  appContainer.classList.add('opacity-0');
  appContainer.innerHTML = `
  <p class="text-white text-3xl">${error.message}!  ${error.status == 401 ? 'Não autorizado' : error.status}</p>
  <button class="reload focus:outline-none hover:text-blue-100" type="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
    </svg>
  </button>
  `;
  appContainer.classList.remove('opacity-0');

  const reloadBtn = document.querySelector('.reload');

  reloadBtn.addEventListener('click', () => {
    location.reload();
  });
};