import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBookmarkDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  link: string;
}
