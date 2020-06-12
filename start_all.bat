start start_microservice.bat users 4001
start start_microservice.bat columns 5001
start start_microservice.bat values 6001
start start_microservice.bat resources 7001

start start_microservice.bat users 4002
start start_microservice.bat columns 5002
start start_microservice.bat values 6002
start start_microservice.bat resources 7002

start start_microservice.bat users 4003
start start_microservice.bat columns 5003
start start_microservice.bat values 6003
start start_microservice.bat resources 7003

start start_load_balancers.bat users
start start_load_balancers.bat columns
start start_load_balancers.bat values
start start_load_balancers.bat resources

start node api_gateway\\run_api_gateway.js api_gateway\\services.json