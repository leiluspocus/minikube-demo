# Découvrir Kubernetes avec minikube

minikube est un outil facilitant l'exécution locale de kubernetes.

Plutôt que d'avoir à mettre en place un cluster sur un serveur ou un kubernetes managé comme [GKE](https://cloud.google.com/kubernetes-engine), vous le mettez en place sur votre machine, en local 🏠

🎯 **Objectif**: Avoir une petite application Node.js dockerisée et déployée sur un cluster kubernetes.

## Prérequis

Une connaissance minimale de Docker est nécessaire. Les vidéos d'Aurélie Vache sont un excellent point d'entrée ([Understanding Docker in a visual way](https://www.youtube.com/watch?v=3hol91BkYHU&list=PLmw3X80dPdlyRV2EUKnFOvBACs_tcArd0&index=1)).

Il y a des prérequis à l'installation de minikube à vérifier.

- 20GB de stockage minimum requis
- 2GB de mémoire libre
- 2 CPU
- [Docker](https://docs.docker.com/get-docker/), [kubectl](https://kubernetes.io/fr/docs/tasks/tools/install-kubectl/) d'installés

Si vous souhaitez déployer votre application, vous aurez besoin d'un compte sur [Docker Hub](https://hub.docker.com/) (ou le registry de votre choix comme [Quay.io](https://quay.io)).

## Glossaire

**Cluster** : Un groupe de nodes sur lequel vos applications vont vivre

**Node** : Serveur sur lequel des pods vont être répartis.

**Deployment** : Un déploiement va créer des *ReplicaSet* qui vont créer un ou plusieurs pods. Il décrit quelles images le pod va utiliser.

**Pod** : Une entité qui contient un ou n containers Docker, c'est la plus petite entité déployable sur un cluster. Il a une adresse IP interne au cluster.

**Services** : C'est l'entité qui permet d'exposer un pod aux Internets. Il affecte à un groupe de pods une adresse IP unique.

**Image** : Contient tout le nécessaire pour démarrer une application (code, programmes tiers...)

## Installation de minikube

Selon votre configuration, la documentation de minikube vous fournit les étapes à suivre sur l'étape 1.

Pour ma part, ça a simplement été

```shell
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube
```

Une fois minikube installé, vous pouvez démarrer votre cluster avec la commande

```shell
minikube start
```

> 💡 Fun fact: Si vous faites la commande ```docker ps```, vous verrez un container tourner qui s'appelle minikube !


S'ensuivent dans la documentation des exemples de service de type hello world à lancer pour tester le bon démarrage du serveur. Ils se créent automatiquement sur le namespace ```default```.

A noter, je n'ai rien eu à faire pour que la commande `kubectl` se fasse dans le contexte de minikube...

Cela s'est fait automatiquement (un peu perturbant d'ailleurs, je ne sais pas ce que ça aurait fait si j'étais encore connectée sur un cluster cloud ... ?).



## L'application Node

Dans le cas de cet article, je vais déployer une API Node.js très simple qui retourne des affirmations positives *(via [affirmations.dev](https://affirmations.dev/))* ! Le code source que je m'apprête à déployer sur le cluster minikube se trouve dans le dossier `node-api-sample`

J'utilise le framework [Express](https://expressjs.com/) qui permet de démarrer un système de routes très rapidement en Node.js.

L'application est dockerisée grâce au Dockerfile.

J'ai envoyé mon image docker [sur DockerHub.](https://hub.docker.com/repository/docker/imleiluspocus/minikube-demo) après l'avoir buildé. Voici les commandes (à adapter selon votre registry)

```
docker build -t imleiluspocus/minikube-demo:latest -t imleiluspocus/minikube-demo:latest .
docker push imleiluspocus/minikube-demo:latest
```

## La dockerisation du Dockerfile

L'application est simple mais utilise quand même deux bibliothèques: [express](https://expressjs.com/) et [node-fetch](https://github.com/node-fetch/node-fetch).

Le Dockerfile se contente donc de:
- Récupérer une image node
- Créer un répertoire de travail
- Installer les dépendances via `yarn install`
- Lancer le serveur Node sur le port 8888

## Fichiers de déploiement

Tous les fichiers nécessaires au déploiement de l'application se trouvent dans le dossier `k8s-templates`.

> 💡 S'il y a un mot clé que vous ne comprenez pas dans un YAML, vous pouvez le faire décrire par kubectl en ligne de commande !
>
> ```kubectl explain deployment.spec.replicas```

Dans le cas de mon application Node, il y a :
- Le déploiement qui va décrire l'application pour permettre au pod de se lancer
- Le service qui va exposer l'application aux Internets 🌍

Une fois mon cluster démarré, j'ai simplement appliqué les fichiers avec la commande `kubectl apply -f k8s-templates/`.
## Commandes utiles

Vérifier le statut de son cluster minikube

```shell
minikube status
```

## Documentation
- [Understanding Docker in a visual way (vidéos ou articles)](https://www.youtube.com/watch?v=3hol91BkYHU&list=PLmw3X80dPdlyRV2EUKnFOvBACs_tcArd0)
- [Understanding Kubernetes in a visual way (vidéos ou articles)](https://www.youtube.com/watch?v=a1Uwoq1Yv6U&list=PLmw3X80dPdlzksg6X9s23LEkLMWFGGUn5)
- [Installation de Minikube](https://kubernetes.io/fr/docs/setup/learning-environment/minikube/)
- [Bonnes pratiques Kubernetes](https://kubernetes.io/docs/setup/best-practices/)
- [Déployer une application Node.js sur un cluster Kubernetes](https://learnk8s.io/deploying-nodejs-kubernetes)



### Démo - Note to myself

- Expliquer l'application Node
- Expliquer le Dockerfile
- Faire un build ```docker build -t imleiluspocus/minikube-demo:latest -t imleiluspocus/minikube-demo:latest .```
- Faire un push des images ```docker push imleiluspocus/minikube-demo:latest```

- Expliquer les fichiers de configuration YAML
- Appliquer les YAML ```kubectl apply -f k8s-templates/```
- Récupérer l'adresse IP du service ```minikube service node-api-sample --url```
- Jouer sur le nombre de replicas et expliquer l'intérêt

