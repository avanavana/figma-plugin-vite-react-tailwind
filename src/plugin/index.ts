import { initializeNetwork } from '@/common/network/init';
import { NetworkSide } from '@/common/network/sides';

async function initializePlugin() {
  initializeNetwork(NetworkSide.PLUGIN);

  figma.showUI(__html__, {
    width: 500,
    height: 500,
    title: 'Figma Plugin Template',
  });
}

initializePlugin();
