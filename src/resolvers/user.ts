import { User } from '../entities/User';
import { MyContext } from '../types';
import { Resolver, Mutation, Arg, InputType, Field, Ctx, ObjectType } from "type-graphql";
import argon2 from 'argon2';




@InputType()
export class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class FieldError{
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse{
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(()=> User, {nullable: true})
    user?: User;
}


@Resolver()
export class UserResolver{
    @Mutation(() => User)
    async register(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ) {
    const hashedPassword = await argon2.hash(options.password)
    const user = em.create(User, { username: options.username,  password: hashedPassword})
    await em.persistAndFlush(user)
        return user;
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User, { username: options.username });
        if (!user) {
            return {
                errors: [
                    {
                        field: 'username',
                        message: "username doesn't exist",
                    }
                ],
            }
        }
        const valid = await argon2.verify(user.password, options.password)
        if (!valid) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: "incorrect password",                    
                    }
                ],
            }
        }
        return {
            user,
        };
    }
}