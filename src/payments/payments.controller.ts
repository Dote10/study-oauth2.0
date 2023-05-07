import { Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Request, Response } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get('oauthcallback')
  async getToken(@Query('code') code: string, @Request() req, @Response() res) {
    return await this.paymentsService.getToken(req, res, code);
  }
}
