import Image from 'next/image';

export default function Logo() {
  return (
    <div style={{
      background: '#9b0002',
      padding: '0 0 0 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0 0 18px 18px'
    }}>
      <Image
        src="/logo.png" // put your NDTV logo as logo.png in /public
        alt="NDTV Logo"
        width={180}
        height={100}
        priority
      />
    </div>
  );
}
