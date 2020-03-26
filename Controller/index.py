from simple_http_server import request_map
from simple_http_server import Response
from simple_http_server import MultipartFile
from simple_http_server import Parameter
from simple_http_server import Parameters
from simple_http_server import Header
from simple_http_server import JSONBody
from simple_http_server import HttpError
from simple_http_server import StaticFile
from simple_http_server import Headers
from simple_http_server import Cookies
from simple_http_server import Cookie
from simple_http_server import Redirect

from simple_http_server import server






@request_map("/")
def my_ctrl():
    return Redirect('/index')


@request_map("/index")
def my_ctrl():
    return 	"".join(open("./View/index.html","r").readlines())

@request_map("/index.css")
def my_ctrl():
    return 	"".join(open("./View/index.css","r").readlines())

@request_map("/index.js")
def my_ctrl():
    return 	"".join(open("./View/index.js","r").readlines())


@request_map("/statistics")
def my_ctrl():
    return "".join(open("./View/statistics.html","r").readlines())

@request_map("/statistics.css")
def my_ctrl():
    return "".join(open("./View/statistics.css","r").readlines())

@request_map("/statistics.js")
def my_ctrl():
    return "".join(open("./View/statistics.js","r").readlines())



@request_map("/scores")
def my_ctrl():
    return {"code": 404, "message": "not found"}

@request_map("/scores")
def my_ctrl():
    return {"code": 404, "message": "not found"}

def main(*args):
    server.start()

if __name__ == "__main__":
    main()