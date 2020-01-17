import { Expose, Transform } from 'class-transformer';
import moment from 'moment';

export default class EventFeedback {
  @Expose({ name: 'event_id' })
  public eventId?: string;

  @Expose({ name: 'negative_count' })
  public negativeCount!: number;

  @Expose({ name: 'neutral_count' })
  public neutralCount!: number;

  @Expose({ name: 'positive_count' })
  public positiveCount!: number;

  @Expose({ name: 'details' })
  public details?: FeedbackDetails[];
}

export class FeedbackDetails {
  @Expose({ name: 'comment' })
  public comment?: string;

  @Expose({ name: 'vote' })
  public vote?: number;
}
