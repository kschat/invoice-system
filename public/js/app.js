'use strict';

import React from 'react';
import ApplicationView from './components/application/views/application';
import appConstants from './components/application/appConstants';

new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve))
  .then(() => {
    React.render(<ApplicationView />, document.getElementById('content'));
  });
