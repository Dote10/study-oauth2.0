import {
  Controller,
  Get,
  Inject,
  Request,
  Response,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('oauth')
  async createToken() {
    return await this.usersService.createToken();
  }

  @Get('receipt')
  async checkRecipt(@Query('code') code) {
    return await this.usersService.createToken4(code);
  }

  @Get('people')
  async getProfileInfo() {
    return this.usersService.getProfileInfo();
  }
}
