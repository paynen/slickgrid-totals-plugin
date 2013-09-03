function TotalsDataProvider(data, columns) {
    var totals = {};
    var totalsMetadata = {
        columns: {}
    };

    // Make the totals not editable.
    for (var i = 0; i < columns.length; i++) {
        totalsMetadata.columns[i] = {
            editor: null
        };
    }


    this.getLength = function () {
        return data.length + 1;
    };

    this.getItem = function (index) {
        return data[index];
    };

    this.updateTotals = function () {
        var columnIdx = columns.length;
        while (columnIdx--) {
            var columnId = columns[columnIdx].id;
            var total = 0;
            var i = data.length;
            while (i--) {
                total += (parseInt(data[i][columnId], 10) || 0);
            }
            totals[columnId] = total;
        }
    };

    this.getItemMetadata = function (index) {
        return (index != data.length) ? null : totalsMetadata;
    };

    this.getTotals = function () {
        return totals;
    };

    this.updateTotals();
}
