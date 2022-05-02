import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileAction, fetchReposAction } from "./redux/slices/githubSlices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faLocationDot, faEnvelope, faCodeFork} from '@fortawesome/free-solid-svg-icons';
import './App.css';


function App({signOut}) {
  //ACCEPT USER INPUT
  const [user, setUser] = useState()

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchReposAction(user))
    dispatch(fetchProfileAction(user))
  }

  //DISPATCH ACTION
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   dispatch(fetchReposAction(user))
  //   dispatch(fetchProfileAction(user))
  // },[dispatch,user])

  //FETCH STORE DATA
  const store = useSelector(state => state?.repos);
  const {loading, reposList, profile, error} = store
  
  return (
    <section className="wrapper">
      <section className="Header">
        <ul className="pr-5">
          <li className="text-secondary">
            <span>Overview</span>
          </li>
          <li className="text-secondary">
            <span>
              <a href={profile?.repos_url}>
                Repositories{" "}
                {profile?.public_repos ? (
                  <span className="bg-light px-2 rounded font-weight-bold repo_span ">
                    {profile?.public_repos}
                  </span>
                ) : (
                  ""
                )}
              </a>
            </span>{" "}
          </li>
          <li className="text-secondary">
            <span>Projects</span>
          </li>
          <li className="text-secondary">
            <span>Packages</span>
          </li>
          <li className="text-secondary">
            <span>Star</span>
          </li>
        </ul>
      </section>
      <div className="search_bar">
          <form onSubmit={handleSubmit}>
            <input
              className="px-2 text-secondary"
              type="text"
              placeholder="Find a repository..."
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <input type="submit" className="search_hidden_button"/>
          </form>
      </div>

      {loading ? (
        <div className="loading_state">
          <h1 className="font-weight-bold lead text-secondary text-center">
            loading...
          </h1>
        </div>
      ) : error ? (
        <h2 className="text-danger font-weight-bold lead text-3xl text-center">
          {error?.data?.message}
        </h2>
      ) : (
        <section className="container row mx-auto dev_data">
          <div className="col-md-3 d-flex flex-column profile_sec">
            <div className="profile_pic">
              <img
                className=" rounded-circle"
                src={profile?.avatar_url}
                alt=""
              />
            </div>
            <div className="username">
              <h3 className="lead text-secondary font-weight-bold">
                {profile?.name}
              </h3>
              <h4 className="lead text-dark mt-2">{profile?.login}</h4>
            </div>
            <br />
            <a
              href={profile?.html_url}
              target="_blank"
              className=" btn btn-light w-100 follow_btn"
            >
              Follow
            </a>
            <div className="mt-3 mantra">{profile?.bio}</div>
            <div className=" h-2 mt-4 follow_status">
              <a href={profile?.followers_url} target="_blank">
                <span className="font-weight-bold">{profile?.followers} </span>
                Followers
              </a>
              <a href={profile?.following_url} target="_blank" className="ml-1">
                •<span className="font-weight-bold">{profile?.following} </span>
                Following
              </a>
            </div>
            <div className="mt-5 dev_contacts">
              <div className="location">
                {profile?.location ? (
                  <span>
                    <FontAwesomeIcon icon={faLocationDot} /> {profile?.location}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="email">
                {profile?.email ? (
                  <span>
                    <FontAwesomeIcon icon={faEnvelope} /> {profile?.email}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="twitter_acc">
                {profile?.twitter_username ? (
                  <span>
                    <FontAwesomeIcon icon={faTwitter} />{" "}
                    {profile?.twitter_username}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <button className="btn btn-secondary mt-3" onClick={signOut}>
              Sign Out
            </button>
          </div>
          <div className="col-md-9 repo_sect">
            <div className="repo_list">
              {reposList?.name !== "Error" &&
                reposList?.map((repo) => (
                  <div key={repo.id} className="repo">
                    <div className="repo_name">
                      <a
                        target="_blank"
                        href={repo?.html_url}
                        className="text-primary font-weight-bold lead"
                      >
                        {repo?.name}
                      </a>
                      {repo?.private ? (
                        ""
                      ) : (
                        <button className="ml-3 font-weight-bold text-secondary">
                          Public
                        </button>
                      )}
                    </div>
                    <div className="repo_desc text-secondary">
                      {repo?.description}
                    </div>
                    <div className="text-secondary additional_info">
                        {repo?.language?<span>⚪ {repo?.language}</span>:''}
                      {repo?.forks > 0 ? (
                        <span className="ml-2">
                          <FontAwesomeIcon icon={faCodeFork} /> {repo?.forks}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </section>
  );
}

export default App;
