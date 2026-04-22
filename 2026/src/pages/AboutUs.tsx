import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>About Us Page</h1>
      <p>This is the About Us page.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default AboutUs;
