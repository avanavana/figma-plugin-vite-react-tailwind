import { NetworkSide } from '@common/network/sides';
import * as Networker from 'monorepo-networker';

interface Payload {
  message: string;
}

export class ErrorMessage extends Networker.MessageType<Payload> {
  public receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  handle(payload: Payload, from: Networker.Side) {
    console.error(`Error: "${payload.message}"`);
  }
}
