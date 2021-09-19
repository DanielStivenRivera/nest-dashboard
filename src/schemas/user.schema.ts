import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    fullName: string;
    @Prop({required: true.valueOf, unique: true})
    email: string;
    @Prop({required: true, unique: true})
    password: string;
    @Prop({required: true, unique: true})
    rol: number;
}

export const UserSchema = SchemaFactory.createForClass(User);