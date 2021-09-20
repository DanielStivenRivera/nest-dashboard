import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/schemas/task.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Module({
  imports: [ MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Task.name, schema: TaskSchema}])],
  providers: [UserService,],
  exports: [UserService]
})
export class UserModule {}