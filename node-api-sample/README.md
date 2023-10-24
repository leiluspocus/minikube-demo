# Déploiement d'une application Node.js sur un cluster géré par minikube.

## 🎯 Objectifs

- Comprendre l'utilisation de kubernetes via un outil installable localement, minikube
- Voir un cas réel avec une application Node.js

L'article est consultable ici.


## Usage

- Build image locally `docker build -t node-api-sample .`
- Run image locally `docker run -dp 127.0.0.1:8888:8888 node-api-sample`
