import { Expose, Transform } from 'class-transformer';
import moment from 'moment';

export default class Event {
  public id?: string;

  @Expose({ name: 'calendar_id' })
  public calendarId?: string;

  public creator?: string;

  @Transform(value => !!value, { toClassOnly: true })
  @Transform(value => value ? 1 : 0, { toPlainOnly: true })
  public active?: boolean;

  @Expose({ name:  'event_id' })
  public eventId?: string;
  
  @Expose({ name:  'event_code' })
  public eventCode?: number;

  @Expose({ name:  'event_summary' })
  public eventSummary?: string;

  @Expose({ name:  'event_button_id' })
  public eventButtonId?: string;

  @Expose({ name:  'event_button_name' })
  public eventButtonName?: string;

  @Expose({ name:  'negative_count' })
  public negativeCount?: number;

  @Expose({ name:  'neutral_count' })
  public neutralCount?: number;

  @Expose({ name:  'positive_count' })
  public positiveCount?: number;

  @Expose({ name:  'timestamp_from' })
  @Transform(value => moment.unix(value).toDate(), { toClassOnly: true })
  @Transform(value => moment(value).unix(), { toPlainOnly: true })
  public timestampFrom?: Date;

  @Expose({ name:  'timestamp_to' })
  @Transform(value => moment.unix(value).toDate(), { toClassOnly: true })
  @Transform(value => moment(value).unix(), { toPlainOnly: true })
  public timestampTo?: Date;
}
