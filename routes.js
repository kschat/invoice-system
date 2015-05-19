'use strict';

const KoaRouter = require('koa-router');
const home = require('./handlers/home');
const job = require('./handlers/job');
const timeEntry = require('./handlers/timeEntry');

// App routes

const appRouter = new KoaRouter();

appRouter.get('/', home.index);

// API routes

const apiRouter = new KoaRouter({
  prefix: '/api'
});

apiRouter.get('/job', job.getAll);
apiRouter.get('/job/:id', job.getOne);
apiRouter.post('/job', job.create);
apiRouter.put('/job/:id', job.update);

apiRouter.get('/time_entry', timeEntry.getAll);
apiRouter.get('/time_entry/:id', timeEntry.getOne);

module.exports = [appRouter, apiRouter];
