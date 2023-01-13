import { PLUG_CHAT_MODULE_OPTIONS } from './constants';
import { PlugChatModuleOptions } from './plug-chat.module';
import axios, { AxiosInstance } from 'axios';
import { Inject } from '@nestjs/common';

export class PlugChatProvider {
  private baseUrl = 'https://www.plugchat.com.br/api/whatsapp';
  private client: AxiosInstance;

  constructor(
    @Inject(PLUG_CHAT_MODULE_OPTIONS)
    private readonly options: PlugChatModuleOptions,
  ) {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${this.options.authToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  public async sendText(message: string, phone: string) {
    const body = {
      message,
      phone: phone.replace(/\D/g, ''),
    };

    try {
      const response = await this.client.post('/send-text', body);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
