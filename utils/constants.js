module.exports = {
    db_url_users: 'mongodb://aplicatieTW:5d036300f7b2585dcb8ec062951e9da1@centos-uni.zicar.info:27017/proiectTW_DB_Users', // "mongodb://localhost:27017/PiRo", //"mongodb://aplicatieTW:5d036300f7b2585dcb8ec062951e9da1@centos-uni.zicar.info:27017/proiectTW_DB"
    db_url_columns: 'mongodb://aplicatieTW:5d036300f7b2585dcb8ec062951e9da1@centos-uni.zicar.info:27017/proiectTW_DB_Columns',
    db_url_values: 'mongodb://aplicatieTW:5d036300f7b2585dcb8ec062951e9da1@centos-uni.zicar.info:27017/proiectTW_DB_Values',
    rounds: 5,
    internalToken: 'token',
    secret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ',
    hostUrl: 'http://localhost',
    services: {
        users: {
            ip: 'localhost',
            port: 3001
        },
        columns: {
            ip: 'localhost',
            port: 3002
        },
        values: {
            ip: 'localhost',
            port: 3003
        },
        resources: {
            ip: 'localhost',
            port: 3004
        }
    },
    load_balancers: {
        "users": {
            server: {
                ip: '0.0.0.0',
                port: 3001
            },
            nodes: [{
                    ip: '127.0.0.1',
                    port: 4001
                },
                /*{
                	ip:'127.0.0.1',
                	port:4002
                },
                {
                	ip:'127.0.0.1',
                	port:4003
                },*/
            ]
        },
        "columns": {
            server: {
                ip: '0.0.0.0',
                port: 3002
            },
            nodes: [{
                    ip: '127.0.0.1',
                    port: 5001
                },
                /*{
                	ip:'127.0.0.1',
                	port:5002
                },
                {
                	ip:'127.0.0.1',
                	port:5003
                },*/
            ]
        },
        "values": {
            server: {
                ip: '0.0.0.0',
                port: 3003
            },
            nodes: [{
                    ip: '127.0.0.1',
                    port: 6001
                },
                /*{
                	ip:'127.0.0.1',
                	port:6002
                },
                {
                	ip:'127.0.0.1',
                	port:6003
                },*/
            ]
        },
        "resources": {
            server: {
                ip: '0.0.0.0',
                port: 3004
            },
            nodes: [{
                    ip: '127.0.0.1',
                    port: 7001
                },
                /*{
                	ip:'127.0.0.1',
                	port:7002
                },
                {
                	ip:'127.0.0.1',
                	port:7003
                },*/
            ]
        }
    }
}