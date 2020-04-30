import { Expose, Transform } from 'class-transformer';
import EventBox from '@/models/eventBox.model';
import EventFeedback from '@/models/eventFeedback.model';
import { ZonedDateTime } from '@js-joda/core';

export default class Event {
  public id?: string;

  public creator?: string;

  @Expose({ name: 'isgoogle' })
  @Transform(value => !!value, { toClassOnly: true })
  @Transform(value => (value ? 1 : 0), { toPlainOnly: true })
  public isGoogleEvent?: boolean;

  @Transform(value => !!value, { toClassOnly: true })
  @Transform(value => (value ? 1 : 0), { toPlainOnly: true })
  public active?: boolean;

  @Expose({ name: 'eventcode' })
  public eventCode?: number;

  @Expose({ name: 'eventname' })
  public eventName?: string;

  @Expose({ name: 'start' })
  @Transform(value => ZonedDateTime.parse(value), { toClassOnly: true })
  @Transform(value => value.toString(), { toPlainOnly: true })
  public timestampFrom?: ZonedDateTime;

  @Expose({ name: 'end' })
  @Transform(value => ZonedDateTime.parse(value), { toClassOnly: true })
  @Transform(value => value.toString(), { toPlainOnly: true })
  public timestampTo?: ZonedDateTime;

  @Expose({ name: 'eventbox' })
  public eventBoxes?: EventBox[];

  @Expose({ name: 'feedback' })
  public eventFeedback?: EventFeedback;
}
