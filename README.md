# CasinoCoin paper wallet
Generates a paper wallet for cold storage of CasinoCoins.

## Running an offline paper wallet generator using Docker
Clone this repository and install docker

Run the following commands from the location where de Dockerfile is locted.
 
 ```docker build -t paperwallet .```
 
Make sure you have no software runnign on port 8080

```docker run -p 8080:80 -ti paperwallet:latest``` 

Open a browser and browse to localhost:8080

 
