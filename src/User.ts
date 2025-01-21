import 'reflect-metadata'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number

  @Field()
  username: string

  @Field((type) => String, { nullable: true })
  password?: string | null
}
