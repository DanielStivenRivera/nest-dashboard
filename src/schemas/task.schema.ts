import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "./user.schema";


@Schema()
export class Task {

    @Prop({required: true, type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    userId : User;
    @Prop({required: true})
    title: string;
    @Prop({required: true})
    description: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);