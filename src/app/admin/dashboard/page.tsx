'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../components/Navbar';

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState(null); // 'contacts' or 'subscribers'
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/contacts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        setContacts(json.contacts || []);
        setSubscribers(json.subscribers || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const handleReply = async (contactId: string) => {
    if (!replyText.trim()) return;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/reply', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contactId,
          reply: replyText,
          repliedBy: 'Admin'
        })
      });

      if (res.ok) {
        setReplyingTo(null);
        setReplyText('');
        // Refresh data
        const dataRes = await fetch('/api/admin/contacts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await dataRes.json();
        setContacts(json.contacts || []);
      }
    } catch (err) {
      console.error('Error sending reply:', err);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', margin: '100px 0', color: '#fff' }}>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: '2.2rem', color: '#fff' }}>Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: '#e53935',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Logout
          </button>
        </div>

        {/* Toggle Cards */}
        {!activeView && (
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginBottom: 40 }}>
            <div
              onClick={() => setActiveView('contacts')}
              style={{
                width: 300,
                height: 200,
                background: 'linear-gradient(135deg, #e53935, #b71c1c)',
                borderRadius: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(229,57,53,0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                color: '#fff'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(229,57,53,0.4)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(229,57,53,0.3)';
              }}
            >
              <h2 style={{ fontSize: '1.5rem', marginBottom: 12, fontWeight: 700 }}>Contact Messages</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>{contacts.length} messages</p>
            </div>

            <div
              onClick={() => setActiveView('subscribers')}
              style={{
                width: 300,
                height: 200,
                background: 'linear-gradient(135deg, #25D366, #20c258)',
                borderRadius: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                color: '#fff'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(37,211,102,0.4)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.3)';
              }}
            >
              <h2 style={{ fontSize: '1.5rem', marginBottom: 12, fontWeight: 700 }}>Newsletter Subscribers</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>{subscribers.length} subscribers</p>
            </div>
          </div>
        )}

        {/* Back Button */}
        {activeView && (
          <button
            onClick={() => setActiveView(null)}
            style={{
              padding: '8px 16px',
              background: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              marginBottom: 24,
              fontWeight: 500
            }}
          >
            ← Back to Dashboard
          </button>
        )}

        {/* Contacts Table - Complete Data */}
        {activeView === 'contacts' && (
          <div style={{ background: '#181818', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#fff', marginBottom: 16 }}>Contact Messages</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1200 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #333' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#fff' }}>First Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#fff' }}>Last Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#fff' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#fff' }}>Option</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#fff' }}>Message</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#fff' }}>Phone</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#fff' }}>Other</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#fff' }}>Created At</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#fff' }}>Reply</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((item, index) => (
                    <React.Fragment key={item._id || index}>
                      <tr style={{ borderBottom: '1px solid #333' }}>
                        <td style={{ padding: '12px', color: '#fff' }}>{item.firstName || '-'}</td>
                        <td style={{ padding: '12px', color: '#fff' }}>{item.lastName || '-'}</td>
                        <td style={{ padding: '12px', color: '#fff' }}>{item.email || '-'}</td>
                        <td style={{ padding: '12px', color: '#fff' }}>{item.option || '-'}</td>
                        <td style={{ padding: '12px', color: '#fff' }}>{item.message || '-'}</td>
                        <td style={{ padding: '12px', color: '#fff' }}>{item.phone || '-'}</td>
                        <td style={{ padding: '12px', color: '#fff' }}>{item.other || '-'}</td>
                        <td style={{ padding: '12px', color: '#fff' }}>
                          {item.createdAt ? new Date(item.createdAt).toLocaleString() : '-'}
                        </td>
                        <td style={{ padding: '12px', color: '#fff' }}>
                          {item.option === 'message' && (
                            <button
                              onClick={() => setReplyingTo(item._id)}
                              style={{
                                padding: '6px 12px',
                                background: '#25D366',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 4,
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                              }}
                            >
                              Reply
                            </button>
                          )}
                        </td>
                      </tr>
                      {replyingTo === item._id && (
                        <tr>
                          <td colSpan={9} style={{ padding: '12px', background: '#222' }}>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Type your reply..."
                                style={{
                                  flex: 1,
                                  padding: '8px',
                                  borderRadius: 4,
                                  border: '1px solid #444',
                                  background: '#111',
                                  color: '#fff',
                                  minHeight: 60
                                }}
                              />
                              <button
                                onClick={() => handleReply(item._id)}
                                style={{
                                  padding: '8px 16px',
                                  background: '#e53935',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: 4,
                                  cursor: 'pointer'
                                }}
                              >
                                Send
                              </button>
                              <button
                                onClick={() => setReplyingTo(null)}
                                style={{
                                  padding: '8px 16px',
                                  background: '#666',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: 4,
                                  cursor: 'pointer'
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Subscribers Table - Only Email */}
        {activeView === 'subscribers' && (
          <div style={{ background: '#181818', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#fff', marginBottom: 16 }}>Newsletter Subscribers</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#fff' }}>Email</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '12px', color: '#fff' }}>{item.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
