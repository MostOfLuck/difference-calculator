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
      for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          row.style.display = row.textContent.toLowerCase().includes(searchValue.toLowerCase()) ? '' : 'none';
      }
  }

  function addSearchBox() {
      var template = document.getElementById('filterTemplate');
      var templateClone = template.content.cloneNode(true);
      templateClone.getElementById('fileSearch').oninput = onFilterInput;
      template.parentElement.appendChild(templateClone);
  }

  function loadColumns() {
      var colNodes = getTableHeader().querySelectorAll('th');
      return Array.from(colNodes).map(colNode => ({
          key: colNode.getAttribute('data-col'),
          sortable: !colNode.getAttribute('data-nosort'),
          type: colNode.getAttribute('data-type') || 'string'
      }));
  }

  function loadRowData(tableRow) {
      var tableCols = tableRow.querySelectorAll('td');
      return Array.from(tableCols).reduce((data, colNode, i) => {
          const col = cols[i];
          const val = colNode.getAttribute('data-value');
          data[col.key] = col.type === 'number' ? Number(val) : val;
          return data;
      }, {});
  }

  function loadData() {
      var rows = getTableBody().querySelectorAll('tr');
      Array.from(rows).forEach(row => (row.data = loadRowData(row)));
  }

  function sortByIndex(index, desc) {
      var key = cols[index].key;
      var sorter = (a, b) => (a.data[key] < b.data[key] ? -1 : a.data[key] > b.data[key] ? 1 : 0);
      var finalSorter = desc ? (a, b) => -1 * sorter(a, b) : sorter;

      var tableBody = getTableBody();
      var rowNodes = tableBody.querySelectorAll('tr');
      var rows = Array.from(rowNodes);

      rows.sort(finalSorter);

      rows.forEach(row => tableBody.appendChild(row));
  }

  function removeSortIndicators() {
      var col = getNthColumn(currentSort.index);
      col.className = col.className.replace(/ sorted$/, '').replace(/ sorted-desc$/, '');
  }

  function addSortIndicators() {
      getNthColumn(currentSort.index).className += currentSort.desc ? ' sorted-desc' : ' sorted';
  }

  function enableUI() {
      for (var i = 0; i < cols.length; i++) {
          if (cols[i].sortable) {
              var el = getNthColumn(i).querySelector('.sorter').parentElement;
              el.addEventListener('click', (function (index) {
                  return function () {
                      var desc = cols[index].defaultDescSort;
                      if (currentSort.index === index) {
                          desc = !currentSort.desc;
                      }
                      sortByIndex(index, desc);
                      removeSortIndicators();
                      currentSort.index = index;
                      currentSort.desc = desc;
                      addSortIndicators();
                  };
              })(i));
          }
      }
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
