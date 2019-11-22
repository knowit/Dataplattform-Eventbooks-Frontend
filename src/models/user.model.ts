import { Expose } from 'class-transformer';

export default class User {
  @Expose()
  public email?: string;
  
  @Expose()
  public name?: string;

  @Expose({ name: 'family_name' })
  public familyName?: string;

  @Expose({ name: 'given_name' })
  public givenName?: string;
}