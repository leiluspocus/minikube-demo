Ecrire un article de blog: https://kubernetes.io/fr/docs/setup/learning-environment/minikube/

Découvrir Kubernetes avec minikube
minikube est un outil facilitant l'exécution locale de kubernetes. Plutôt que d'avoir à mettre en place un cluster sur un serveur, vous le mettez en place sur un ordinateur.

## Prérequis

Une connaissance minimale du concept de contenairisation est nécessiare. Les vidéos d'Aurélie Vache sont un excellent point d'entrée ( Understanding Docker in a visual way ).

Il y a des prérequis à l'installation de minikube à vérifier.

- 20GB de stockage minimum requis
- 2GB de mémoire libre
- 2 CPU

## Glossaire des mots

**Cluster** : Un groupe de nodes sur lequel vos applications vont vivre

**Node** : Serveur sur lequel des pods vont être répartis.

**Pod** : Réprésente l'application: il peut

**Replicas**: Un pod peut avoir n replicas de lui-même.
Installation

Selon votre configuration, la documentation de minikube vous fournit les étapes à suivre sur l'étape 1.
Pour ma part, ça a simplement été

```shell
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube
```

S'ensuivent dans la documentation des exemples de service de type hello world à lancer pour tester le bon démarrage du serveur. Ils se créent automatiquement sur le namespace default.

A noter, je n'ai rien eu à faire pour que la commande kubectl se fasse dans le contexte de minikube, cela s'est fait automatiquement (un peu perturbant d'ailleurs, je ne sais pas ce que ça aurait fait si j'étais encore connectée sur un contexte cloud).

Dans le cas de cet article, je vais déployer une API Node.js très simple.

## L'applicaiton Node

Observons le code source que je m'apprête à déployer sur le cluster minikube.

J'utilise le framework Express qui permet de démarrer un système de routes très rapidement en Node.js. L'application est dockerisée grâce au Dockerfile.


## Fichiers de déploiement




