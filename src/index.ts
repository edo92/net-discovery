const cp = require('mz/child_process');
const net = require('net');

import * as util from './util';
import Parser from './parser';

class Network 
{
    private TEN_MEGA_BYTE: number = 1024 * 1024 * 10;
    private ONE_MINUTE: number = 60 * 1000;
    private PORT: number = 80;
    private networks: string[] = util.getNetlist();

    public discover = async (callback?: any) => 
    {
        const results = await this.pingServers().then(this.arpAll);
        callback && callback(results);
        return results;
    }

    private arpAll = (): string[] => 
    {
        const command = cp.exec('arp -a', {
            maxBuffer: this.TEN_MEGA_BYTE,
            timeout: this.ONE_MINUTE
        })

        let parser = new Parser(this.networks);
        return command.then(parser.parseAll);
    }

    private pingServers = () => 
    {
        const pingServer = (address: string) => 
        {
            return new Promise((resolve) => 
            {
                const socket = new net.Socket();

                const close = () => {
                    socket.destroy();
                    resolve(address);
                }

                socket.setTimeout(1000, close);
                socket.connect(this.PORT, address, close);
                socket.once('error', close);
            })
        }
        return Promise.all(this.networks.map(pingServer));
    }
}

export default new Network;
