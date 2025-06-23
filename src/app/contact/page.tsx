'use client';
import { useState, FormEvent } from 'react';
import Navbar from '../../../components/Navbar';

type Message = {
  message: string;
  createdAt: string;
  replies?: Array<{
    adminReply: string;
    repliedAt: Date | string;
  }>;
};

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    option: '',
    message: '',
    phone: '',
    other: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [hovered, setHovered] = useState(false);
  const [showMessagesLogin, setShowMessagesLogin] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [loggedIn, setLogged极速赛车开奖号码历史记录In] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.option) {
      setError('Please fill all required fields including password.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setError('');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          option: '',
          message: '',
          phone: '',
          other: ''
        });
      } else {
        setError('Submission failed. Please try again.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  const handleCheckMessages = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password: userPassword })
      });
      if (res.ok) {
        const data = await res.json();
        setUserMessages(data.messages || []);
        setLoggedIn(true);
      } else {
        alert('Invalid email or password');
      }
    } catch (err) {
      alert('Error checking messages');
    }
  };

  return (
    <>
      <Navbar />
      <main style={{
        maxWidth: 600,
        margin: '60px auto 0 auto',
        padding: '40px',
        background: 'rgba(20,20,20,0.9)',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 24, color: '#fff' }}>Contact Us</h1>

        {submitted ? (
          <div style={{ color: '#4CA极速赛车开奖号码历史记录F50', textAlign: 'center' }}>
            Thank you! We'll respond shortly.
            <br />
            <span style={{ fontSize: '0.9rem', color: '#ccc' }}>
              Remember your email and password to check replies using the blue icon on the right.
            </span>
            <br /><br />
            <button
              onClick={() => setSubmitted(false)}
              style={{
                padding: '10px 20px',
                background: '#e53935',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600,
                marginTop: 12,
                transition: 'background 0.2s'
              }}
              onMouseOver={e => (e.currentTarget as HTMLButtonElement).style.background = '#b71c1c'}
              onMouseOut={e => (e.currentTarget as HTMLButtonElement).style.background = '#e53935'}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex极速赛车开奖号码历史记录', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: 8, color: '#fff' }}>First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 6,
                    border: '1px solid #333',
                    background: '#111',
                    color: '#fff'
                  }}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: 8, color: '#fff' }}>Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 6,
                    border: '1px solid #333',
                    background: '#111',
                    color: '#fff'
                  }}
                  required
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#fff' }}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 6,
                  border: '1px solid #333',
                  background: '#111',
                  color: '#fff'
                }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#fff' }}>
                Set Password <span style={{ fontSize: '0.85rem', color: '#ccc' }}> (to check replies later)</span>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                placeholder="Minimum 6 characters"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 6,
                  border: '1px solid #333',
                  background: '#111',
                  color: '#fff'
                }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#fff' }}>How can we help you?</label>
              <div style={{ display: 'flex', gap: 12 }}>
                {['message', 'callback', 'other'].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData({ ...formData, option: opt })}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 6,
                      border: formData.option === opt ? '2px solid #e53935' : '1px solid #333',
                      background: formData.option === opt ? '#e53935' : '#111',
                      color: '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {opt === 'message' ? 'Send Message' : 
                     opt === 'callback' ? 'Request Callback' : 'Other'}
                  </button>
                ))}
              </div>
            </div>
            {formData.option === 'message' && (
              <div>
                <label style={{ display: 'block', marginBottom: 8, color: '#fff' }}>
                  Your Message <span style={{ fontSize: '0.85rem', color: '#ccc' }}> (you can check the replies by clicking on the blue icon on the right)</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 6,
                    border: '1px solid #333',
                    background: '#111',
                    color: '#fff',
                    minHeight: 120
                  }}
                />
              </div>
            )}
            {formData.option === 'callback' && (
              <div>
                <label style={{ display: 'block', marginBottom: 8, color: '#fff' }}>Phone Number</label>
               极速赛车开奖号码历史记录 <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 6,
                    border: '1px solid #333',
                    background: '#111',
                    color: '#fff'
                  }}
                />
              </div>
            )}
            {formData.option === 'other' && (
              <div>
                <label style={{ display: 'block', marginBottom: 8, color: '#fff' }}>Details</label>
                <textarea
                  value={formData.other}
                  onChange={e => setFormData({ ...formData, other: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 6,
                    border: '1px solid #333',
                    background: '#111',
                    color: '#fff',
                    minHeight: 80
                  }}
                />
              </div>
            )}
            {error && <div style={{ color: '#e53935' }}>{error}</div>}
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                background: '#e53935',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600,
                transition: 'background 0.2s'
              }}
              onMouseOver={e => (e.currentTarget as HTMLButtonElement).style.background = '#b71c1c'}
              onMouseOut={e => (e.currentTarget as HTMLButtonElement).style.background = '#e53935'}
            >
              Send Message
            </button>
          </form>
        )}
      </main>

      {/* Check Messages Floating Bubble */}
      <div style={{
        position: 'fixed',
        bottom: 100,
        right: 20,
        zIndex: 500
      }}>
        <button
          onClick={() => setShowMessagesLogin(true)}
          style={{
            background: '#007BFF',
            borderRadius: '50%',
            padding: 12,
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'}
          onMouseOut={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'}
          title="Check Messages"
        >
          📨
        </button>
      </div>

      {/* Messages Login Modal */}
      {showMessagesLogin && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#181818',
            borderRadius: 12,
            padding: 32,
            maxWidth: 500,
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            {!loggedIn ? (
              <>
                <h2 style={{ color: '#fff', marginBottom: 24, fontSize: '1.5rem' }}>Check Your Messages</h2>
                <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: 20 }}>
                  Enter the email and password you used when sending your message.
                </p>
                <form onSubmit={handleCheckMessages}>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', marginBottom: 8, color: '#fff' }}>Email</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={e => setUserEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 6,
                        border: '1px solid #333',
                        background: '#111',
                        color: '#fff'
                      }}
                      required
                    />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', marginBottom: 8, color: '#fff' }}>Password</label>
                    <input
                      type="password"
                      value={userPassword}
                      onChange={e => setUserPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 6,
                        border: '1px solid #333',
                        background: '#111',
                        color: '#fff'
                      }}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      type="submit"
                      style={{
                        flex: 1,
                        padding: '12px',
                        background: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'pointer'
                      }}
                    >
                      Check Messages
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowMessagesLogin(false)}
                      style={{
                        flex: 1,
                        padding: '极速赛车开奖号码历史记录12px',
                        background: '#666',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'pointer'
                      }}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 style={{ color: '#fff', marginBottom: 24, fontSize: '1.5rem' }}>Your Messages</h2>
                <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                  {userMessages.length === 0 ? (
                    <div style={{ color: '#fff', textAlign: 'center' }}>
                      No messages found for this email/password combination.
                    </div>
                  ) : (
                    userMessages.map((msg, index) => (
                      <div
                        key={index}
                        style={{
                          background: '#222',
                          borderRadius: 8,
                          padding: 16,
                          marginBottom: 16
                        }}
                      >
                        <div style={{ color: '#fff', marginBottom: 8 }}>
                          <strong>Message:</strong> {msg.message}
                        </div>
                        <div style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: 12 }}>
                          Sent: {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : '-'}
                        </div>
                        {msg.replies && msg.replies.length > 0 && (
                          <div style={{ borderTop: '1px solid #333', paddingTop: 12 }}>
                            <div style={{ color: '#25D366', marginBottom: 8 }}>Admin Replies:</div>
                            {msg.replies.map((reply, replyIndex) => (
                              <div
                                key={replyIndex}
                                style={{
                                  background: '#2d2d2d',
                                  borderRadius: 6,
                                  padding: 8,
                                  marginBottom: 8
                                }}
                              >
                                <div style={{ color: '#fff' }}>{reply.adminReply}</div>
                                <div style={{ color: '#888', fontSize: '0.8rem' }}>
                                  {new Date(reply.repliedAt as string).toLocaleString()}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
                <button
                  onClick={() => {
                    setShowMessagesLogin(false);
                    setLoggedIn(false);
                    setUserMessages([]);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#666',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    marginTop: 16
                  }}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* WhatsApp Floating Button with hover image and caption */}
      <div
        style={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 501,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        {/* Caption */}
        {hovered && (
          <span
            style={{
              marginBottom: 8,
              padding: '6px 14px',
              background: '#222',
              color: '#fff',
              borderRadius: 6,
              fontSize: '1rem',
              fontWeight: 500,
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
              opacity: 1,
              transform: 'translateY(-4px)',
              transition: 'opacity 0.18s, transform 0.18s'
            }}
          >
            Contact the author
          </span>
        )}
        <a
          href="https://wa.me/+919667540916"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#25D366',
            borderRadius: '50%',
            padding: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            transition: 'transform 0.2s',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {hovered ? (
            <img
              src="/image.png"
              alt="Kushagra Kartikeye"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)'
              }}
            />
          ) : (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="currentColor" />
              <path d="M22.9 9.1C22.3 8.5 21.4 8.3 20.5 8.6L13 11C11.7 11.4 10.6 12.5 10.2 13.8L7.8 21.3C7.5 22.2 7.7 23.1 8.3 23.7C8.7 24.1 9.3 24.3 9.9 24.3C10.1 24.3 10.3 24.3 10.5 24.2L18 21.8C19.3 21.4 20.4 20.3 20.8 19L23.4 11.5C23.7 10.6 23.5 9.7 22.9 9.1ZM19.5 19C19极速赛车开奖号码历史记录.3 19.6 18.8 20.1 18.2 20.3L10.7 22.7L13.1 15.2C13.3 14.6 13.8 14.1 14.4 13.9L21.9 11.5C22.1 11.4 22.3 11.4 22.5 11.5C22.7 11.6 22.8 11.8 22.8 12L20.2 19.5C20.1 19.7 20 19.9 19.5 19Z" fill="white"/>
            </svg>
          )}
        </a>
      </div>
    </>
  );
}
