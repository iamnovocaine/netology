let users = {};

function makeid()
{
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function create(params, callback = null) {
	let newid = makeid();
	let newUser = {
		'id': newid,
        "name": params.name,
        "score": params.score
    }
	users[newid] = newUser;
    if(callback != null) {
		callback(null, users[newid])
	} else {
		return users[newid];
	}
	
	
}
function list(params, callback = null) {
    if(callback != null) {
		callback(null, users)
	} else {
		return users;
	}
}
function deleteFunc(params, callback = null) {
	if(params.id in users)	{
		let deleted = users[params.id];
		delete users[params.id];
	}
	else {
		if(callback != null) {
			callback('User not found', null);
		} else {
			return false;
		}	
	}
	if(callback != null) {
		callback(null, params.id);
	} else {
		return {'delete':params.id};
	}
	
}
function get(params, callback = null) {
	if(params.id in users) {
		if(callback != null) {
			callback(null, users[params.id]);
		} else {
			return users[params.id];
		}
	} else {
		if(callback != null) {
			callback('User not found', null);
		} else {
			return false;
		}
	}
}
function update(params, callback = null) {
	if(params.id in users) {
		users[params.id]['name'] = params.name;
		users[params.id]['score'] = params.score;
		if(callback != null) {
			callback(null, users[params.id]);
		} else {
			return users[params.id];
		}
	}
	else {
		if(callback != null) {
			callback('User not found', null);
		} else {
			return false;
		}
	}
}
function deleteMany(params, callback = null) {
	users = [];
	if(callback != null) {
		callback(null, {'delete': 'all'});
	} else {
		return {'delete': 'all'};
	}
    
}
module.exports = {
    create,
	list,
	deleteFunc,
	get,
	update,
	deleteMany
};