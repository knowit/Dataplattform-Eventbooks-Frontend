import API from '@aws-amplify/api';
import { EVENT_API, EVENT_ENDPOINT, INGEST_API, INGEST_APIKEY } from '@/constants/api.constants';
import { deserialize } from 'class-transformer';
import Event from '@/models/event.model';
import axios, { AxiosResponse } from 'axios';

// Mock the network layer during dev
if (process.env.NODE_ENV !== 'production' && process.env.VUE_APP_MOCK_NETWORK) require('../../tests/mock/services/event.service');

export const getEvents = async () => {
  try {
    const { data: { body } } = await API.get(EVENT_API, '/dataplattform-events/asd', { response: true });
    return deserialize(Event, body);
  } catch (error) {
    throw error;
  }
};

export const verifyEventCode = (eventCode: String) => {
  const url = EVENT_ENDPOINT + `/events/${eventCode}`;

  return axios.get(url, {
    baseURL: EVENT_ENDPOINT,
  });
};

export const sendVote = (eventCode: string, vote: number) => {
  const url = '/VoteType';
  const storedVote = localStorage.getItem(eventCode);
  const previousVote = storedVote !== null ? Number(storedVote) : undefined;

  localStorage.setItem(eventCode, vote.toString());

  const data = {
    event_code: eventCode,
    current_vote: vote,
    previous_vote: previousVote
  };

  return axios.post(url, data, {
    baseURL: INGEST_API,
    headers: {
      'x-api-key': INGEST_APIKEY
    }
  });
};

export const sendComment = (eventCode: string, comment: string): Promise<void | AxiosResponse<any>> => {
  if (comment === '') {
    // Do not sent empty comment
    return Promise.resolve();
  }

  const url = '/VoteType';
  const currentVote = Number(localStorage.getItem(eventCode));
  const data = {
    event_code: eventCode,
    current_vote: currentVote,
    comment
  };
  return axios.post(url, data, {
    baseURL: INGEST_API,
    headers: {
      'x-api-key': INGEST_APIKEY
    }
  });
};
