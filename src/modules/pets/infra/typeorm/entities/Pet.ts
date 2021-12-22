import { User } from '@modules/users/infra/typeorm/entities/User'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export const petTableName = 'pets'

@Entity(petTableName)
@ObjectType()
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  name: string

  @ManyToOne(() => User, { nullable: true })
  @Field(() => User)
  user?: User

  @Column()
  @Field()
  userId: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
