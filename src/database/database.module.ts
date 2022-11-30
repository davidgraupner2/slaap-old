import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        connection:
          'postgresql://postgres:sIrlk46Wlxa73jirI@localhost:5434/slaap2',
        searchPath: ['public'],
      },
    }),
  ],
  providers: [],
  controllers: [],
})
export class DatabaseModule {}
