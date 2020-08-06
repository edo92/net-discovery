import { Iresult } from '../iface';

export default class LinuxParser
{
    public parse = (row: any): Iresult => 
    {
        // Ignore unresolved hosts.
        if (row === '' || row.indexOf('incomplete') >= 0) 
        {
            throw 'Incompleate';
        }

        var chunks = row.split(' ').filter(Boolean);

        return {
            name: chunks[0],
            ip: chunks[1].match(/\((.*)\)/)[1],
            mac: chunks[3]
        }
    }
}