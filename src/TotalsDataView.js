/**
 * A data provider that caclulates a total of all values for any column that has a hasTotal flag set to true.
 * @param {Slick.Data.DataView || []} data A slick grid data view or an array of data
 * @param {Object} columns The column definitions
 * @constructor
 */
function TotalsDataView(data, columns) {
  var totals = {};
  var totalsMetadata = {
    cssClasses: 'total-spacer-row',
    columns: {}
  };

  // Make the totals not editable.
  for (var i = 0; i < columns.length; i++) {
    totalsMetadata.columns[i] = {
      editor: null
    };
  }

  var self = this;

  if (data.onRowCountChanged) {
    data.onRowCountChanged.subscribe(function (e, args) {
      self.updateTotals();
    });
  }

  if (data.onRowsChanged) {
    data.onRowsChanged.subscribe(function (e, args) {
      self.updateTotals();
    });
  }

  this.getLength = function () {
    var length = data.getLength ? data.getLength() : data.length;
    return length + 1;
  };

  this.getItem = function (index) {
    return data.getItem ? data.getItem(index) : data[index];
  };

  this.getItemMetadata = function (index) {
    if (index == (this.getLength() - 1)) {
      return totalsMetadata;
    } else {
      return data.getItemMetadata ? data.getItemMetadata(index) : null;
    }
  };

  this.getTotals = function () {
    return totals;
  };

  this.updateTotals = function () {
    console.log("updating totals", columns);
    var columnIdx = columns.length;
    while (columnIdx--) {
      var column = columns[columnIdx];
      if (!column.hasTotal) {
        continue;
      }

      var total = 0;
      var i = this.getLength() - 1;
      var dataItems = data.getItems ? data.getItems() : data;
      while (i--) {
        total += (parseInt(dataItems[i][column.field], 10) || 0);
      }
      totals[column.id] = total;
    }
  };

  this.updateTotals();
}
