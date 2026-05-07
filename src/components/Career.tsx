import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer Intern</h4>
                <h5>Encapsulation IT</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Developed backend systems using Java and contributed to the 
              development of robust server-side applications.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI/ML Developer Intern</h4>
                <h5>CODTECH</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Built AI-based applications and tools, focusing on machine learning 
              models and intelligent system integration.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer Intern</h4>
                <h5>IHUB</h5>
              </div>
              <h3>2024 - NOW</h3>
            </div>
            <p>
              Developing full-stack applications using the MERN stack and 
              handling end-to-end debugging and deployment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
