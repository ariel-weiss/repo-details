import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RepoDetails from './RepoDetails';

function App() {
  const [userName, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchFailed, setsearchFailed] = useState(false);
  const [repos, setRepos] = useState([]);
  const [details, setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    setRepos([]);
    setDetails({});
  }, [userName]);

  function handleSubmit(e) {
    e.preventDefault();
    searchRepos();
  }
  function searchRepos() {
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/users/${userName}/repos`,
    })
      .then(res => {
        setsearchFailed(false);
        setLoading(false);
        setRepos(res.data);
    })
      .catch(err => {
        console.log(err);
        setsearchFailed(true);
        setLoading(false);

    });
  }

  function renderError() {
    return (
      <div className="row">
        <h2 className="repo-name">
          Oops! user name not found
        </h2>
      </div>
    )
  }
  function renderRepo(repo) {
    return (
      <div className="row" onClick={() => getDetails(repo.name)} key={repo.id}>
        <h2 className="repo-name">
          {repo.name}
        </h2>
      </div>
    )
  }
  function getDetails(repoName) {
    setDetailsLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/repos/${userName}/${repoName}`,
    })
      .then(res => {
        setDetailsLoading(false);
        setDetails(res.data);
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
              {loading ? "Searching..." : "Search!"}
            </button>
          </form>

          <div className="results-container">
            {searchFailed ? renderError() : repos.map(renderRepo)}
          </div>
        </div>
        <RepoDetails details={details} loading={detailsLoading} />
      </div>
    </div>
  );
}

export default App;
