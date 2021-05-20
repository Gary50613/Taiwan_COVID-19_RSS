const RssFeedEmitter = require('rss-feed-emitter');
const Discord = require('./Discord');

class RSS {
    constructor() {
        this.startTime = new Date();
        this.feeder = new RssFeedEmitter();
    }

    awake() {
        this.feeder.add({
            url: 'https://www.cdc.gov.tw/RSS/RssXml/Hh094B49-DRwe2RR4eFfrQ?type=1',
            refresh: 10000
        });

        this.feeder.on('new-item', async item => {
            if(Date.parse(item['a10:updated']['#']) < this.startTime)
                return console.log(`[INFO] 過去的訊息 - ${item.title}`);
            Discord.createMessage(item);
        });
    }
}

module.exports = RSS;