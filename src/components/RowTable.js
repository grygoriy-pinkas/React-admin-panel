import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Button, Modal, Alert } from 'react-bootstrap';
import EditUser from './EditUser';
import { deleteUser } from '../services/users';
import ViewInfoUser from './ViewInfoUser';

class RowTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chekingDelete: false,
      showAlert: false,
      idWillDelete: 1000,
      idWillEdit: 1000,
      showUser: false,
      edit: false
    };

    this.renderEdit = this.renderEdit.bind(this);
    this.hendleDelete = this.hendleDelete.bind(this);
    this.acceptDelete = this.acceptDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.successDelete = this.successDelete.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.deleteModalWindow = this.deleteModalWindow.bind(this);
    this.hideEditWindow = this.hideEditWindow.bind(this);
  }

  renderEdit(event) {
    this.setState({ idWillEdit: event.target.id });
    this.setState({ edit: true });
  }

  hendleDelete(event) {
    this.setState({ idWillDelete: event.target.id });
    this.setState({ nameWillDelete: event.target.username });
    this.setState({ chekingDelete: true });
  }

  acceptDelete() {
    var status = this;
    deleteUser(this.state.idWillDelete)
      .then(function(res) {
        status.setState({ showAlert: true });
      })
      .catch(function(res) {});
    this.setState({ chekingDelete: false });
  }

  successDelete() {
    return (
      <Alert bsStyle="success">
        <strong>Congratulations!</strong> You jast have corrected user data!.
        <span> </span>
        <Button onClick={this.handleDismiss}>Hide Alert</Button>
      </Alert>
    );
  }

  handleDismiss() {
    this.setState({ showAlert: false });
  }

  cancelDelete() {
    this.setState({ chekingDelete: false });
  }

  hideEditWindow(value) {
    this.setState({ edit: value });
  }

  deleteModalWindow() {
    return (
      <div>
        <div className="static-modal">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Delete User?</Modal.Title>
            </Modal.Header>

            <Modal.Body>Warning! Removal is irreversible </Modal.Body>

            <Modal.Footer>
              <Button bsStyle="danger" onClick={this.acceptDelete}>
                Delete
              </Button>
              <Button bsStyle="info" onClick={this.cancelDelete}>
                Cencel
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>

        <tr>
          <td onClick={this.props.showUser}>{this.props.id}</td>
          <td>{this.props.name}</td>
          <td>{this.props.email}</td>
          <td>
            <Button
              bsStyle="primary"
              bsSize="xsmall"
              id={this.props.id}
              onClick={this.renderEdit}
            >
              Edit
            </Button>
            <span> </span>

            <Button
              bsStyle="warning"
              bsSize="xsmall"
              id={this.props.id}
              onClick={this.hendleDelete}
            >
              Delete
            </Button>
          </td>
        </tr>
      </div>
    );
  }

  render() {
    {
      if (this.state.chekingDelete) {
        return this.deleteModalWindow();
        //тут чомусь при виводі модального вікна міняються стилі таблиці
      } else if (this.state.edit) {
        return (
          <EditUser
            name={this.props.name}
            email={this.props.email}
            userId={this.state.idWillEdit}
            hideEditWindow={this.hideEditWindow}
          />
        );
      } else {
        return (
          <tr>
            <td
              onClick={() => {
                this.props.showUser(true, <ViewInfoUser data={this.props} />);
              }}
            >
              {this.props.id}
            </td>
            <td>{this.props.name}</td>
            <td>{this.props.email}</td>
            <td>
              <Button
                bsStyle="primary"
                bsSize="xsmall"
                id={this.props.id}
                onClick={this.renderEdit}
              >
                Edit
              </Button>
              <span> </span>

              <Button
                bsStyle="warning"
                bsSize="xsmall"
                id={this.props.id}
                onClick={this.hendleDelete}
              >
                Delete
              </Button>
            </td>
          </tr>
        );
      }
    }
  }
}

export default RowTable;

RowTable.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string
};
