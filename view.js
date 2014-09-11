// view.js v0.1

$(function(){
	var cache = applicationCache;
	cache.addEventListener("updateready", function(){
		cache.swapCache();
		location.reload();
	});
	if (navigator.onLine){
		cache.update();
	}
	
	$("#q").focus();
	refresh();
	
	$("#add").submit(function(){ return (add()); });
	$(":radio").click(function(){ refresh(); });
	$("#delete_all").click(function(){ delete_all(); });
});

function add(){
	todayocore.add({ label: $("#q").val() });
	$("#q").val("");
	refresh();
	return (false);
}

function checked(e){
	var target = $(e.target);
	todayocore.complete(target.attr("id"), target.is(":checked"));
}

function refresh(){
	var tasks = todayocore.get();
	var displays_all = $("#display-all").is(":checked");
	var html = '<div data-role="controlgroup">';
	var exists = false;
	
	for (var i in tasks){
		exists = true;
		var t = tasks[parseInt(i)];
		if (displays_all || !t["is_completed"]){
			html += 
				'<input type="checkbox" name="' + t["id"] + '" id="' + t["id"] + '"' + 
				(t["is_completed"] ? ' checked="checked"' : '') + '>' +
				'<label for="' + t["id"] + '">' + t["label"] + '</label>'
			;
		}
	}
	
	if (!exists){
		html += "なにもありません。タスクを追加してください。";
	}
	
	html += '</div>';
	
	$("#tasks")
		.empty()
		.append(html)
		.trigger("create")
	;
	$(":checkbox").click(function(e){ checked(e); });
}

function delete_all(){
	if (confirm("すべてのタスクを削除します")){
		todayocore.delete_all();
		refresh();
	}
	return (false);
}