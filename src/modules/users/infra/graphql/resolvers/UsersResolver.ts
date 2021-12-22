import { Pet } from '@modules/pets/infra/typeorm/entities/Pet'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'

@Resolver(User)
export class UsersResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return User.find()
  }

  @Mutation(() => User)
  async createUser(
    @Arg('firstname') firstname: string,
    @Arg('lastname') lastname: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<User> {
    const user = Object.assign(new User(), {
      firstname,
      lastname,
      email,
      password,
    })
    await User.save(user)
    return user
  }

  @FieldResolver(() => [Pet])
  async pets(@Root() user: User): Promise<Pet[]> {
    return Pet.find({
      where: {
        userId: user.id,
      },
    })
  }
}
