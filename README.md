# Verenigingen
Lijst van erkende verenigingen, op de ethereum blockchain.
De erkende verenigingen krijgen bepaalde voordelen binnen de stad Gent. Verenigingen kunnen een aanvraag doen en hun erkenning wordt bevestigd door gemeentelijk besluit. 
Dit experiment bekijkt of het mogelijk is om een centrale lijst bij te houden van deze verenigingen via de ethereum blockchain. 

Meer info: https://stad.gent/cultuur-sport-vrije-tijd/producten/erkenning-sociaal-culturele-verenigingen

# Live Demo
* install Metamask plugin and get a working wallet connected to the Rinkeby network
* click on the following link: https://lab9k.github.io/Verenigingen/

# Getting started

## prerequisites

* nodejs
* npm
* Metamask with working wallet (Rinkeby network)

## Installation

    $ git clone https://github.com/lab9k/Verenigingen.git
    $ cd Verenigingen/
    $ npm install

## Running

### Dev mode
    $ npm run-script dev

### Production mode
    $ npm run-script serve

## Deployment on server

### Create bash file in order to automate the startup of the project  
    cd /usr/local/bin
    touch startvereniging.sh
    vim startvereniging.sh
    
    #!/bin/bash
    ( cd /var/www/html/Verenigingen ; npm run-script build; npm run-script serve )
    exit 0;
  
### Configure bash file as a service
```
 cd /etc/systemd/system
 touch verenigingen.service
 vim verenigingen.service 
```
Voeg het onderstaande toe aan verenigingen.service 
```
[Service]
ExecStart=/usr/local/bin/startverenigingen.sh
[Install]
WantedBy=default.target
```
Start de verenigingen.service om de service permanent te laten draaien
```
systemctl daemon-reload
systemctl enable verenigingen.service
```
    
### Configure proxy
```
cd /etc/apache2/sites-available
touch verenigingen.conf
vim verenigingen.conf
```
Voeg het onderstaande toe aan verenigingen.conf 
```    
<VirtualHost *:80>
    Servername verenigingen.lab9k.gent
    ProxyPass / http://localhost:8080/
</VirtualHost>
```
Start of reload apache om de veranderingen door te voeren
```   
/etc/init.d/apache2 reload
```   
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

# License

[lab9k/Verenigingen is licensed](https://github.com/lab9k/Verenigingen/blob/develop/LICENSE) under the MIT license

# Authors

* [Lab9k](https://lab9k.github.io) 
