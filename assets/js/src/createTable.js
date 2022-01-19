function createCells(arr, el) {
  let html = ''
  arr.forEach(cell => html += `<${el}>${cell}</${el}>`)
  return html;
}

function createTableBodyRows(bodyRows) {
  let html = ''
  bodyRows.forEach((row) => html += `\n<tr>${createCells(row, 'td')}</tr>`)
  return html
}

function createTable(response) {
  const PARENT = document.getElementById('Data');
  const sheetData = response.result.values;
  const data = sheetData.slice(1, sheetData.length);
  const headerRow = data[0];
  const bodyRows = data.slice(1, data.length);  

  let html = `
  <table class="table table-dark table-striped table-hover">
    <thead>
      <tr>
        ${createCells(headerRow, 'th')}
      </tr>
    </thead>
    <tbody>
      ${createTableBodyRows(bodyRows)}
    </tbody>
  </table>`;
  PARENT.innerHTML = html;
  
}

export default createTable;