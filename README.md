slickgrid-totals-plugin
=======================
A plugin to add an always visible totals row to [slickgrid][1].

Usage
-----
To add the totals footer to a grid simply download the zip and extract it to your project.
Then include the css at the top of the page:

    <link rel="stylesheet" href="../src/TotalsPlugin.css" type="text/css"/>

and include the javascript after the slickgrid files:

    <script src="../src/TotalsDataView.js"></script>
    <script src="../src/TotalsPlugin.js"></script>

To add the footer you need to both register the plugin with the grid and use the totals data view.  The data view just
wraps your data and calculates the totals, it can be used with a simple array or an existing data view.  You should add
a field to your column definition of `hasTotal: true` to indicate that a total should be shown for that column.

#### Using with a data array

    var grid;
    var columns = [
      {id: "id", name: "Index", field: "id", hasTotal: true},
      {id: "title", name: "Title", field: "title"},
      {id: "duration", name: "Duration", field: "duration", hasTotal: true},
      {id: "%", name: "% Complete", field: "percentComplete", hasTotal: true},
      {id: "start", name: "Start", field: "start"},
      {id: "finish", name: "Finish", field: "finish"}
    ];

    var data = [
      {
        id:              1,
        title:           "Task 1",
        duration:        "5",
        percentComplete: Math.round(Math.random() * 100),
        start:           "01/01/2009",
        finish:          "01/05/2009"
      },
      {
        id:              2,
        title:           "Task 2",
        duration:        "5",
        percentComplete: Math.round(Math.random() * 100),
        start:           "01/01/2009",
        finish:          "01/05/2009"
      },
      {
        id:              3,
        title:           "Task 3",
        duration:        "5",
        percentComplete: Math.round(Math.random() * 100),
        start:           "01/01/2009",
        finish:          "01/05/2009"
      }
    ]

    var dataProvider = new TotalsDataView(data, columns);
    grid = new Slick.Grid("#myGrid", dataProvider, columns, options);
    var totalsPlugin = new TotalsPlugin($.getScrollbarWidth());
    grid.registerPlugin(totalsPlugin);

#### Using with a data view
A [data view][2] allows for more advanced operations on your grid data.  If you are using one you will still need to
wrap this in a totals data view and you probably want to listen for the row change events to recalculate and update the
totals.  The following shows an example of this and uses the data and columns from above.

    var dataView = new Slick.Data.DataView();
    dataView.setItems(data);

    var dataProvider = new TotalsDataView(dataView, columns);
    var grid = new Slick.Grid("#myGrid", dataProvider, columns, options);

    var totalsPlugin = new TotalsPlugin($.getScrollbarWidth());
    grid.registerPlugin(totalsPlugin);

    dataView.onRowCountChanged.subscribe(function (e, args) {
      grid.updateRowCount();
      grid.render();
      totalsPlugin.render();
    });

    dataView.onRowsChanged.subscribe(function (e, args) {
      grid.invalidateRows(args.rows);
      grid.render();
      totalsPlugin.render();
    });

Browser Support
---------------
This should work everywhere slickgrid does but it has only been tested on IE8 and 9 and Chrome.

If you find a problem please raise an [issue][3].


[1]: https://github.com/mleibman/SlickGrid/
[2]: https://github.com/mleibman/SlickGrid/wiki/DataView
[3]: https://github.com/paynen/slickgrid-totals-plugin/issues