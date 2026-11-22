# Villa Ti Libélil Blé

Site de la villa Ti Libélil Blé, location de vacances pour 6 personnes à Sainte-Rose, en Guadeloupe.

Adresse du site : **https://www.villa-tilibelilble.fr**
Réservations : [annonce Airbnb](https://www.airbnb.fr/rooms/1626925353506606787)

Le site est hébergé gratuitement par GitHub Pages : chaque modification enregistrée ici est en ligne une à deux minutes plus tard.

## Contenu du dépôt

| Fichier | Rôle |
| --- | --- |
| `index.html` | La page du site : textes, mise en page et informations lues par Google |
| `images/` | Les photos, chacune en deux tailles (800 et 1600 pixels) |
| `CNAME` | Indique à GitHub l'adresse du site (`www.villa-tilibelilble.fr`) |
| `robots.txt` | Autorise Google, Bing et les assistants IA à lire le site |
| `sitemap.xml` | Le plan du site, déclaré à Google et à Bing |
| `llms.txt` | Un résumé factuel de la villa pour les assistants IA (ChatGPT, Claude...) |
| `favicon.png`, `apple-touch-icon.png` | Les icônes du site |
| `.nojekyll` | Demande à GitHub de publier les fichiers tels quels |

## Modifier un texte

1. Ouvrez `index.html` dans ce dépôt, puis cliquez sur le crayon (**Edit this file**).
2. Cherchez la phrase avec Ctrl+F (Cmd+F sur Mac) et modifiez-la. Ne touchez qu'au texte situé entre les balises, par exemple entre `<p>` et `</p>`.
3. Cliquez sur **Commit changes**, écrivez en une ligne ce que vous avez changé, puis validez.

Si une question de la rubrique « Questions fréquentes » change, modifiez-la aussi dans le bloc `"@type": "FAQPage"` en haut du fichier et dans `llms.txt`, pour que Google et les assistants IA lisent la même chose que vos visiteurs.

Pensez à mettre à jour de temps en temps la note Airbnb affichée en haut de la page.

## Ajouter ou remplacer une photo

1. Réduisez la photo à 1600 pixels de large au maximum (l'app Photos ou Aperçu le font), et donnez-lui un nom parlant, sans accents ni espaces : `plage-de-cluny-1600.jpg`.
2. Dans le dossier `images`, cliquez sur **Add file** puis **Upload files**.
3. Dans `index.html`, faites pointer la photo vers ce nouveau nom et écrivez sa légende.

## Annuler une modification

L'onglet **History** de chaque fichier garde toutes les versions. Ouvrez la version voulue pour la consulter ou la restaurer.

## Réglages GitHub Pages et nom de domaine

- **Settings → Pages** : source « Deploy from a branch », branche `main`, dossier `/ (root)`. Champ « Custom domain » : `www.villa-tilibelilble.fr`, case « Enforce HTTPS » cochée.
- **Chez le registrar du domaine** (zone DNS de `villa-tilibelilble.fr`) :

| Type | Nom | Valeur |
| --- | --- | --- |
| CNAME | `www` | `NOM-DU-COMPTE.github.io.` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Remplacez `NOM-DU-COMPTE` par le nom du compte GitHub qui héberge ce dépôt. La prise en compte des réglages DNS peut prendre de quelques minutes à 24 heures.

## Ce qui ne doit pas aller ici

Ce dépôt est public. N'y déposez jamais le livret d'accueil des locataires ni aucune information réservée aux voyageurs : codes, mot de passe Wi-Fi, numéro de la conciergerie, adresse exacte.
