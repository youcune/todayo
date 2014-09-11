// core.js
// saves data to client

todayocore = {};
todayocore.KEY = "todayo";
todayocore.VER = 0.1;
todayocore.DATA = null;

// get
// returns todo objects
todayocore.get = function (){
	this._load();
	return (this.DATA["tasks"]);
};

// add
// param todo object
// returns todo objects
todayocore.add = function (task){
	this._load();
	
	// fix task data
	task.id = ++ this.DATA["seq_num"];
	task.is_completed = false;
	
	this.DATA["tasks"].push(task);
	this._save();
};

// complete
// params todo_id, status
// returns todo objects
todayocore.complete = function (target, status){
	this._load();
	
	for (var i in this.DATA["tasks"]){
		var t = this.DATA["tasks"][parseInt(i)];
		if (t.id == target){
			t.is_completed = status;
		}
	}
	
	this._save();
};

// delete_all
todayocore.delete_all = function (){
	this.DATA = {
		token: "token",
		seq_num: 0,
		tasks: []
	};
	this._save();
}

// uninstall
todayocore.uninstall = function (){
	delete localStorage[this.KEY];
}

// private load
todayocore._load = function (){
	var store = localStorage[this.KEY];
	if (store == undefined || store == null){
		this.DATA = this._default_object();
	}
	else{
		// if exists data on localstrage
		this.DATA = JSON.parse(store);
	}
};

// private save
todayocore._save = function (){
	if (this.DATA != undefined && this.DATA != null){
		localStorage[this.KEY] = JSON.stringify(this.DATA)
	}
};

// private _default_object
// returns default todayo object
todayocore._default_object = function (){
	return ({
		token: "token",
		seq_num: 3,
		tasks: [
			{
				id: 1,
				label: "炊事",
				is_completed: false
			},
			{
				id: 2,
				label: "洗濯",
				is_completed: false
			},
			{
				id: 3,
				label: "掃除",
				is_completed: false
			}
		]
	});
}
