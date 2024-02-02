const isDev = process.env.NODE_ENV != 'production';

module.exports = {
  isDev,
  urlHost: isDev ? `http://127.0.0.1:${process.env.PORT || 3007}` : 'https://sc.faithway.org'
}