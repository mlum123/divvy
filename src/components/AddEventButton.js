// AddEventButton component that opens up a modal allowing you to add a new Google Calendar event
import React from "react";
import GoogleCal from "../GoogleCal";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

class AddEventButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
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
  }

  // use GoogleCal module to update Google Calendar event
  // using event id, start time, end time, summary, and description in state
  onSubmitForm() {
    GoogleCal.addEvent(
      this.state.startTime,
      this.state.endTime,
      this.state.summary,
      this.state.description,
      this.state.date
    );

    // close modal
    this.toggleModal();
  }

  render() {
    return (
      <>
        {this.state.modal ? (
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            style={{ fontFamily: "Karla, sans-serif" }}
          >
            <ModalHeader>Add New Task</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input
                    type="date"
                    name="date"
                    id="date"
                    onChange={this.handleChange}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="startTime">Start Time</Label>
                  <Input
                    type="text"
                    name="startTime"
                    id="startTime"
                    onChange={this.handleChange}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="endTime">End Time</Label>
                  <Input
                    type="text"
                    name="endTime"
                    id="endTime"
                    onChange={this.handleChange}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="summary">Task</Label>
                  <Input
                    type="text"
                    name="summary"
                    id="summary"
                    onChange={this.handleChange}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Who's Responsible</Label>
                  <Input
                    type="text"
                    name="description"
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
        <Button
          id="addTaskButton"
          color="primary"
          onClick={this.toggleModal}
          style={{ marginBottom: "1rem" }}
        >
          add new task
        </Button>
      </>
    );
  }
}

export default AddEventButton;
