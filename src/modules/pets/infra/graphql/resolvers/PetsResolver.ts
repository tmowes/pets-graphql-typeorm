import { Pet } from '@modules/pets/infra/typeorm/entities/Pet'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'

@Resolver(Pet)
export class PetsResolver {
  @Query(() => [Pet])
  async getPets(): Promise<Pet[]> {
    return Pet.find()
  }

  @Mutation(() => Pet)
  async createPet(@Arg('name') name: string, @Arg('userId') userId: string): Promise<Pet> {
    const pet = Object.assign(new Pet(), { name, userId })
    await Pet.save(pet)
    return pet
  }
}
