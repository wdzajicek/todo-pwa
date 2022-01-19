const COPYRIGHT_YEAR = document.getElementById('copyrightYear');

function footerDate() {
  const d = new Date;

  COPYRIGHT_YEAR.innerHTML = d.getFullYear();
}

export default footerDate;