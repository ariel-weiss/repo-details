import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [userName, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [repo, setRepos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    searchRepos();
  }
  function searchRepos() {
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/users/${userName}/repos`,
    }).then(res => {
      setLoading(false);
      setRepos(res.data);
    });
  }

  return (
    <div className="page">
      <div className="landing-page-container">
        <div className="left-side">
          <form className="form">
            <input
              className="input"
              value={userName}
              placeholder="Github Username"
              onChange={e => setUsername(e.target.value)}
            />
            <button className="button" onClick={handleSubmit}>
              {loading ? "Sending..." : "Search!"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
