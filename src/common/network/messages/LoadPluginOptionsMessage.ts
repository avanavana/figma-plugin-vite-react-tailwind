import * as Networker from 'monorepo-networker';
import { NetworkSide } from '@/common/network/sides';
import { LoadingError } from '@/common/errors';
import { formatError } from '@/common/utils';
import { PluginOptions, Payload } from '@/common/types';

type Response = [ LoadingError?, PluginOptions? ];

const defaultOptions: PluginOptions = {
  text: 'world'
};

export class LoadPluginOptionsMessage extends Networker.MessageType<Payload, Promise<Response>> {
  public receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  public async handle(payload: Payload, from: Networker.Side): Promise<Response> {
    try {
      const response = await figma.clientStorage.getAsync('pluginOptions');
      if (!response) await figma.clientStorage.setAsync('pluginOptions', defaultOptions);
      return [ , response || defaultOptions ];
    } catch (e) {
      return [ new LoadingError(`Failed to load plugin options: ${formatError(e)}`) ];
    }
  }
}
