import { Injectable, Inject, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class SchemaService implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    console.log(
      'Schema Service received Application BootStrap Event - Starting...',
    );
    console.log(
      'Schema Service received Application BootStrap Event - Started...',
    );
  }
}
