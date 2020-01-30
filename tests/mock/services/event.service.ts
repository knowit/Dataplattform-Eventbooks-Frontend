import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

// Mock verify event code
mock.onGet(/\/events\/\d+/).reply(200, {});

// Mock sendVote and SendComment
mock.onPost('/VoteType').reply(200, {});
