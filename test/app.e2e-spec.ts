import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MongooseHelperService } from '../src/mongoose/mongooseHelper.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmarkDto } from 'src/bookmark/dto';
import { EditBookmarkDto } from 'src/bookmark/dto/editBookmark.dto';

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
    await app.listen(3333);

    mongooseService = app.get(MongooseHelperService);
    await mongooseService.dropDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@gmail.com',
      password: 'test123',
    };

    describe('Signup', () => {
      it('throw if no email given', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('throw if no password given', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('throw if no body given', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });

      it('Signs up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
            password: dto.password,
          })
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('throw if no email given', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('throw if no password given', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('throw if no body given', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });

      it('Signs up', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
            password: dto.password,
          })
          .expectStatus(200)
          .stores('userToken', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('edits user', () => {
        const dto: EditUserDto = {
          email: 'test@gmail.com',
          firstName: 'test',
        };
        return pactum
          .spec()
          .patch('/users')
          .withBody(dto)
          .expectStatus(200)
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectBodyContains(dto.email);
      });
    });
  });

  describe('Bookmarks', () => {
    describe('Get bookmarks', () => {
      it('gets bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create bookmark', () => {
      const dto: CreateBookmarkDto = {
        link: 'randomlink',
        title: 'TestTitle',
        description: 'Bla bla',
      };
      it('creates a bookmark', () => {
        return pactum
          .spec()
          .post('/bookmarks')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectStatus(201)
          .expectBodyContains(dto.link)
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.description)
          .stores('bookmarkId', '_id');
      });
    });

    describe('Get bookmark by id', () => {
      it('gets bookmark by id', () => {
        return pactum
          .spec()
          .get('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}');
      });
    });

    describe('Edit bookmark by id', () => {
      const dto: EditBookmarkDto = {
        title: 'Edited test title',
        link: 'Edited test link',
      };
      it('Edits bookmars', () => {
        return pactum
          .spec()
          .patch('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .withBody(dto)
          .expectBodyContains('$S{bookmarkId}')
          .expectBodyContains('Edited test title');
      });
    });

    describe('Delete bookmark by id', () => {
      it('should', () => {
        return pactum
          .spec()
          .delete('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectStatus(200);
      });
    });
  });
});
