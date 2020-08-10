const net = require('../dist');

net.discover().then((res) => {
    console.log(res);
})