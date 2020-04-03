class Router {
    constructor() {
        this.getRoutes = {};
        this.postRoutes = {};
    }

    use(url, router) {

        for (var el in router.getRoutes) {
            this.getRoutes[url + el] = router.getRoutes[el];
        }
        for (var el in router.postRoutes) {
            this.postRoutes[url + el] = router.postRoutes[el];
        }

    }

    post(url, controller) {
        this.postRoutes[url] = controller;
    }

    get(url, controller) {
        this.getRoutes[url] = controller;
    }

    route(req, res) {
        var url = req.url.split('?')[0];
        console.log('request at ' + url);
        if (req.method === 'GET') {
            if (this.getRoutes[url] !== undefined) {
                try {
                    this.getRoutes[url](req, res);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        if (req.method === 'POST') {
            if (this.postRoutes[url] !== undefined) {
                try {
                    this.postRoutes[url](req, res);
                } catch (e) {
                    console.log(e);
                }
            }

        }
    }
}

module.exports={Router};