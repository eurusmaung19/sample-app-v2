# sample-app-v2

1. Install Docker

 sudo apt update
 
 sudo apt install docker.io -y

 sudo usermod -aG docker $USER

 newgrp docker

 docker version

2.Install kubectl

 sudo snap install kubectl --classic

 kubectl version --client

3.Install Minikube (ARM64)

 curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-arm64

 sudo install minikube-linux-arm64 /usr/local/bin/minikube

 minikube version

4.Start Minikube (Docker driver)

 minikube start --driver=docker

 kubectl get nodes

5.Enable NGINX Ingress

 minikube addons enable ingress

 kubectl get pods -n ingress-nginx

6.Build Docker Images INSIDE Minikube

 eval $(minikube docker-env)

 docker build -t backend ./backend

 docker build -t frontend ./frontend

7.Deploy Kubernetes

 kubectl apply -f k8s/

 kubectl get pods

 kubectl get svc

 kubectl get ingress

8.Architecture

 Internet
    │
    ▼
 NGINX Ingress
    │
    ├── Frontend (NGINX)
    │
    ▼
 Backend API (Node.js)
    │
    ▼
 PostgreSQL
    │
 Persistent Volume

9.nginx proxy config

server {
    listen 80;
    server_name x.x.x.x; #<---------Repalce your public ip

    location /api/ {

        if ($http_referer = "") {
            return 403;
        }

        proxy_pass http://x.x.x.x:xxxx; #<------Repalce your public ip and ingress port
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        proxy_pass http://x.x.x.x:xxxx; #<------Repalce your public ip and ingress port
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

