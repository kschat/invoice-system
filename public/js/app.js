'use strict';

import Flux from 'flux';
import React from 'react';
import AppDispatcher from './dispatcher';
import { EventEmitter } from 'events';
import ApplicationView from './components/application/application.view';

new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve))
  .then(() => {
    React.render(<ApplicationView />, document.getElementById('content'));
  });
