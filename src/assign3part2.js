
var savedGists = [];
function getGists() {
	var req = new XMLHttpRequest();
	if(!req) {
		throw 'Unable to create HttpRequest.';
	}
	var results = [];
	var pg = encodeURIComponent(document.getElementById("pagesToDisplay").value);
	var json = document.getElementById('JSON').checked;
	var python = document.getElementById('Python').checked;
	var javascript = document.getElementById('JavaScript').checked;
	var sql = document.getElementById('SQL').checked;
	
	var url = 'http://api.github.com/gists';
	var params = {
		page: pg
	};
    url += '?' + urlStringify(params);	
	req.onreadystatechange = function() {
		if(this.readyState === 4) {
			var gists = JSON.parse(this.responseText);
			for(i=0; i < gists.length; i++) {
				var des = gists[i].description;
				var link = gists[i].url;
				for(index in gists[i].files) {
					var fileObj = gists[i].files[index];
					var inp = document.createElement('input');
					inp.setAttribute('type', 'button')
					inp.setAttribute('name', 'save')
					inp.setAttribute('value', 'save')
					inp.attachEvent('OnClick',H());
					var a = document.createElement('a');
					a.innerHTML = des;
					a.setAttribute('href', link)
					var p = document.createElement('P');
					if(json == true) {
						if(fileObj.language === "JSON") {
					        document.getElementById("output").appendChild(a);
							document.createElement('input');
							document.getElementById("output").appendChild(p);
						}
					}
					if(python == true){
						if(fileObj.language === "Python") {
					        document.getElementById("output").appendChild(a);
							document.getElementById("output").appendChild(p);
						}
					}
				    if(javascript == true){
						if(fileObj.language === "JavaScript") {
					        document.getElementById("output").appendChild(a);
							document.getElementById("output").appendChild(p);
						}
					}
				    if(sql == true){
						if(fileObj.language === "SQL") {
					        document.getElementById("output").appendChild(a);
							document.getElementById("output").appendChild(p);
						}
					}
				}
			}
		}
	};
	req.open('GET', url);
	req.send();
}

function urlStringify(obj) {
	var str = []
	for(var prop in obj) {
		var s = encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]);
		str.push(s);
	}
	return str.join('&');
}

saveGist(a) {
	 savedGists.push(a);
}