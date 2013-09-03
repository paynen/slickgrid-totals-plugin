function TotalsPlugin() {
}

TotalsPlugin.prototype._scrollOffset = 0;

TotalsPlugin.prototype._rowHeight = 0;

TotalsPlugin.prototype.init = function (grid) {
  console.log('initialise plugin', arguments);
  this._grid = grid;
  this._rowHeight = grid.getOptions().rowHeight;;
  this._appendTotalsRow(grid);
  grid.onColumnsResized.subscribe(this._handleColumnsResized.bind(this));
  grid.onScroll.subscribe(this._handleScroll.bind(this));
};

TotalsPlugin.prototype.destroy = function () {
};

TotalsPlugin.prototype._appendTotalsRow = function (grid) {
  var width = grid.getCanvasNode().getBoundingClientRect().width;
  var style = 'top: -' + this._rowHeight + 'px; width: ' + width + 'px; position: relative;';
  var totalsRow = '<div style="' + style + '" class="ui-widget-content slick-row totals">';
  var totals = grid.getData().getTotals();
  var columns = grid.getColumns();

  for (var i = 0, l = columns.length; i < l; i++) {
    totalsRow += '<div class="slick-cell r' + i + ' l' + i + '">' + totals[columns[i].id] + '</div>';
  }

  totalsRow += '</div>';

  grid.getCanvasNode().parentElement.insertAdjacentHTML('afterend', totalsRow);
};

TotalsPlugin.prototype._handleColumnsResized = function () {
  var canvasNode = grid.getCanvasNode();
  var viewportWidth = canvasNode.parentElement.getBoundingClientRect().width;
  var columnsWidth = canvasNode.getBoundingClientRect().width;

  var top = (columnsWidth > viewportWidth) ? this._rowHeight - $.getScrollbarWidth() : this._rowHeight;
  $('.slick-row.totals').width(columnsWidth).css('top', top * -1 + 'px')

};

TotalsPlugin.prototype._handleScroll = function(event, update) {
  if (this._scrollOffset != update.scrollLeft) {
    this._scrollOffset = update.scrollLeft;
    $('.slick-row.totals').css('left', this._scrollOffset * -1);
  }
};
