
import axios, { AxiosResponse } from 'axios';

class EventRatingService {

  private baseUrl = process.env.VUE_APP_INGEST_BASE_URL;
  private apiKey = process.env.VUE_APP_INGEST_APIKEY;
  private url = 'dataplattform_ingest/VoteType';

  public sendVote(eventCode: string, vote: number) {
    const storedVote = localStorage.getItem(eventCode);
    const previousVote = storedVote !== null ? Number(storedVote) : undefined;

    localStorage.setItem(eventCode, vote.toString());

    const data = {
      event_code: eventCode,
      current_vote: vote,
      previous_vote: previousVote
    };

    return axios.post(this.url, data, {
      baseURL: this.baseUrl,
      headers: {
        'x-api-key': this.apiKey
      }
    });
  }

  public sendComment(eventCode: string, comment: string) : Promise<void | AxiosResponse<any>> {
    if (comment === '') {
      // Do not sent empty comment
      return Promise.resolve();
    }

    const currentVote = Number(localStorage.getItem(eventCode));
    const data = {
      event_code: eventCode,
      current_vote: currentVote,
      comment
    };
    return axios.post(this.url, data, {
      baseURL: this.baseUrl,
      headers: {
        'x-api-key': this.apiKey
      }
    });
  }

}

export default new EventRatingService();