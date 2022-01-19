function highlightNavItem() {
  const nav = document.querySelector('nav.navbar');
  const linkList = nav.querySelectorAll('a.nav-link');
  const path = window.location.pathname.replace(/\/$/, '');

  function highlightActiveLink(link) {
    link.classList.add('active');
    return link.setAttribute('aria-current', 'page');
  }

  linkList.forEach((link) => {
    if (link.innerText == 'Home' && window.location.pathname == '/') {
      return highlightActiveLink(link);
    }
    if (path == link.getAttribute('href')) {
      return highlightActiveLink(link);
    }
  });
}

export default highlightNavItem;