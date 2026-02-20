#  Currency Converter - API Integration & Hooks

Une application de conversion de devises en temps réel, connectée à une API financière. Ce projet démontre ma capacité à gérer des flux de données asynchrones et à synchroniser l'interface utilisateur avec des sources externes.

##  Objectifs du Projet

Le but principal était de solidifier mes compétences sur deux piliers de React :
- **Fetch API** : Récupération de taux de change en direct et gestion des promesses (`async/await`).
- **useEffect Mastery** : Déclenchement des appels API lors du changement des devises ou du montant, avec gestion du "cleanup" pour éviter les fuites de mémoire.

## Fonctionnalités

- **Taux en Temps Réel** : Conversion instantanée basée sur des données de marché actualisées.
- **Support Multi-Devises** : Passage fluide entre des dizaines de devises mondiales (USD, POL, GBP, etc.).
- **Calcul Dynamique** : Mise à jour automatique du résultat dès que l'utilisateur modifie le montant d'entrée.
- **Gestion d'Erreur** : Affichage de messages clairs en cas de problème de réseau ou d'API.

##  Stack Technique

- **Frontend** : React (Vite)
- **Data Source** : ExchangeRate-API (ou autre API utilisée)
- **Logic** : Fetch API & Async/Await
- **Styling** : CSS3 

