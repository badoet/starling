import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@starterapp/common'

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string

  @Column()
  lastName: string
}
