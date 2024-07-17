import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateDepositDto {
  @IsNotEmpty({ message: 'Valor deve ser informado.' })
  @IsInt()
  amount: number;
}
