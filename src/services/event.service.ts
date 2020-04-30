import API from '@aws-amplify/api';
import { EVENT_API, EVENT_ENDPOINT, INGEST_API, INGEST_APIKEY } from '@/constants/api.constants';
import { deserialize } from 'class-transformer';
import Event from '@/models/event.model';
import EventBox from '@/models/eventBox.model';
import EventFeedback, { FeedbackDetails } from '@/models/eventFeedback.model';
import axios, { AxiosResponse } from 'axios';
import { ZonedDateTime } from '@js-joda/core';

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

export const getCurrentEvents = () => {
  // TODO send resquest to backend
  // Filter getEvents for current events
  return [createDummyEvent()];
};

export const getPreviousEvents = () => {
  // TODO send resquest to backend
  // Filter getEvents for previous events
  return [createDummyEvent(), createDummyEvent()];
};

export const getFutureEvents = () => {
  // TODO send resquest to backend
  // Filter getEvents for future events
  return [createDummyEvent(), createDummyEvent()];
};

// Dummy Data
const createDummyEvent = ():Event =>  {
  const e = new Event();
  e.id = 'id' + Math.floor(Math.random() * 1000);
  e.creator = 'Admin';
  e.isGoogleEvent = false;
  e.timestampFrom = ZonedDateTime.now();
  e.timestampTo = ZonedDateTime.now().plusHours(1);
  e.eventName = 'Navn på event';
  e.eventCode = 12345;
  e.active = true;
  e.eventBoxes = [
    new EventBox(),
    new EventBox()
  ];
  e.eventBoxes[0].eventBoxName = 'Alpha';
  e.eventBoxes[0].eventBoxId = 'id1';
  e.eventBoxes[1].eventBoxName = 'Bravo';
  e.eventBoxes[1].eventBoxId = 'id2';
  e.eventFeedback = new EventFeedback();
  e.eventFeedback.negativeCount = 12;
  e.eventFeedback.neutralCount = 8;
  e.eventFeedback.positiveCount = 54;
  e.eventFeedback.details = [
    new FeedbackDetails(),
    new FeedbackDetails(),
    new FeedbackDetails()
  ];
  e.eventFeedback.details[0].comment = 'Lorem Ipsum Dolor Sit Amet';
  e.eventFeedback.details[0].vote = 1;
  e.eventFeedback.details[1].comment = 'The quick brown fox jumps over the lazy dogfox jumps over the lazy dog fox jumps over the lazy dog fox jumps over the lazy dog fox jumps over the lazy dog'.repeat(
    10
  );
  e.eventFeedback.details[1].vote = -1;
  e.eventFeedback.details[2].comment =
    'The difference is that an element with v-show will always be rendered and remain in the DOM; v-show only toggles the display CSS property of the element.';
  e.eventFeedback.details[2].vote = 0;
  return e;
};
