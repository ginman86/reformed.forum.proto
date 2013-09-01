var viewModels, nav, access;


viewModels =
{
	programs: null,
	essays:   null,
	search:   null
};

$(document).ready(function () {	
	access.loadViewModels();	

	initFooter();

	$(".essayBtn").on
	('click', 
	function(e)
	{
		nav.essays();
	});

	$(".programBtn").on
	('click', 
	function(e)
	{
		nav.programs();
	});

	var header = $("#header-main").html();
	$("[id^=header]").empty().append(header);	

	$("div[data-role='collapsible-set']").hide();

	// $('.search-mini').on
	// ('keypress',
	// function(e)
	// {
	// 	access.search($(this).val());
	// });

});

nav =
{
	essays:
	function()
	{
		access.loadViewModels();
	},
	programs:
	function()
	{
		access.loadViewModels();
	}
};

access = 
{
	loadViewModels:
	function()
	{
		if (viewModels.essays == null)
		{
			access.loadPosts();
		}
		if (viewModels.programs == null)
		{
			access.loadPrograms();
		}
	},
	loadPrograms:
	function ()
	{			
		var feed;
		$.getJSON
		(
			"http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=" +
			"http://feeds.feedburner.com/ReformedForum?format=xml"  + 
			"&num=10" +
		  	"&callback=?", 
			null, 
			function(response)
			{							
				if (response && response.responseData && response.responseData.feed) 
				{	
					feed = ko.mapping.fromJS(response.responseData.feed);
					viewModels.programs = feed.entries;
					ko.applyBindings(viewModels.programs(), $('#programs').get(0));
					$("div[data-role='collapsible-set']", $('#programs')).show();
					$('#programs').trigger('create');	
				}
			}
		);
	},
	loadPosts:
	function ()
	{			
		var feed;
		$.getJSON
		(
			"http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=" +
			"http://reformedforum.org/feed/?post_type=post"  + 
		  	"&callback=?", 
			null, 
			function(response)
			{							
				if (response && response.responseData && response.responseData.feed) 
				{				
					feed = ko.mapping.fromJS(response.responseData.feed);
					viewModels.essays = feed.entries;
					ko.applyBindings(viewModels.essays, $('#essays').get(0));
					$("div[data-role='collapsible-set']", $('#essays')).show();
					$('#essays').trigger('create');	
				}
			}
		);
	},
	search:
	function (searchTerm)
	{			
		var feed;
		$.getJSON
		(
			"http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=" +
			"http://reformedforum.org/feed?s="  + searchTerm + 
		  	"&callback=?", 
			null, 
			function(response)
			{							
				if (response && response.responseData && response.responseData.feed) 
				{				
					if (response.responseData.feed.entries && response.responseData.feed.entries.length > 0)
					{
						feed = ko.mapping.fromJS(response.responseData.feed);
						viewModels.search = feed.entries;
						ko.applyBindings(viewModels.search, $('#search').get(0));
						$('#search').trigger('create');						
					}
					else
					{
						$(".searchResults").hide();	
					}
				}
			}
		);
	}
};

function initFooter()
{		
	var footer = $("#footer-main").html();
	$("[id^=footer]").empty().append(footer).trigger("create");

}





		
		

