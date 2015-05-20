import React from 'react';
import { Button, ModalTrigger } from 'react-bootstrap';
import AddJobModal from '../../job/views/addJobModal';

const Header = React.createClass({
  render() {
    return (
      <div className="page-header clearfix">
        <h1>
          Jobs <small>Current jobs</small>
          <ModalTrigger modal={<AddJobModal />}>
            <Button className="pull-right">
              <i className="fa fa-plus" />
            </Button>
          </ModalTrigger>
        </h1>
      </div>
    );
  }
});

export default Header;
