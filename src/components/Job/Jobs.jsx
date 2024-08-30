import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import bg4image from "../../assets/resume3.png";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthorized, token } = useContext(Context); // Use token from context if needed
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://yourhr-backend-dsxg.onrender.com/api/v1/job/getall", {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token in the Authorization header
          },
        });
        setJobs(response.data.jobs || []);
      } catch (error) {
        setError("Failed to fetch jobs");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isAuthorized, navigateTo, token]); // Include token in dependencies if used

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or a more sophisticated loading component
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="jobs page"
      style={{
        backgroundImage: `url(${bg4image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '75px 0 50px 0',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobs.length === 0 ? (
            <p>No jobs available</p>
          ) : (
            jobs.map((element) => (
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
