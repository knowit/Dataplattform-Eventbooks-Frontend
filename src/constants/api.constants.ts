export const EVENT_API = 'EVENT_API';
export const INGEST_API = process.env.NODE_ENV === 'production' ? 'https://2q8h3bkh73.execute-api.eu-central-1.amazonaws.com/prod/dataplattform_ingest' : ' https://6ev07fpju2.execute-api.eu-central-1.amazonaws.com/test/dataplattform_ingest';
export const INGEST_APIKEY = process.env.VUE_APP_INGEST_APIKEY || '';
export const EVENT_ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://rgz3pv5m90.execute-api.eu-central-1.amazonaws.com/prod/dataplattform' : 'https://rgz3pv5m90.execute-api.eu-central-1.amazonaws.com/test/dataplattform';