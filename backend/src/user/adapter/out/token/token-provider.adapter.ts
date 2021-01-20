import { JwtService } from '@nestjs/jwt';
import { TokenProviderPort } from '../../../application/port/out/query/token-provider.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenProviderAdapter implements TokenProviderPort {
  constructor(private readonly jwtService: JwtService) {}

  signToken(id: number, username: string): string {
    return this.jwtService.sign({ id, username });
  }
}
