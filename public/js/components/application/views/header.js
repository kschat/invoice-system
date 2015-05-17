import React from 'react';
import { Button } from 'react-bootstrap';

const Header = React.createClass({
  render() {
    return (
      <div className="page-header clearfix">
        <h1>
          Jobs <small>Current active jobs</small>
          <Button className="pull-right">
            <i className="fa fa-plus" />
          </Button>
        </h1>
      </div>
    );
  }
});

export default Header;
