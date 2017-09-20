# Technische documentatie

De bedoeling van dit project was om een gedecentraliseerd systeem te ontwikkelen om de verenigingen in Gent in te schrijven en onderhouden. We hebben gewerkt met Solidity en VueJS. De bedoeling was zoveel levels te vervolledigen als we konden, en hebben het eerste afgerond en gereleased, en het tweede bijna afgerond.

## Algemeen
We hebben dus ons eerste level afgewerkt en gereleased. Hier is alle functionaliteit van het eerste level voorzien. Daarnaast, in de gewone repository, vind je een halfafgewerkt level 2. Omdat hier een hoop extra functies moesten worden toegevoegd hebben we, vooral in het VueJS-gedeelte enkele stukken opgesplitst naar modules.

## Solidity

In Solidity hebben we een contract aangemaakt met een mogelijkheid om admin te zijn. Deze positie is voorbestemd voor het personeel die bezig is met administratie. Alle functionaliteit om admins aan te maken, verwijderen en testen zit in dit contract verwerkt.

Daarnaast komt het VerenigingenContract. We hebben een "object" vereniging aangemaakt waar alle nodige data in opgeslaan wordt. Daarnaast bestaat er een mapping tussen de ID en de vereniging zelf. De ID is de chronologische positie van een vereniging.

We hebben grofweg 2 functionaliteiten voorzien in dit contract: Om contracten aan te passen, of hun status aan te passen. Deze functionaliteit is enkel voor admins beschikbaar. Niet-admins kunnen wel de lijst opvragen.

We hebben ervoor gekozen om met een enum "Status" te werken. Iedere keer er een nieuwe vereniging wordt toegevoegd, of wordt aangepast, gaat de status automatisch terug naar "Pending".

Aangezien Solidity over weinig tools beschikt om een complex datastructuur te ontwerpen, hebben we hier en daar nogal onorthodoxe oplossingen moeten verzinnen ivm het ID.

## VueJS

In de release (level 1) staat de meeste web3-functionaliteit in de main.js. Hier wordt onderandere de lijst van verenigingen opgehaald en opgeslagen, en alle mogelijke bewerkingen gebeuren via dit bestand.

In de poging tot tweede level hebben we het contract en de router in nieuwe modules geplaatst, die dan (waar nodig) kunnen geïmporteerd worden.
