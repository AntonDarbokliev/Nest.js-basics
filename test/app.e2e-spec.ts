import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MongooseHelperService } from '../src/mongoose/mongooseHelper.service';
// import { config } from 'dotenv';
// TODO: Make a testing db enviorment, a test db and .env var are already created
// Currently watcing this video => https://www.youtube.com/watch?v=R2ndY_JhxWk 9:00 min

describe('App e2e', () => {
  let app: INestApplication;
  let mongooseService: MongooseHelperService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    mongooseService = app.get(MongooseHelperService);
    await mongooseService.dropDB();
  });

  afterAll(() => {
    app.close();
  });

  it.todo('Should pass');
});
