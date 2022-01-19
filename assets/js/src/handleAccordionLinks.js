const ACCORDION = document.querySelector('.accordion');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const scrollSettings = {
  settings() {
    return {
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'center'
    }
  }
}

function findQuery(query, hash, collapseEl) {
  const id = query.replace(/\?id=/, '#');
  const collapse = document.querySelector(hash);
  const target = collapse.querySelector(id) ? collapse.querySelector(id) : collapse

  collapse.addEventListener('shown.bs.collapse', () => {
    target.scrollIntoView(scrollSettings.settings());
  });
  collapseEl.show();
}

function openAccordion(hash, Collapse) {
  const card = ACCORDION.querySelector(hash);
  const collapseEl = Collapse.getOrCreateInstance(card, { toggle: false });

  if (window.location.search) {
    findQuery(window.location.search, hash, collapseEl);
  } else {
    collapseEl.show();
    card.scrollIntoView(scrollSettings.settings())
  }
}

function checkForMatch(hash, Collapse) {
  if (document.querySelector(`[data-bs-target="${hash}"]`)) {
    openAccordion(hash, Collapse);
  }
}

function handleAccordionLinks(Collapse) {
  if (window.location.hash) {
    let hash = window.location.hash;

    checkForMatch(hash, Collapse);
  }
  window.addEventListener('hashchange', (e) => {
    let hash = window.location.hash;

    checkForMatch(hash, Collapse);
  })
}

export default handleAccordionLinks;