import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePeerToPeerTransferDto {
  @IsNotEmpty({ message: 'Valor da transferencia não informada.' })
  @IsInt()
  amount: number;

  @IsNotEmpty({ message: 'Número da conta origem não informada.' })
  from: string;

  @IsNotEmpty({ message: 'Número da conta destino informada.' })
  to: string;
}
