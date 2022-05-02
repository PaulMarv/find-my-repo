import { React, useState, useEffect } from 'react';
import { supabase } from '../client/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub} from '@fortawesome/free-brands-svg-icons';
import App from '../App';
import './Login.css';

function Login() {
  const [visitor, setVisitor] = useState(null);
  useEffect(()=>{
    checkVisitor();
    window.addEventListener('hashchange', function() {
      checkVisitor();
    })
  },[])
  async function checkVisitor(){
    const visitor = supabase.auth.user();
    setVisitor(visitor);
  }
  async function signInWithGithub (){
    await supabase.auth.signIn({
      provider: 'github'
    })
  }
  async function signOut() {
    await supabase.auth.signOut();
    setVisitor(null)
  }
  if (visitor) {
    return (
      <div>
        <App signOut={signOut}/>
      </div>
    )
  }

  return (
    <div className="Login_Page">
      <div className="signIn_panel">
        <h1 className='font-weight-bold'>Hello!</h1>
        <h2>Please sign in to check public repositories</h2>
          <button 
          className='bg-success Login_Btn' 
          onClick={signInWithGithub} 
          type="submit">
          sign in with github  <FontAwesomeIcon icon={faGithub}/>
          </button>
      </div>
    </div>
  );
}

export default Login;
