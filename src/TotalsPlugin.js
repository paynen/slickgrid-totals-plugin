function TotalsPlugin(scrollbarWidth) {
  this._scrollbarWidth = scrollbarWidth;
}

TotalsPlugin.prototype._scrollOffset = 0;

TotalsPlugin.prototype._scrollbarWidth = 16;

TotalsPlugin.prototype._rowHeight = 0;

TotalsPlugin.prototype._$totalsViewport = null;

TotalsPlugin.prototype._$totals = null;

TotalsPlugin.prototype.init = function (grid) {
  this._grid = grid;
  this._rowHeight = grid.getOptions().rowHeight;

  var viewport = grid.getCanvasNode().parentElement;
  var width = viewport.offsetWidth;
  if (viewport.scrollHeight > viewport.offsetHeight) {
    width -= this._scrollbarWidth;
  }

  var style = 'top: -' + this._rowHeight + 'px; width: ' + width + 'px;';
  var totalsViewport = '<div style="' + style + '" class="slick-viewport totals-viewport">';
  viewport.insertAdjacentHTML('afterend', totalsViewport);
  this._$totalsViewport = $('.totals-viewport');
  this._appendTotalsRow(grid);

  grid.onColumnsResized.subscribe(this._handleColumnsResized.bind(this));
  grid.onColumnsReordered.subscribe(this._handleColumnsReordered.bind(this));
  grid.onScroll.subscribe(this._handleScroll.bind(this));
};

TotalsPlugin.prototype.destroy = function () {
  this._$totalsViewport.remove();
};

TotalsPlugin.prototype._appendTotalsRow = function (grid) {
  var width = grid.getCanvasNode().offsetWidth;
  var style = 'top: -' + this._rowHeight + 'px; width: ' + width + 'px; position: relative;';
  var $totalsRow = $('<div style="' + style + '" class="ui-widget-content slick-row totals"></div>');
  var totals = grid.getData().getTotals();
  var columns = grid.getColumns();
  var $cell;

  for (var i = 0, l = columns.length; i < l; i++) {
    $cell = $('<div class="slick-cell"></div>').addClass('l' + i + ' r' + i).text(totals[columns[i].id]);
    $totalsRow.append($cell);
  }

  this._$totalsViewport.empty().append($totalsRow);
  this._$totals = $totalsRow;
};

TotalsPlugin.prototype._handleColumnsResized = function (event, update) {
  var viewport = update.grid.getCanvasNode().parentElement;
  var top = (viewport.scrollWidth > viewport.offsetWidth) ? this._rowHeight + this._scrollbarWidth : this._rowHeight;
  this._$totals.width(viewport.scrollWidth);
  this._$totalsViewport.css('top', top * -1 + 'px')
};

TotalsPlugin.prototype._handleColumnsReordered = function(event, update) {
  this._appendTotalsRow(update.grid);
};

TotalsPlugin.prototype._handleScroll = function(event, update) {
  if (this._scrollOffset != update.scrollLeft) {
    this._scrollOffset = update.scrollLeft;
    this._$totals.css('left', this._scrollOffset * -1);
  }
};
