import { Expose } from 'class-transformer'

export class User {
  @Expose()
  name: string

  @Expose()
  email: string

  password: string
}
