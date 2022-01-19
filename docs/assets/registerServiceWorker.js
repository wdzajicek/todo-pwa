function registerServiceWorker() {
  navigator.serviceWorker.register('/todo-pwa/serviceworker.js', { scope: '/todo-pwa/'})
    .then((reg) => {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch((error) => {
      // registration failed
      console.log('Registration failed with ' + error);
    });
}

export default registerServiceWorker;