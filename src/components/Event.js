// Event component to display each individual event in Calendar view
import React from "react";
import {
  Toast,
  ToastBody,
  ToastHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
import GoogleCal from "../GoogleCal";

class Event extends React.Component {
  // info for event is passed down to Event component by Calendar component
  // info is stored as array of 6 elements: [startTime, endTime, summary, description, id, startDateTime]
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      eventId: this.props.info[4],
      startTime: this.props.info[0],
      endTime: this.props.info[1],
      summary: this.props.info[2],
      description: this.props.info[3],
      origDateTime: this.props.info[5],
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  // when any form input changes, re-set its state to new value
  // so that we can submit the state values when we click submit button, calling onSubmitForm function
  handleChange(event) {
    let { name, value } = event.target;

    this.setState({ [name]: value });
    console.log(this.state);
  }

  // use GoogleCal module to update Google Calendar event
  // using event id, start time, end time, summary, and description in state
  onSubmitForm() {
    GoogleCal.updateEvent(
      this.state.eventId,
      this.state.startTime,
      this.state.endTime,
      this.state.summary,
      this.state.description,
      this.state.origDateTime
    );

    // close modal
    this.toggleModal();
  }

  // when user clicks pencil in toast of the task, a modal will pop up,
  // allowing user to edit that Google event
  render() {
    return (
      <>
        {this.state.modal ? (
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            style={{ fontFamily: "Karla, sans-serif" }}
          >
            <ModalHeader>{this.props.info[2]}</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="startTime">Start Time</Label>
                  <Input
                    type="text"
                    name="startTime"
                    defaultValue={this.props.info[0]}
                    id="startTime"
                    onChange={this.handleChange}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="endTime">End Time</Label>
                  <Input
                    type="text"
                    name="endTime"
                    defaultValue={this.props.info[1]}
                    id="endTime"
                    onChange={this.handleChange}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="summary">Task Name</Label>
                  <Input
                    type="text"
                    name="summary"
                    defaultValue={this.props.info[2]}
                    id="summary"
                    onChange={this.handleChange}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Who's Responsible</Label>
                  <Input
                    type="text"
                    name="description"
                    defaultValue={this.props.info[3]}
                    id="description"
                    onChange={this.handleChange}
                  ></Input>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onSubmitForm}>
                Submit
              </Button>{" "}
              <Button color="secondary" onClick={this.toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        ) : (
          ""
        )}
        <td>
          <Toast style={{ background: "#90ccf4" }}>
            <ToastHeader style={{ color: "black" }}>
              {this.props.info[2]}
            </ToastHeader>
            <ToastBody>
              {this.props.info[0]} - {this.props.info[1]}
              <br></br>
              <Row>
                <Col xs="9">{this.props.info[3]} </Col>
                <Col xs="3">
                  <i
                    style={{ marginLeft: "auto", cursor: "pointer" }}
                    className="fas fa-pencil-alt"
                    onClick={this.toggleModal}
                  ></i>
                </Col>
              </Row>
            </ToastBody>
          </Toast>
        </td>
      </>
    );
  }
}

export default Event;
