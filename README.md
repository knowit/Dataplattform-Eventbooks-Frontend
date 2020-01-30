# Dataplattform-Webpage

Nettside som er lagd for å la brukere stemme og gi tilbakemelding på eventer, i tilegg til administrasjon av disse. Laget av Dataplattform i Trondheim

## Basic info

Prosjektet bruker Vue med Typescript. Prosjektet kan enkelt kjøres med kommandoene

```
npm install
npm run serve
```

Dette installerer depedencies og starter en dev server. For å bygge til produksjon kjøres

```
npm run build
```

Dette er forøvrig vanlig standard for Vue applikasjoner.

### Enviroment variabler

Prosjektet har noen flagg/bygg variabler som kan settes, de er som følger

|Navn|Påkrevd|Beskrivelse|
|:--:|:-----:|:----------|
|`VUE_APP_INGEST_APIKEY`|`true`|API nøkkel for ingest API til dataplattform|
|`VUE_APP_MOCK_NETWORK`|`false`|Flagg som brukes for å mocke nettverks-laget i `development` modus. Disse er definert [her](./tests/mock/services/event.service.ts).|