var { ObjectId } = require('mongodb')
const constants = require('../utils/constants')
const { xssFilter } = require('../utils/xssFilter')
const http = require('http')

module.exports.getAll = async (req, res) => {
    try {
        const values = await req.db.Values.find()
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: true, values, message: 'Succes!' }))
        res.end()
    } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
        res.end()
    }
}
module.exports.getFunction = async (req, res) => {
    try {
        const document = await req.db.Values.findOne({ _id: ObjectId(req.params.id) })
        if (document) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify({ success: true, foundDocument: document, message: 'Succes!' }))
            res.end()
        }
        else {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify({ success: false, message: 'value not found' }))
            res.end()
        }
    } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
        res.end()
    }
}

module.exports.deleteFunction = async (req, res) => {
    try {
        const value = await req.db.Values.findOne({ _id: ObjectId(req.pathParams.id) })
        if (value === null) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify({ success: false, message: 'value not found' }))
            res.end()
            return
        }
        await req.db.Values.deleteOne({ _id: ObjectId(req.pathParams.id) }, (err) => {
            if (err) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
                res.end()
            } else {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.write(JSON.stringify({ success: true, message: 'Succes!' }))
                res.end()
            }
        })
    } catch (e) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
        res.end()
    }
}

module.exports.putFunction = async (req, res) => {
    try {
        const document = await req.db.Values.findOne({ _id: ObjectId(req.pathParams.id) })
        req.db.Values.updateOne({ _id: ObjectId(req.pathParams.id) }, req.body.element, (err) => {
            if (err) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
                res.end()
            } else {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.write(JSON.stringify({ success: true, message: 'Succes!' }))
                res.end()
            }
        })
    } catch (e) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
        res.end()
    }
}

module.exports.insert = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    var value = xssFilter(req.body)
    console.log(value)
    http.get(constants.hostUrl + '/columns/internalget', {
        headers: {
            'Authorization': `Bearer ${constants.internalToken}`,
        }
    }, (response) => {
        var data = ''
        response.on('data', (part) => {
            data += part
        })
        response.on('end', () => {
            columns = JSON.parse(data).columns
            var newValue = {}
            for (var i = 0; i < columns.length; i++) {
                console.log(value)
                if (value.hasOwnProperty(columns[i].name)) {
                    if (columns[i].type === 'discrete') {
                        var key = value[columns[i].name]
                        var keyAsString = key
                        var keyAsInt = undefined
                        var keyAsFloat
                        if (key == null || key == undefined) {
                            continue
                        }
                        if (!isNaN(key)) {
                            keyAsInt = parseInt(key).toString()
                            keyAsFloat = parseFloat(key).toString()
                        }

                        if (Object.keys(columns[i].translate).indexOf(keyAsString) >= 0) {
                            newValue[columns[i].name] = columns[i].translate[keyAsString]
                        }
                        else if (Object.keys(columns[i].translate).indexOf(keyAsInt) >= 0) {
                            newValue[columns[i].name] = columns[i].translate[keyAsInt]
                        }
                        else if (Object.keys(columns[i].translate).indexOf(keyAsFloat) >= 0) {
                            newValue[columns[i].name] = columns[i].translate[keyAsFloat]
                        }
                        else {

                            res.statusCode = 400
                            res.write(JSON.stringify({ success: false, message: 'Discrete field ' + columns[i].name + " doesn't have a translation for " + key }))
                            res.end()
                            newValue = null
                            break
                        }
                    } else if (columns[i].type === 'continuous') {
                        var num = value[columns[i].name]
                        var update_made = false
                        if ((columns[i].max === null) || (num > columns[i].max)) {
                            var updateReq = JSON.stringify({
                                name: columns[i].name,
                                max: columns[i].max
                            })
                            var request = http.request(constants.hostUrl + '/columns/internalupdatemax', {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Content-Length': updateReq.length,
                                    'Authorization': `Bearer ${constants.internalToken}`,

                                },
                                method: 'POST',
                            })
                            request.on('error', (error) => { })
                            request.write(updateReq)
                            request.end()
                        }
                        if ((columns[i].min === null) || (num < columns[i].min)) {
                            var updateReq = JSON.stringify({
                                name: columns[i].name,
                                min: columns[i].min
                            })
                            var request = http.request(constants.hostUrl + '/columns/internalupdatemin', {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Content-Length': updateReq.length,
                                    'Authorization': `Bearer ${constants.internalToken}`,

                                },
                                method: 'POST',

                            })
                            request.on('error', (error) => { })
                            request.write(updateReq)
                            request.end()
                        }

                        newValue[columns[i].name] = num
                    }
                } else {
                    res.statusCode = 400
                    res.write(JSON.stringify({ success: false, message: 'Field ' + columns[i].name + ' not present' }))
                    res.end()
                    newValue = null
                    break
                }
            }
            if (newValue !== null) {
                req.db.Values.create(newValue, (err, val) => {
                    if (err) {
                        res.statusCode = 500
                        res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
                        res.end()
                    } else {
                        res.statusCode = 200
                        res.write(JSON.stringify({ success: true, message: 'Object inserted' }))
                        res.end()
                    }
                })
            }
        })
    })
}

module.exports.filterResults = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        var pagination = {}
        if (req.body.page !== undefined && req.body.size !== undefined) {
            if (req.body.page > 0 && req.body.size > 0) {
                pagination["skip"] = (req.body.page - 1) * req.body.size
                pagination["limit"] = req.body.size
            } else {
                pagination = {}
            }
        }
        req.db.Values.find(req.body.filters, req.body.columns.join(" ") + " -_id", pagination, (err, values) => {
            if (err) {
                res.statusCode = 500
                res.write(JSON.stringify({ success: false, message: "Could not fetch data" }))
                res.end()
            } else {
                res.statusCode = 200
                res.write(JSON.stringify({ success: true, message: "Found results", data: values.filter(value => JSON.stringify(value) !== '{}') }))
                res.end()
            }
        })
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.write(JSON.stringify({ success: false, message: 'Could not fetch data' }))
        res.end()
    }
}