# nodebl
リードミー書き途中です
## Install
```sh
npm install --save git://git@github.com:uehara1414/nodebl.git
```

## How To Use
```javascript
var bl = require('nodebl');

bl.getBusLocationInformation(153, 165, (err, info)=> {
  console.log(info);
});
console.log(bl.stations_data);
```
