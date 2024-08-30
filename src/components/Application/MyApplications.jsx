import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import bg2image from "../../assets/RESUME.png";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const url =
          user && user.role === "Employer"
            ? "https://yourhr-backend-dsxg.onrender.com/api/v1/application/employer/getall"
            : "https://yourhr-backend-dsxg.onrender.com/api/v1/application/jobseeker/getall";

        const { data } = await axios.get(url, { withCredentials: true });
        setApplications(data.applications);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthorized) {
      fetchApplications();
    } else {
      navigate("/");
    }
  }, [isAuthorized, user, navigate]);

  const deleteApplication = async (id) => {
    try {
      await axios.delete(
        `https://yourhr-backend-dsxg.onrender.com/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
      toast.success("Application deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Replace with a loading spinner or animation if desired
  }

  return (
    <section
      className="my_applications page"
      style={{
        backgroundImage: `url(${bg2image})`,
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
        <center>
          <h1>{user && user.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}</h1>
          {applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) =>
              user.role === "Job Seeker" ? (
                <JobSeekerCard
                  key={element._id}
                  element={element}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ) : (
                <EmployerCard
                  key={element._id}
                  element={element}
                  openModal={openModal}
                />
              )
            )
          )}
        </center>
      </div>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => (
  <div className="job_seeker_card">
    <div className="detail">
      <p><span>Name:</span> {element.name}</p>
      <p><span>Email:</span> {element.email}</p>
      <p><span>Phone:</span> {element.phone}</p>
      <p><span>Address:</span> {element.address}</p>
      <p><span>CoverLetter:</span> {element.coverLetter}</p>
    </div>
    <div className="resume">
      <img
        src={element.resume.url}
        alt="resume"
        onClick={() => openModal(element.resume.url)}
      />
    </div>
    <div className="btn_area">
      <button onClick={() => deleteApplication(element._id)}>Delete Application</button>
    </div>
  </div>
);

const EmployerCard = ({ element, openModal }) => (
  <div className="job_seeker_card">
    <div className="detail">
      <p><span>Name:</span> {element.name}</p>
      <p><span>Email:</span> {element.email}</p>
      <p><span>Phone:</span> {element.phone}</p>
      <p><span>Address:</span> {element.address}</p>
      <p><span>CoverLetter:</span> {element.coverLetter}</p>
    </div>
    <div className="resume">
      <img
        src={element.resume.url}
        alt="resume"
        onClick={() => openModal(element.resume.url)}
      />
    </div>
  </div>
);
