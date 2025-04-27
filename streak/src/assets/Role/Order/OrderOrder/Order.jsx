import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';
import styles from './order.module.css'; // ha van saját CSS-ed

export default function Order({ orders = [] }) {
  if (!orders.length) {
    return <Typography variant="body1">Nincsenek elérhető rendelések.</Typography>;
  }

  return (
    <div className={styles.orderList}>
      {orders.map((order) => (
        <Card key={order.id} className={styles.orderCard}>
          <CardContent>
            <Typography variant="h6">Rendelés #{order.id}</Typography>
            <Typography variant="body2">Címzett: {order.recipientName}</Typography>
            <Typography variant="body2">Állapot: {order.status}</Typography>
            {/* További adatok, ha vannak */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

Order.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      recipientName: PropTypes.string,
      status: PropTypes.string,
    })
  ),
};
