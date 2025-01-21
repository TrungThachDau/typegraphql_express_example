import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  InputType,
  Field,
} from 'type-graphql'
import { User } from './User'
import { Context } from './context'

@InputType()
class UserCreateInput {
  @Field()
  username: string

  @Field({ nullable: true })
  password: string

}
@InputType()
class UserLoginInput {
  @Field()
  username: string

  @Field()
  password: string
}
@Resolver(User)
export class UserResolver {

  @Mutation(() => User)
  async postUser(
    @Arg('data') data: UserCreateInput,
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
      },
    })
  }
  @Query(() => User, { nullable: true })
  async login(
      @Arg('data') data: UserLoginInput,
      @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = await ctx.prisma.user.findUnique({
      where: { username: data.username },
    })

    if (!user || user.password !== data.password) {
      return null
    }

    return user
  }
  
  //Query all user
    @Query(() => [User])
    async users(@Ctx() ctx: Context): Promise<User[]> {
      return ctx.prisma.user.findMany()
    }
}

