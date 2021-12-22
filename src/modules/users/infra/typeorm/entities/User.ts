import { Pet } from '@modules/pets/infra/typeorm/entities/Pet'
import bcrypt from 'bcryptjs'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export const userTableName = 'users'

@Entity(userTableName)
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  firstname: string

  @Column()
  @Field()
  lastname: string

  @Column({ unique: true })
  @Field()
  email: string

  password: string

  @Column()
  @Field()
  password_hash: string

  @Field(() => [Pet])
  pets: Pet[]

  @BeforeInsert()
  private async hashPassword() {
    this.password_hash = await bcrypt.hash(this.password, 8)
  }

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
