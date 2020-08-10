# Net Discovery

### Npm install net-discover
- Node.js libary <a href='#'>net-discover</a> that helps to discover devices on the same network. 


```js
import net from 'netdiscovery';

net.discover().then((devices) => {
    console.log(devices);
})
//# Returns
//# { name: "Apple device", mac:"223:38:92:2e:2a:03", ip:"132.112.1.123" }

// On Windows name will be unidentified
//# { name: "unidentified", mac:"223:38:92:2e:2a:03", ip:"132.112.1.123" }
```