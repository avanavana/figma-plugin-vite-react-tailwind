import * as Networker from 'monorepo-networker';
import { NetworkSide } from '@/common/network/sides';
import { formatError } from '@/common/utils';
import { Payload } from '@/common/types';

export class HelloWorldMessage extends Networker.MessageType<Payload> {
  private async setPluginOptions(payload: Payload): Promise<void> {
    try {
      await figma.clientStorage.setAsync('pluginOptions', { text: payload.text || 'world' });
    } catch (e) {
      console.error(formatError(e));
    }
  }

  public receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  public handle(payload: Payload, from: Networker.Side): void {
    figma.notify(`Hello ${payload.text || 'world'}`);
    this.setPluginOptions(payload);
    figma.closePlugin();
  }
}
