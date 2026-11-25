# Villa Ti Libélil Blé

Site de la villa Ti Libélil Blé, location de vacances pour 6 personnes à Sainte-Rose, en Guadeloupe.

Adresse du site : **https://www.villa-tilibelilble.fr**
Réservations : [annonce Airbnb](https://www.airbnb.fr/rooms/1626925353506606787)

Le site est hébergé gratuitement par GitHub Pages : chaque modification enregistrée ici est en ligne une à deux minutes plus tard.

## Contenu du dépôt

| Fichier | Rôle |
| --- | --- |
| `index.html` | La page du site : textes, photos et informations lues par Google |
| `styles.css` | La mise en page et les couleurs |
| `app.js`, `messages.js` | Les animations de la visite, le menu mobile et la galerie photo |
| `images/optimized/` | Les photos au format WebP, chacune en deux tailles (800 et 1600 pixels) |
| `fonts/` | Les polices Cormorant Garamond et Manrope, hébergées avec le site, et leurs licences |
| `en/` | La version anglaise de la page d'accueil (`en/index.html`) et ses textes d'interface (`en/messages.js`) |
| `balade-pointe-allegre/`, `plages-sainte-rose-deshaies/`, `que-faire-basse-terre/`, `ou-manger-sainte-rose-deshaies/` | Les quatre pages guides, chacune dans son dossier (`index.html`) |
| `favicon.svg` | La libellule de l'onglet du navigateur |
| `robots.txt` | Autorise Google, Bing et les assistants IA à lire le site |
| `sitemap.xml` | Le plan du site, à déclarer à Google et à Bing |
| `llms.txt` | Un résumé factuel de la maison pour les assistants IA (ChatGPT, Claude...) |
| `.nojekyll` | Demande à GitHub de publier les fichiers tels quels |

## Modifier un texte

1. Ouvrez `index.html` dans ce dépôt, puis cliquez sur le crayon (**Edit this file**).
2. Cherchez la phrase avec Ctrl+F (Cmd+F sur Mac) et modifiez-la. Ne touchez qu'au texte situé entre les balises, par exemple entre `<p>` et `</p>`.
3. Cliquez sur **Commit changes**, écrivez en une ligne ce que vous avez changé, puis validez.

Si une information pratique change (horaires, équipements, règles), modifiez-la aussi dans le bloc `"@type": "VacationRental"` en haut de `index.html` et dans `llms.txt`, pour que Google et les assistants IA lisent la même chose que vos visiteurs. Pensez aussi à la date « Informations vérifiées le… » en bas de la page.

Les questions fréquentes existent à trois endroits : la rubrique visible en bas de `index.html`, le bloc `"@type": "FAQPage"` en haut du même fichier, et `llms.txt`. La version anglaise a les siennes dans `en/index.html`. Modifiez-les ensemble.

Quand vous changez un texte de la page d'accueil, pensez à faire la même modification dans `en/index.html`.

## Ajouter ou remplacer une photo

1. Préparez la photo en deux tailles, 800 et 1600 pixels de large, au format WebP (le site gratuit squoosh.app le fait), avec un nom sans accents ni espaces : `plage-de-cluny-800.webp` et `plage-de-cluny-1600.webp`.
2. Dans le dossier `images/optimized`, cliquez sur **Add file** puis **Upload files**.
3. Dans `index.html`, faites pointer la photo vers ce nouveau nom et écrivez sa légende.

## Annuler une modification

L'onglet **History** de chaque fichier garde toutes les versions. Ouvrez la version voulue pour la consulter ou la restaurer.

## Réglages GitHub Pages et nom de domaine

- **Settings → Pages** : source « Deploy from a branch », branche `main`, dossier `/ (root)`.
- Sans nom de domaine, le site est visible à l'adresse https://mcboj.github.io/villa-tilibelilble/
- Une fois le domaine `villa-tilibelilble.fr` acheté et les réglages DNS ci-dessous faits : dans **Settings → Pages**, saisir `www.villa-tilibelilble.fr` dans « Custom domain », cliquer sur **Save**, puis cocher « Enforce HTTPS » dès que la case est disponible. GitHub crée alors lui-même un fichier `CNAME` dans le dépôt.
- **Chez le registrar du domaine** (zone DNS de `villa-tilibelilble.fr`) :

| Type | Nom | Valeur |
| --- | --- | --- |
| CNAME | `www` | `mcboj.github.io.` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

La prise en compte des réglages DNS peut prendre de quelques minutes à 24 heures.

## Ce qui ne doit pas aller ici

Ce dépôt est public. N'y déposez jamais le livret d'accueil des locataires ni aucune information réservée aux voyageurs : codes, mot de passe Wi-Fi, numéro de la conciergerie, adresse exacte.
