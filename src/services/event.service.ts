import API from '@aws-amplify/api';
import { EVENT_API } from '@/constants/api.constants';
import { deserialize } from 'class-transformer';
import Event from '@/models/event.model';


export const getEvents = async () => {
  try {
    const { data: { body } } = await API.get(EVENT_API, '/dataplattform-events/asd', { response: true });
    return deserialize(Event, body);
  } catch (error) {
    throw error;
  }
};