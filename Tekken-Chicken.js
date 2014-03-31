$(document).ready(function(){
    var $dataTable;

    (function(){
        $dataTable = $('#framedata').dataTable({
            "bPaginate": false,
            "bRetrieve": true,
			"bAutoWidth": false,
            "oLanguage": { "sSearch": "" },
            "aoColumns": [
                { "sTitle": "Command", "sWidth": "16.66%" },
                { "sTitle": "Orientation", "sWidth": "16.66%" },
                { "sTitle": "Damage", "sWidth": "16.66%" },
                { "sTitle": "Frames", "sWidth": "12.5%" },
                { "sTitle": "Block", "sWidth": "12.5%" },
                { "sTitle": "Hit", "sWidth": "12.5%" },
                { "sTitle": "CH", "sWidth": "12.5%" },
                { "bSearchable": true, "bVisible": false, "sDefaultContent": "" },
            ],
            "bSortCellsTop": true,
        })
        .columnFilter({sPlaceHolder:"head:after"});
    })();
$('.cleartable').on("click",function(){
	$dataTable.fnClearTable();
});
$('.clearsearch').on('click',function(){
	$dataTable.fnFilter('',0);
	$dataTable.fnFilter('',1);
	$dataTable.fnFilter('',2);
	$dataTable.fnFilter('',3);
	$dataTable.fnFilter('',4);
	$dataTable.fnFilter('',5);
	$dataTable.fnFilter('',6);
	$dataTable.fnFilter('');
});
    $('.dataTables_filter input')
        .addClass('search clearable')
        .attr("placeholder", "Type here to filter your frame data!")
        .focus();

    $('body').on('click', '.show', function(event) {
        var name = event.target.dataset.name,
            url = name + '.json';

        $.getJSON(url)
            .fail(function() {
                alert('error');
            })
            .done(function(data) {
                // render table after every successful ajax call
                var data = processJson(data);
                renderTable(data);
            });
    });

    function renderTable(data) {
        $dataTable.fnClearTable(); // clear the table
        $dataTable.fnAddData(data); // reload table with new data
    }

    function processJson(json) {
        // you don't need to create and html string here,
        // just return a 2d array

        var dataSource = [],
            attacks = json.FrameData[0].attacks;
        for (var i = 0; i < attacks.length; i++) {
            var row = [];
            for (var property in attacks[i]) {
                if (attacks[i].hasOwnProperty(property)) {
                    row.push(attacks[i][property]);
                }
            }
            dataSource.push(row);
        }
        return dataSource;
    }

});