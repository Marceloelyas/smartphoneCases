import React from 'react';
// import AnalyticsCharts from './AnalyticsCharts'; // descomente se quiser incluir os gráficos

const Dashboard: React.FC = () => {
  // Dados fictícios para exemplo - substitua por chamadas à API
  const metrics = {
    totalOrders: 1250,
    totalRevenue: 45890.75,
    totalUsers: 890,
    pendingOrders: 34,
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <h3>Total de Pedidos</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.totalOrders}</p>
        </div>
        <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <h3>Receita Total</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>R$ {metrics.totalRevenue.toFixed(2)}</p>
        </div>
        <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <h3>Usuários</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.totalUsers}</p>
        </div>
        <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <h3>Pedidos Pendentes</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.pendingOrders}</p>
        </div>
      </div>

      {/* Área para gráficos - descomente quando o AnalyticsCharts estiver pronto */}
      {/* <div style={{ marginTop: '2rem' }}>
        <AnalyticsCharts />
      </div> */}
    </div>
  );
};

export default Dashboard;