/* eslint-disable */
var addSorting = (function () {
  'use strict';

  var cols,
      currentSort = {
          index: 0,
          desc: false
      };

  function getTable() {
      return document.querySelector('.coverage-summary');
  }

  function getTableHeader() {
      return getTable().querySelector('thead tr');
  }

  function getTableBody() {
      return getTable().querySelector('tbody');
  }

  function getNthColumn(n) {
      return getTableHeader().querySelectorAll('th')[n];
  }

  function onFilterInput() {
      const searchValue = document.getElementById('fileSearch').value;
      const rows = getTableBody().children;

      Array.from(rows).forEach(row => {
          const displayStyle = row.textContent.toLowerCase().includes(searchValue.toLowerCase()) ? '' : 'none';
          row.style.display = displayStyle;
      });
  }

  function addSearchBox() {
      const template = document.getElementById('filterTemplate');
      const templateClone = template.content.cloneNode(true);
      templateClone.getElementById('fileSearch').oninput = onFilterInput;
      template.parentElement.appendChild(templateClone);
  }

  function loadColumns() {
      const colNodes = getTableHeader().querySelectorAll('th');
      return Array.from(colNodes).map(colNode => ({
          key: colNode.getAttribute('data-col'),
          sortable: !colNode.getAttribute('data-nosort'),
          type: colNode.getAttribute('data-type') || 'string'
      }));
  }

  function loadRowData(tableRow) {
      const tableCols = tableRow.querySelectorAll('td');
      return Array.from(tableCols).reduce((data, colNode, i) => {
          const col = cols[i];
          const val = colNode.getAttribute('data-value');
          data[col.key] = col.type === 'number' ? Number(val) : val;
          return data;
      }, {});
  }

  function loadData() {
      const rows = getTableBody().querySelectorAll('tr');
      Array.from(rows).forEach(row => (row.data = loadRowData(row)));
  }

  function sortByIndex(index, desc) {
      const key = cols[index].key;
      const sorter = (a, b) => (a.data[key] < b.data[key] ? -1 : a.data[key] > b.data[key] ? 1 : 0);
      const finalSorter = desc ? (a, b) => -1 * sorter(a, b) : sorter;

      const tableBody = getTableBody();
      const rowNodes = tableBody.querySelectorAll('tr');
      const rows = Array.from(rowNodes);

      rows.sort(finalSorter);

      rows.forEach(row => tableBody.appendChild(row));
  }

  function removeSortIndicators() {
      const col = getNthColumn(currentSort.index);
      col.className = col.className.replace(/ sorted$/, '').replace(/ sorted-desc$/, '');
  }

  function addSortIndicators() {
      getNthColumn(currentSort.index).className += currentSort.desc ? ' sorted-desc' : ' sorted';
  }

  function enableUI() {
      cols.forEach((col, i) => {
          if (col.sortable) {
              const el = getNthColumn(i).querySelector('.sorter').parentElement;
              el.addEventListener('click', () => {
                  const desc = col.defaultDescSort;
                  if (currentSort.index === i) {
                      currentSort.desc = !currentSort.desc;
                  } else {
                      currentSort.index = i;
                      currentSort.desc = desc;
                  }
                  sortByIndex(i, currentSort.desc);
                  removeSortIndicators();
                  addSortIndicators();
              });
          }
      });
  }

  return function () {
      if (!getTable()) {
          return;
      }

      cols = loadColumns();
      loadData();
      addSearchBox();
      addSortIndicators();
      enableUI();
  };
})();

window.addEventListener('load', addSorting);
