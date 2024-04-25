import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseHelperModule } from './mongoose/mongooseHelper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    BookmarkModule,
    UserModule,
    MongooseHelperModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        await ConfigModule.envVariablesLoaded;
        let uri: string;
        if (configService.get('APP_ENV') == 'production') {
          uri = configService.get('MONGO_URI');
        } else if (configService.get('APP_ENV') == 'test') {
          uri = configService.get('MONGO_URI_TEST');
        }

        console.log(uri);

        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule,
  ],
})
export class AppModule {}
