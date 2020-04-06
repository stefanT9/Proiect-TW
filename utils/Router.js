class Router{
    constructor() {
        this.getRoutes={};
        this.postRoutes={};
    }
    use(url, router)
    {

        for(var el in router.getRoutes)
        {
            this.getRoutes[url+el]=router.getRoutes[el];
        }
        for(var el in router.postRoutes)
        {
            this.postRoutes[url+el]=router.postRoutes[el];
        }

    }
    post(url,controller)
    {
        this.postRoutes[url]=controller;
    }
    get(url,controller)
    {
        this.getRoutes[url]=controller;
    }
    route(req,res)
    {
        var url=req.url.split('?')[0];

        try {
            if (req.method === 'GET') {
                this.getRoutes[url](req, res);
            }
            if (req.method === 'POST') {
                this.postRoutes[url](req, res);
            }
        }
        catch (e) {
            res.writeHead(404,'not found');
            res.write('404 not found');
        }
    }
}

module.exports={Router};