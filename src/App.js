import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [pos, setPos] = useState(0);
  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  if(loading){
    return (
      <main className='loading section'>
        <h1>Loading...</h1>
      </main>
    );
  }
  if(error){
    return (
      <main className='loading'>
        <h1>Error...</h1>
      </main>
    );
  }
  const {id, order, title, dates, duties, company } = jobs[pos];
  return (
    <main className='section'>
      <div className='title'>
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((job, index) => {
            return (
              <button
                key={job.id}
                className={`job-btn ${index === pos ? 'active-btn' : ''}`}
                onClick={() => setPos(index)}
              >
                {job.company}
              </button>
            );
          })}
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>
          {duties.map((duty) => {
            return (
              <div className='job-desc'>
                <FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })}
          <button className='btn'>More Info</button>
        </article>
      </div>
    </main>
  );
}

export default App;
