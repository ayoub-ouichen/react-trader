const express = require('express');
var cors = require('cors');
const app = express();

const priceRoute = require('./routes/getPrice');
const suiteMaxMinRoute = require('./routes/getSuiteMaxMin');
const probableLineRoute = require('./routes/getProbableLine');
const trendLinesRoute = require('./routes/getTrendlines');
const smaRoute = require('./routes/getSMA');
const eliottWavesRoute = require('./routes/getEliottWaves');
const eliottWavesRRoute = require('./routes/getEliottWavesR');
const fibonacciRoute = require('./routes/getFibonacci');
const roundNumbresRoute = require('./routes/getRoundNumbres');
const pointPerLineRoute = require('./routes/getPointsPerLine');
const lineByPointsRoute = require('./routes/getLineByPoints');
const correlZoneRoute = require('./routes/getCorrelationZone');
const proTrendsRoute = require('./routes/getProTrends');
const lineDoubleRoute = require('./routes/getLineDouble');
const mainCalculeRoute = require('./routes/getMainCalcule');
const getDataRoute = require('./routes/getData');

app.use(cors({credentials: true, origin: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: '50mb'}));

app.use('/starter', priceRoute);
app.use('/starter', suiteMaxMinRoute);
app.use('/starter', probableLineRoute);
app.use('/starter', trendLinesRoute);
app.use('/starter', smaRoute);
app.use('/starter', eliottWavesRoute);
app.use('/starter', eliottWavesRRoute);
app.use('/starter', fibonacciRoute);
app.use('/starter', roundNumbresRoute);
app.use('/starter', pointPerLineRoute);
app.use('/starter', lineByPointsRoute);
app.use('/starter', correlZoneRoute);
app.use('/starter', proTrendsRoute);
app.use('/starter', lineDoubleRoute);
app.use('/starter', mainCalculeRoute);
app.use('/starter', getDataRoute);

module.exports = app;
