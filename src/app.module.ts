import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './services/task/task.service';
import { User, UserSchema } from './schemas/user.schema';
import { Task, TaskSchema } from './schemas/task.schema';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), MongooseModule.forRoot(process.env.URIDB, 
    {useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
  MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Task.name, schema: TaskSchema}]),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
