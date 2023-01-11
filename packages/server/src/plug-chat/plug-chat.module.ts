import { DynamicModule, Module } from '@nestjs/common';
import { PLUG_CHAT_MODULE_OPTIONS } from './constants';
import { PlugChatProvider } from './plug-chat.provider';

export interface PlugChatModuleOptions {
  authToken: string;
}

@Module({})
export class PlugChatModule {
  static forRoot(options: PlugChatModuleOptions): DynamicModule {
    return {
      module: PlugChatModule,
      providers: [
        {
          provide: PLUG_CHAT_MODULE_OPTIONS,
          useValue: options,
        },
        PlugChatProvider,
      ],
      exports: [PlugChatProvider],
    };
  }
}
