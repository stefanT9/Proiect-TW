start node microservices_deploy.js users 4001
start node microservices_deploy.js columns 5001
start node microservices_deploy.js values 6001
start node microservices_deploy.js resources 7001

@rem start node microservices_deploy.js users 4002
@rem start node microservices_deploy.js columns 5002
@rem start node microservices_deploy.js values 6002
@rem start node microservices_deploy.js resources 7002

@rem start node microservices_deploy.js users 4003
@rem start node microservices_deploy.js columns 6003
@rem start node microservices_deploy.js values 5003
@rem start node microservices_deploy.js resources 7003

start node load_balancer\\run_load_balancer.js users
start node load_balancer\\run_load_balancer.js columns
start node load_balancer\\run_load_balancer.js values
start node load_balancer\\run_load_balancer.js resources

start node api_gateway\\run_api_gateway.js api_gateway\\services.json