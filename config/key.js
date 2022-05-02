import { deveopmentPort } from './deveopment.js';
import { productionPort } from './production.js';

export const servicePort = function () {
    if (process.env.NODE_ENV === 'production') {
        // NODE_ENV가 배포모드면 배포모드로 동작
        // module.exports = require('./production.js');
        return deveopmentPort;
    } else {
        return productionPort;
        // module.exports = require('./deveopment.js'); // NODE_ENV가 배포모드가 아니면 개발모드로 동작
    }
};
