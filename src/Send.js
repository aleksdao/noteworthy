import React from 'react';
import Link from 'react-router-dom/Link';
import { ref, firebaseAuth } from './firebase';
import 'tachyons/css/tachyons.min.css';

function createNote(senderUID, recipientUID, time, note) {
  const createdAt = Date.now();
  console.log({
    createdAt,
    note,
    senderUID,
    recipientUID
  })
  debugger;
  const newNote = {
    createdAt,
    note
  }
  const newNoteWithUserIDs = {
    ...newNote,
    senderUID,
    recipientUID,
  };
  const newNoteKey = ref.child('messages').push().key;
  const sentRef = ref.child(`users/${senderUID}/notes/sent`).push();
  const receivedRef = ref.child(`users/${recipientUID}/notes/received`).push();

  const updates = {
    [`notes/${newNoteKey}`]: newNoteWithUserIDs,
    [`users/${senderUID}/notes/sent/${newNoteKey}`]: newNote,
    [`users/${recipientUID}/notes/received/${newNoteKey}`]: newNote,
  }

  ref.update(updates);
}

class Send extends React.Component {
  state = {
    recipient: undefined,
    message: undefined,
  };
  componentDidMount() {}
  sendNote = e => {
    e.preventDefault();
    console.log(firebaseAuth().currentUser);
    createNote(firebaseAuth().currentUser.uid, this.state.recipient, Date.now(), this.state.message);
  };
  handleTextInput = e => {
    console.log(e);
    this.setState({ message: e.target.value });
    console.log(this.state.message);
  };
  selectRecipient = ({ target: { name, value } }) => {
    console.log({ name, value });
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { history } = this.props;
    return (
      <div className="flex-column">
        <div className="bg-pale-dark-green h1" />
        <div className="tc bg-pale-green pt3 pb3 flex justify-between items-center ph3">
          <Link style={{ visibility: 'hidden' }} to="/">X</Link>
          <h3 className="mt0 mb0">Write a note</h3>
          <Link style={{ textDecoration: 'none' }} to="/">X</Link>
        </div>
        <div className="body pl3 pr3">
          <form>
            <div className="flex justify-between mt4">
              <h4 className="mb0 mt0 f6">SEND TO</h4>
              <div className="send-to-container">
                <input
                  className="mr2"
                  type="radio"
                  id="sendToMyself"
                  name="recipient"
                  value={firebaseAuth().currentUser.uid}
                  onChange={this.selectRecipient}
                />
                <label htmlFor="sendToMyself">
                  <span className="radio">Myself</span>
                </label>
              </div>
              <div className="send-to-container">
                <input
                  className="mr2"
                  type="radio"
                  id="sendToFriend"
                  name="recipient"
                  value="friend"
                  onChange={this.selectRecipient}
                />
                <label htmlFor="sendToFriend">
                  <span className="radio">Friend</span>
                </label>
              </div>
            </div>
            <div className="flex justify-between mt4">
              <h4 className="mb0 mt0 f6">DELIVER BY</h4>
              <div className="f6">Random Date</div>
            </div>
            <div className="mt4">
              <h4 className="f6 mt0 mb0">NOTE</h4>
              <textarea
                className="w-100 h6 b--moon-gray pt3 pl3 mt4"
                onChange={this.handleTextInput}
                placeholder="Write a note to your future self or to a friend."
              />
            </div>
            <button
              className="w-100 b--none bg-orange-btn h3 tc mln3 mrn3 absolute left-0 right-0 bottom-0"
              onClick={this.sendNote}
              disabled={!this.state.recipient}
            >
              Send note
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Send;
