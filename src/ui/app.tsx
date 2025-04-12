import React, { useState, useEffect } from 'react';
import { NetworkMessages } from '@/common/network/messages';
import pkg from '../../package.json';

import { Button } from '@/ui/components/ui/button';
import { Input } from '@/ui/components/ui/input';
import { Label } from '@/ui/components/ui/label';
import { Spinner } from '@/ui/components/ui/spinner';

import { PluginOptions } from '@/common/types';

import '@/ui/styles/global.css';

const defaultOptions: PluginOptions = { text: 'world' };

const tailwindVersion = pkg.dependencies['tailwindcss'].replace('^', '');

function App() {
  const [ options, setOptions ] = useState(defaultOptions);
  const [ loaded, setLoaded ] = useState(false);

  useEffect(() => {
    async function loadPluginOptions() {
      try {
        const [ error, response ] = await NetworkMessages.LOAD_PLUGIN_OPTIONS.request({});
        if (error) throw error
        setOptions(response as PluginOptions);
      } catch (e) {
        NetworkMessages.LOG_ERROR.send({ message: 'Failed to load plugin options.' });
      } finally {
        setLoaded(true);
      }
    }

    loadPluginOptions();
  }, []);

  return loaded ? (
    <form className="p-8 w-full m-0 flex flex-col gap-4">
      <div>
        <div className="flex flex-col gap-1.5 *:transition *:duration-150">
          <Label htmlFor="text">Hello</Label>
          <div className="relative">
            <Input id="text" type="text" value={options.text} onChange={(e) => setOptions((prev) => ({ ...prev, text: e.target.value }))}/>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-1.5 *:transition *:duration-150">
        <Button className="" onClick={() => NetworkMessages.HELLO_WORLD.send(options)}>Submit</Button>
      </div>
      <div className="w-full flex gap-1.5 text-xs text-muted-foreground">
        <p>React: {React.version}</p>
        <p>TailwindCSS: {tailwindVersion}</p>
      </div>
    </form>
  ) : (
    <div className="size-full flex flex-col items-center justify-center">
        <Spinner size={48} />
    </div>
  );
}

export default App;
