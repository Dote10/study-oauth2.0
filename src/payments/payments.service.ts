import { Injectable } from '@nestjs/common';
import * as handlebars from 'hbs';

@Injectable()
export class PaymentsService {
  async getToken(req, res, code) {
    console.log('작동');
    await res.status(200).json({ code });
    return { code };
  }
}
