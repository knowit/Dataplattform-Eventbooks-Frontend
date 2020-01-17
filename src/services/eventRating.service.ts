
import axios, { AxiosResponse } from 'axios';
import { INGEST_API, INGEST_APIKEY } from '@/constants/api.constants';

class EventRatingService {

  private url = '/VoteType';

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
      baseURL: INGEST_API,
      headers: {
        'x-api-key': INGEST_APIKEY
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
      baseURL: INGEST_API,
      headers: {
        'x-api-key': INGEST_APIKEY
      }
    });
  }

}

export default new EventRatingService();