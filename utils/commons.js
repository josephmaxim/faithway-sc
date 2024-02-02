const isDev = process.env.NODE_ENV != 'production';
const events = require('#utils/events.js')

function findEventValue(key) {
  for (const category in events) {
    if (Object.prototype.hasOwnProperty.call(events[category], key)) {
      return events[category][key];
    }
  }
  return 'Key not found';
}

module.exports = {
  isDev,
  urlHost: isDev ? `http://127.0.0.1:${process.env.PORT || 3007}` : 'https://sc.faithway.org',
  findEventValue,

}