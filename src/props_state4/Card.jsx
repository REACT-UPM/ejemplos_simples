export default function Card({ title, footer, children }) {
  return (
    <section style={{
      border: '1px solid #d0d7de',
      borderRadius: 8,
      padding: 16,
      margin: '12px 0',
      background: '#fff',
      boxShadow: '0 1px 2px rgba(0,0,0,0.06)'
    }}>
      {title && (
        <header style={{ marginBottom: 8, fontWeight: 600 }}>{title}</header>
      )}
      <div style={{ marginBottom: footer ? 8 : 0 }}>
        {children}
      </div>
      {footer && (
        <footer style={{ fontSize: 12, color: '#6b7280' }}>{footer}</footer>
      )}
    </section>
  );
}
