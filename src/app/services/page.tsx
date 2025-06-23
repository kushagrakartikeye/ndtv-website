import Navbar from '../../../components/Navbar';
import FAQAccordion from '../../../components/FAQAccordion';
import NDTVOfficesMap from '../../../components/NDTVOfficesMap';

// NDTV Office Locations
const ndtvOffices = [
  {
    id: 1,
    name: "NDTV Head Office",
    address: "W-17, 2nd Floor, Greater Kailash - I, New Delhi, Delhi 110048",
    phone: "+91-11-41577777",
    email: "corporate@ndtv.com",
    position: { lat: 28.5494, lng: 77.2427 },
    type: "headquarters"
  },
  {
    id: 2, 
    name: "NDTV Archana Complex",
    address: "B 50-A, Archana Complex, Greater Kailash - I, New Delhi 110048",
    phone: "+91-11-41577777", 
    email: "corporate@ndtv.com",
    position: { lat: 28.5489, lng: 77.2431 },
    type: "office"
  },
  {
    id: 3,
    name: "NDTV Okhla Office", 
    address: "Okhla Phase - 3, New Delhi, Delhi 110020",
    phone: "+91-11-41577777",
    email: "corporate@ndtv.com", 
    position: { lat: 28.5355, lng: 77.3203 },
    type: "office"
  }
];

export default function Content() {
  return (
    <>
      <Navbar />
      <main>
        {/* Your existing services content */}
        <section style={{ padding: '40px 20px' }}>
          <h1>Our Services</h1>
          <p>
            Services that NDTV provides are accurate and up to date news, ext.
          </p>
        </section>

        {/* New Maps Section */}
        <section style={{ 
          padding: '60px 20px',
          background: '#f8f9fa',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '16px',
            color: '#333'
          }}>
            Our Locations
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#666', 
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px auto'
          }}>
            Visit us at our offices across New Delhi. Click on the markers to see detailed contact information.
          </p>
          
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '8px'
          }}>
            <NDTVOfficesMap offices={ndtvOffices} />
          </div>

          {/* Office Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '40px',
            maxWidth: '1200px',
            margin: '40px auto 0 auto'
          }}>
            {ndtvOffices.map((office) => (
              <div key={office.id} style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: office.type === 'headquarters' ? '2px solid #e53935' : '1px solid #ddd'
              }}>
                <h3 style={{ 
                  color: '#e53935', 
                  marginBottom: '12px',
                  fontSize: '1.1rem'
                }}>
                  {office.name}
                  {office.type === 'headquarters' && (
                    <span style={{ 
                      background: '#e53935', 
                      color: 'white', 
                      padding: '2px 8px', 
                      borderRadius: '4px', 
                      fontSize: '0.7rem',
                      marginLeft: '8px'
                    }}>
                      HQ
                    </span>
                  )}
                </h3>
                <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
                  📍 {office.address}
                </p>
                <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
                  📞 {office.phone}
                </p>
                <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
                  ✉️ {office.email}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Your existing FAQ section */}
        <FAQAccordion />
      </main>
    </>
  );
}
