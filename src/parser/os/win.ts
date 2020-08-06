import { Iresult } from '../iface';

export default class WinParser
{
    public networks: string[] = [];


    public get getNetworks(): string[] {
        return this.networks;
    }

    public setNetworks = (networks: string[]) => {
        this.networks = networks;
    }
    
    public parse = (data: string): object => 
    {
        let winRows = data[0].split('\n').splice(1);
        return winRows.map((row: string) => 
        {
            return this.winParser(row, this.getNetworks);
        })
            .filter(Boolean);
    }

    private winParser = (row: string, networks: string[]):Iresult | undefined => 
    {
        let chunks = row.split(/\s+/g).filter((el: string) => 
            { 
                return el.length > 1 
            }
        );

        let ipAddress = chunks[0]; // Parse name.
        if (!~networks.indexOf(ipAddress)) 
        {
            return
        }

        let macAddress = chunks[1].replace(/-/g, ':'); // Parse mac
        if (macAddress === '(incomplete)') 
        {
            return
        }

        return {
            name: 'unidentified',
            ip: ipAddress,
            mac: macAddress
        }
    }
}