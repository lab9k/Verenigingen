# Verenigingen
Lijst van erkende verenigingen, op de ethereum blockchain.
De erkende verenigingen krijgen bepaalde voordelen binnen de stad Gent. Verenigingen kunnen een aanvraag doen en hun erkenning wordt bevestigd door gemeentelijk besluit. 
Dit experiment bekijkt of het mogelijk is om een centrale lijst bij te houden van deze verenigingen via de ethereum blockchain. 

Meer info: https://stad.gent/cultuur-sport-vrije-tijd/producten/erkenning-sociaal-culturele-verenigingen

# Level 1 

## key actor: admin
* De admin kan status van een vereniging erkennen of deze weer intrekken.
* De admin kan andere keys de admin rol geven en weer afnemen (admins zouden dus elkaars rechten kunnen afnemen)

## Data
* Naam van de vereniging
* Ondernemingsnummer of 0 indien feitelijke vereniging 
* Optioneel : korte beschrijving

## Methods:
* admin: voeg vereniging toe 
* admin update vereniging 

## Frontend: moet mogelijk maken: 
* Zoek vereniging 
* lijst alle verenigingen (publiek)
* voeg vereniging toe 
* update vereniging 
* Geef details vereniging met datum laatste update

# Level 2
## Methods: Public: Submit proposal
-  
- Input: Naam van de vereniging
- Input: Ondernemingsnummer of 0 indien feitelijke vereniging 
- Input: Optioneel : korte beschrijving
- Input: 3 velden : contactgegevens contactpersoon (encrypted)

# Level 3
## File upload voor bewijsstukken
* anything related to file upload , kan dat , encryptie ? 
* Bewijsstukken ?
* Toevoegen van de ipfs hash aan de 3 velden die encrypted zijn.

# Level 4
* lijst alle verenigingen met verschillende acceptatiestatus (publiek) 

# Level 5
## File upload voor admin
* Bij acceptatie loadt de admin ook en pdf van het gemeentebesluit op.
