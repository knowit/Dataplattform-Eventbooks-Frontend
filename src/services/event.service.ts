import API from '@aws-amplify/api';
import { EVENT_API, EVENT_ENDPOINT } from '@/constants/api.constants';
import { deserialize } from 'class-transformer';
import Event from '@/models/event.model';
import axios from 'axios';


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