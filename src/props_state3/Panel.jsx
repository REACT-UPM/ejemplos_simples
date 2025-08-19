export default function Panel({ title, children }) {
  return (
    <section style={{
      border: '2px solid #4a90e2',
      borderRadius: 8,
      padding: 16,
      marginTop: 12,
      background: '#f8fafc'
    }}>
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      <div>
        {children}
      </div>
    </section>
  );
}
