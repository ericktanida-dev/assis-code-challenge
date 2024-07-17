import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateDepositDto {
  @IsNotEmpty({ message: 'Valor deve ser informado.' })
  @IsInt()
  @ApiProperty({ example: 520 })
  amount: number;
}
