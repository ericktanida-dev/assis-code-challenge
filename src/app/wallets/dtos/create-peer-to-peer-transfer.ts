import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePeerToPeerTransferDto {
  @ApiProperty({ example: 520 })
  @IsNotEmpty({ message: 'Valor da transferencia não informada.' })
  @IsInt()
  amount: number;

  @ApiProperty({ example: '1235-2' })
  @IsNotEmpty({ message: 'Número da conta origem não informada.' })
  from: string;

  @ApiProperty({ example: '1235-1' })
  @IsNotEmpty({ message: 'Número da conta destino informada.' })
  to: string;
}
