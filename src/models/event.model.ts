import { Expose, Transform } from 'class-transformer';
import moment from 'moment';
import EventBox from '@/models/eventBox.model';
import EventFeedback from '@/models/eventFeedback.model';

export default class Event {
  public id?: string;

  @Expose({ name: 'calendar_id' })
  public calendarId?: string;

  public creator?: string;

  @Transform(value => !!value, { toClassOnly: true })
  @Transform(value => (value ? 1 : 0), { toPlainOnly: true })
  public active?: boolean;

  @Expose({ name: 'event_id' })
  public eventId?: string;

  @Expose({ name: 'event_code' })
  public eventCode?: number;

  @Expose({ name: 'event_name' })
  public eventName?: string;

  @Expose({ name: 'event_summary' })
  public eventSummary?: string;

  @Expose({ name: 'timestamp_from' })
  @Transform(value => moment.unix(value).toDate(), { toClassOnly: true })
  @Transform(value => moment(value).unix(), { toPlainOnly: true })
  public timestampFrom?: Date;

  @Expose({ name: 'timestamp_to' })
  @Transform(value => moment.unix(value).toDate(), { toClassOnly: true })
  @Transform(value => moment(value).unix(), { toPlainOnly: true })
  public timestampTo?: Date;

  @Expose({ name: 'event_box' })
  public eventBoxes?: EventBox[];

  @Expose({ name: 'feedback' })
  public eventFeedback?: EventFeedback;
}
