//modul adaptat din https://github.com/DubFriend/xss-escape/blob/master/xss-escape.js

var filterStrings = [
	{
		find: '<',
		replace: '&lt;'
	},
	{
		find: '>',
		replace: '&gt;'
	},
	{
		find: '&',
		replace: '&amp;'
	},
	{
		find: '/',
		repalce: '&#x2F;'
	},
	{
		find: '"',
		replace: '&quot;'
	},
	{
		find: "'",
		repalce: '&#x2F;'
	}
]

function filterString(unfilteredString){
	filterStrings.forEach(filter => unfilteredString.replace(filter.find, filter.replace))
	return unfilteredString
}

function filterArray(unfilteredArray){
	var filteredArray = []
	unfilteredArray.forEach(obj => filteredArray.push(xssFilter(obj)))
	return filteredArray
}

function filterObject(unfilteredObject){
	var filteredObject = {}
	for(key in unfilteredObject){
		filteredObject[key] = xssFilter(unfilteredObject[key])
	}
	return filteredObject
}

function xssFilter(unfilteredObject){
	if(typeof unfilteredObject === 'number' || typeof unfilteredObject === 'boolean'){
		return unfilteredObject
	}

	if(typeof unfilteredObject === 'string'){
		return filterString(unfilteredObject) 
	}

	if(Object.prototype.toString.call(unfilteredObject) === "[object Array]"){
		return filterArray(unfilteredObject)
	}

	if(unfilteredObject instanceof Object){
		return filterObject(unfilteredObject)
	}

	return unfilteredObject
}

module.exports.xssFilter = xssFilter