function getLocalStorage() {
  const language = localStorage.getItem('lang');
  return language || 'en';
}

function setLocalStorage(language) {
  localStorage.setItem('lang', language);
}

export { getLocalStorage, setLocalStorage };
