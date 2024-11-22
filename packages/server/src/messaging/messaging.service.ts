import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosInstance } from 'axios';

@Injectable()
export class MessagingService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.EVOLUTION_API_URL,
      headers: {
        apikey: process.env.EVOLUTION_API_KEY,
      },
    });
  }

  async sendWhatsappCode(message: string, phone: string) {
    try {
      await this.client.post('/message/sendText/exampleInstance', {
        number: `+55${phone}`,
        textMessage: {
          text: message,
        },
      });
      return { message: 'Código enviado ao seu Whatsapp' };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(
          'MessagingService ~ sendWhatsappCode ~ error.response.data:',
          error.response.data,
        );
      } else {
        console.log('ERRO AO ENVIAR CODIGO PELO WHATSAPP: ', error?.response);
      }
    }
  }
}
