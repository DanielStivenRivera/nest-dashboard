import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "./user.schema";

export type TaskDocument = Task & mongoose.Document;

@Schema()
export class Task {

    @Prop({required: true})
    userId : string;
    @Prop({required: true})
    title: string;
    @Prop({required: true})
    description: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);