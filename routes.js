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
apiRouter.delete('/job/:id', job.remove);

apiRouter.get('/time_entry', timeEntry.getAll);
apiRouter.get('/time_entry/:id', timeEntry.getOne);
apiRouter.post('/job/:job_id/time_entry', timeEntry.create);
apiRouter.put('/job/:job_id/time_entry/:time_entry_id', timeEntry.update);
apiRouter.delete('/job/:job_id/time_entry/:time_entry_id', timeEntry.remove);

module.exports = [appRouter, apiRouter];
