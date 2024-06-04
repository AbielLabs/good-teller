import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  exports: [ScheduleModule.forRoot()],
})
export class TaskModule {}
