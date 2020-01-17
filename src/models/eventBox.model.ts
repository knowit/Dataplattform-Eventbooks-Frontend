import { Expose, Transform } from 'class-transformer';
import moment from 'moment';

export default class EventBox {
  @Transform(value => !!value, { toClassOnly: true })
  @Transform(value => (value ? 1 : 0), { toPlainOnly: true })
  public active?: boolean;

  @Expose({ name: 'event_box_id' })
  public eventBoxId?: string;

  @Expose({ name: 'event_box_name' })
  public eventBoxName?: string;
}
