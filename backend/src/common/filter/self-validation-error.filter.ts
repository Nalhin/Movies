import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Type,
} from '@nestjs/common';
import { Response } from 'express';
import { SelfValidationError } from '../self-validating/self-validating';

@Catch((SelfValidationError as unknown) as Type)
export class SelfValidationErrorFilter implements ExceptionFilter {
  catch(exception: SelfValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      errors: exception.errors,
      message: 'Invalid arguments provided',
    });
  }
}
