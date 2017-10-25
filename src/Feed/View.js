import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import NoteCard from './NoteCard';
import { ref, firebaseAuth } from '../firebase';
import logo from '../react.svg';
import './Home.css';

const gradients = [
  {
    backgroundColor: '#FEE140',
    backgroundImage: 'linear-gradient(90deg, #FEE140 0%, #FA709A 100%)',
  },
  {
    backgroundColor: '#D9AFD9',
    backgroundImage: 'linear-gradient(90deg, #D9AFD9 0%, #97D9E1 100%)',
  },
  {
    backgroundColor: '#F4D03F',
    backgroundImage: 'linear-gradient(132deg, #F4D03F 0%, #16A085 100%)',
  },
];

class Home extends Component {
  componentDidMount() {
    // var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
    // starCountRef.on('value', function(snapshot) {
    //   updateStarCount(postElement, snapshot.val());
    // });
    console.log(firebaseAuth().currentUser)
    const { uid } = firebaseAuth().currentUser;
    const receivedPostsRef = ref.child(`users/${uid}/notes/received`);
    receivedPostsRef.on('value', snapshot => {
      console.log(snapshot.val())
      this.setState({ posts: snapshot.val() });
    });
  }
  render() {
    return (
      <div>
        <div className="h1" />
        <div className="flex relative justify-start items-center pt3 pb3 pr2">
          <h3
            className="tc absolute mb0 mt0"
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          >
            AfterNoted
          </h3>
          <div
            className="tc flex items-center justify-center"
            style={{
              width: '112px',
              height: '40px',
              backgroundColor: '#BDEDE0',
              marginLeft: 'auto',
              borderRadius: '20px',
              marginTop: '-1rem',
              marginBottom: '-1rem',
            }}
          >
            <Link to="/send">Write note!</Link>
          </div>
        </div>
        <div
          className="pt4 pl4 pr4 pb4 mt2"
          style={{ backgroundColor: 'rgba(189, 237, 224, .35)' }}
        >
          <h4 className="mt0 f6">WELCOME ALEX</h4>
          <p className="mb0">
            This is your home page. You’ll find notes from yourself, friends, and the community.
          </p>
        </div>
        <div className="pr3 pl3">
          <NoteCard
            text="You shine bright like diamonds."
            className="mt3"
            sender="You"
            gradient={gradients[0]}
          />
          <NoteCard
            sender="Amy"
            className="mt3"
            text="You are what you say your are. You’re a superstar."
            gradient={gradients[1]}
          />
          <NoteCard
            sender="Bryan"
            className="mt3"
            text="All people who achieve their dreams possess this one undramatic, unwavering and robust quality. They are willing to do what it takes. No exceptions. It struck me…"
            gradient={gradients[2]}
          />
          <NoteCard
            sender="Bryan"
            className="mt3"
            text="All people who achieve their dreams possess this one undramatic, unwavering and robust quality. They are willing to do what it takes. No exceptions. It struck me…"
            gradient={gradients[2]}
          />
        </div>
        <TabNavigation style={{ visibility: 'hidden', marginTop: '20px' }} />
        <TabNavigation className="fixed" />
      </div>
    );
  }
}

function TabNavigation({ className, style = {} }) {
  return (
    <div
      className={`${className}`}
      style={{ bottom: 0, width: '100vw', borderTop: '1px solid black', ...style }}
    >
      <div className="flex justify-around pv3" style={{ backgroundColor: 'aquamarine' }}>
        <span>HOME</span>
        <span>NOTES</span>
        <Link to="/profile">PROFILE</Link>
      </div>
    </div>
  );
}

export default Home;
