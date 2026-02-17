import React, { useState, useEffect } from 'react';

interface Order {
  id: string;
  customer: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Fetch orders
    // fetch('/api/orders')
    //   .then(res => res.json())
    //   .then(setOrders);
  }, []);

  const updateStatus = (id: string, newStatus: Order['status']) => {
    // fetch(`/api/orders/${id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status: newStatus })
    // }).then(() => {
    //   setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    // });
  };

  const filteredOrders = orders.filter(o =>
    o.customer.toLowerCase().includes(filter.toLowerCase()) ||
    o.id.includes(filter)
  );

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      <input
        type="text"
        placeholder="Search by order ID or customer"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>${order.total}</td>
              <td>
                <select
                  value={order.status}
                  onChange={e => updateStatus(order.id, e.target.value as Order['status'])}
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => { /* view details */ }}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;