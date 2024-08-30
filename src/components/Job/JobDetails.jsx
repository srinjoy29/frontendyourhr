import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();
  const { isAuthorized, token, user } = useContext(Context); // Added token from context

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
      return;
    }

    const fetchJob = async () => {
      try {
        const response = await axios.get(`https://yourhr-backend-dsxg.onrender.com/api/v1/job/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use JWT token in the Authorization header
          },
        });
        setJob(response.data.job);
      } catch (error) {
        setError("Failed to fetch job details");
        navigateTo("/notfound");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, isAuthorized, navigateTo, token]); // Added token to dependencies

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or a more sophisticated loading component
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span>{job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`} className="apply-button">Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
