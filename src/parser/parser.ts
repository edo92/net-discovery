import * as parsers from './os';

export default class Parser 
{
    private networks: string[];
    private parsers: any = parsers;

    constructor(networks: string[])
    {
        this.networks = networks;
    }

    public parseAll = (data: string): string[] => 
    {
        if (!data || !data[0]) 
        {
            return []
        }

        // Select parser based on operation system
        let parser = new this.parsers[process.platform]();
        
        // Set networks in os parser
        parser.setNetworks(this.networks);

        return parser.parse(data);
    }
}