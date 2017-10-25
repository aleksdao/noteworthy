import React from 'react';

function Note({ text }) {
  return (
    <div
      className="content pl3 pr3 pt3 pb3 flex flex-column b f4 justify-center fw4"
      style={{ flexGrow: 1, color: '#FFFFFF' }}
    >
      {text}
    </div>
  );
}

function SentFrom({ sender }) {
  return (
    <div
      className="meta pt2 pb2 pl3 pr3 flex justify-between b--moon-gray bw0 bt-1px b--solid items-center"
      style={{ height: '40px', flexGrow: 0, backgroundColor: 'white', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}
    >
      <span className="f5">From <span className="b">{sender}</span></span>
      <span>Resend</span>
    </div>
  );
}

function NoteCard({ text, className, sender, gradient }) {
  return (
    <div
      className={`${className} card br4 helvetica flex flex-column b--solid b--moon-gray bw-1px`}
      style={{ ...gradient, minHeight: '9rem' }}
    >
      <Note text={text} />
      <SentFrom sender={sender} />
    </div>
  );
}

export default NoteCard;
