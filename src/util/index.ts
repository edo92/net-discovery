const ip = require('ip');
const os = require('os');

export const getNetlist = (): any => 
{
    const interfaces = os.networkInterfaces();
    let result = [];

    for (let key in interfaces)
    {
        let addresses = interfaces[key];
        for (let i = addresses.length; i--;) 
        {
            let address = addresses[i];
            if (address.family === 'IPv4' && !address.internal) 
            {
                let subnet = ip.subnet(address.address, address.netmask);
                let current = ip.toLong(subnet.firstAddress);
                let last = ip.toLong(subnet.lastAddress) - 1;
                while (current++ < last) result.push(ip.fromLong(current));
            }
        }
    }

    return result;
}