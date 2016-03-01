jQuery(function ($) {

    'use strict';

	var App = {

		init: function () {
			this.initTable();
			this.cacheElements();
			this.bindEvents();
		},

		initTable: function () {
	        this.$dataTable = $('#framedata').dataTable({
	            "bPaginate": false,
	            "bRetrieve": true,
	            "bAutoWidth": false,
	            "oLanguage": { "sSearch": "" },
				"oSearch": { "bSmart": false, "bRegex": true },
	            "aoColumns": [
	            	{ "sTitle": "Command", "sWidth": "16.66%" },
	            	{ "sTitle": "Orientation", "sWidth": "16.66%" },
	            	{ "sTitle": "Damage", "sWidth": "16.66%" },
	            	{ "sTitle": "Frames", "sWidth": "12.5%" },
	            	{ "sTitle": "Block", "sWidth": "12.5%" },
	            	{ "sTitle": "Hit", "sWidth": "12.5%" },
	            	{ "sTitle": "CH", "sWidth": "12.5%" },
	            	{ "bSearchable": true, "bVisible": false, "sDefaultContent": ""}
	            ],
	            "bSortCellsTop": true,
	        })
	        .columnFilter({
	        	sPlaceHolder: "head:after"
	        });

		    $('.dataTables_filter input')
		        .attr("placeholder", "Type here to filter your frame data!")
		        .addClass('search')
		        .focus();
		},

		cacheElements: function () {
			this.$body = $('body');
			this.$htmlAndBody = $('html, body');
			this.$menu = this.$body.find('.menu');
			this.$navicon = $('#navicon');
			this.$intro = $('.intro');
			this.$logo = $('.logo');
			this.$cleartable = $('.cleartable');
			this.$clearsearch = $('.clearsearch')
		},

		bindEvents: function () {
			this.$navicon.on('click', this.toggleMenu);
			this.$body.on('click', '.show', this.renderUI);
			this.$body.on('click', '#top', this.slideUp);
			this.$logo.hover(this.toggleInfo);
			this.$body.on('click', '.logo', this.scrollToBottom);
			this.$cleartable.on('click',function(){
				App.$dataTable.fnClearTable();
				$('thead, .dataTables_info').hide();
				});
			 this.$clearsearch.on('click',function(){
			 	App.$dataTable.fnFilter('',0);
			 	App.$dataTable.fnFilter('',1);
			 	App.$dataTable.fnFilter('',2);
			 	App.$dataTable.fnFilter('',3);
			 	App.$dataTable.fnFilter('',4);
			 	App.$dataTable.fnFilter('',5);
			 	App.$dataTable.fnFilter('',6);
			 	App.$dataTable.fnFilter('');
			 });
			// this.$clearsearch.on('click', this.resetFilters);
			this.$menu.on('click', function(e) {
				$('thead, tbody, .dataTables_info').show();
				App.$datatable.fnAdjustColumnSizing(true);
				});
		},

		resetFilters: function () {
			var self = App;
			self.$dataTable.fnResetAllFilters();
		},

		toggleInfo: function (e) {
			var self = App;
			self.$intro.toggle('fast');
		},

		toggleMenu: function () {
			var self = App;
			self.$menu.slideToggle('fast');
		},

		scrollToBottom: function () {
			var self = App;
			self.$htmlAndBody.animate({
	        	scrollTop: $("#content").offset().top
	    	}, 1000);
		},

		slideUp: function () {
			var self = App;
			self.$htmlAndBody.animate({scrollTop: 0}, 'fast');
		},



		renderUI: function (e) {
	        var self = App,
	        	$target = $(e.target || e.srcElement),
	            name = $target.data('name');

	        $.ajax(name + '.json')
	            .done(function(data) {
			        var data = App.processJSON(data);
			        self.$dataTable.fnClearTable();
			        self.$dataTable.fnAddData(data);
			        self.$navicon.text(name);
	            });

	        App.$menu.slideToggle('fast');
	        $('.dataTables_filter input').focus();
		},

		processJSON: function (json) {
	        var dataSource = [],
	            data = typeof json === 'string' ? JSON.parse(json) : json,
            	attacks = data.FrameData[0].attacks;

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
	};

	App.init();
});
