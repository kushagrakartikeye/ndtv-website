'use client';
import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';

const NDTVOfficesMap = ({ offices }) => {
  const [selectedOffice, setSelectedOffice] = useState(null);

  return (
    <div style={{ width: '100%', height: '500px', borderRadius: '8px', overflow: 'hidden' }}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          defaultZoom={11}
          defaultCenter={{ lat: 28.5494, lng: 77.2427 }}
          mapId="ndtv-offices-map"
          style={{ width: '100%', height: '100%' }}
        >
          {offices.map((office) => (
            <AdvancedMarker
              key={office.id}
              position={office.position}
              onClick={() => setSelectedOffice(office)}
            >
              <Pin
                background={office.type === 'headquarters' ? '#e53935' : '#4CAF50'}
                glyphColor={'#000'}
                borderColor={'#000'}
              />
            </AdvancedMarker>
          ))}

          {selectedOffice && (
            <InfoWindow
              position={selectedOffice.position}
              onCloseClick={() => setSelectedOffice(null)}
            >
              <div style={{ 
                padding: '12px', 
                maxWidth: '300px',
                color: '#333'
              }}>
                <h3 style={{ 
                  margin: '0 0 8px 0', 
                  color: '#e53935',
                  fontSize: '1.1rem'
                }}>
                  {selectedOffice.name}
                </h3>
                <p style={{ 
                  margin: '4px 0', 
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}>
                  📍 {selectedOffice.address}
                </p>
                <p style={{ 
                  margin: '4px 0', 
                  fontSize: '0.9rem' 
                }}>
                  📞 {selectedOffice.phone}
                </p>
                <p style={{ 
                  margin: '4px 0', 
                  fontSize: '0.9rem' 
                }}>
                  ✉️ {selectedOffice.email}
                </p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default NDTVOfficesMap;
