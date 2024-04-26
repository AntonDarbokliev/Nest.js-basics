import { IsNotEmpty, IsOptional } from 'class-validator';

export class EditBookmarkDto {
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsOptional()
  link?: string;
}
