
import axios from 'axios';

export interface Event {
  button: number;
  eventCode: string;
}

class EventRatingService {

  private baseURL = process.env.VUE_APP_INGEST_BASE_URL
  private apiKey = process.env.VUE_APP_INGEST_APIKEY

  public sendEvent(event: Event) {
    return axios.post('test/dataplattform_ingest/EventRatingType', event, {
      baseURL: this.baseURL,
      headers: {
        'x-api-key': this.apiKey
      }
    });
  }

}

export default new EventRatingService()