import React from 'react';

const notifStyles = `
  .notif-drawer-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(8px);
    z-index: 9999; opacity: 0; pointer-events: none; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .notif-drawer-overlay.open { opacity: 1; pointer-events: auto; }

  .notif-drawer {
    position: fixed; top: 0; bottom: 0; right: -480px;
    width: 480px; max-width: 100vw; background: var(--bg-base);
    border-left: 1px solid var(--border-medium); z-index: 10000;
    transition: right 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    display: flex; flex-direction: column;
    box-shadow: -20px 0 50px rgba(0,0,0,0.1);
  }
  .notif-drawer.open { right: 0; }

  .notif-header {
    padding: 32px; border-bottom: 1px solid var(--border-subtle);
    display: flex; align-items: center; justify-content: space-between;
    background: var(--bg-level1);
  }
  .notif-title { font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 28px; color: var(--text-primary); letter-spacing: -0.01em; }
  .notif-close-btn { 
    width: 40px; height: 40px; border-radius: 50%;
    background: var(--bg-level2); border: 1px solid var(--border-subtle); 
    color: var(--text-secondary); font-size: 18px; cursor: pointer; 
    transition: all 0.3s ease; display: flex; align-items: center; justify-content: center;
  }
  .notif-close-btn:hover { background: var(--accent-orange-glow); color: var(--accent-orange); border-color: var(--accent-orange); transform: rotate(90deg); }

  .notif-items { flex: 1; overflow-y: auto; padding: 0; display: flex; flex-direction: column; background: var(--bg-base); }
  .notif-item { 
    padding: 24px 32px; border-bottom: 1px solid var(--border-subtle); 
    display: flex; gap: 20px; transition: all 0.3s ease;
    cursor: default;
  }
  .notif-item:hover { background: var(--bg-level1); }
  
  /* Status Indicators */
  .notif-item.completed { border-left: 4px solid var(--accent-green); }
  .notif-item.ready_for_pickup { border-left: 4px solid #4a90e2; }
  .notif-item.pending { border-left: 4px solid var(--accent-orange); }
  .notif-item.rejected { border-left: 4px solid #ff5050; }
  
  .notif-icon-box {
    width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center;
    font-size: 24px; flex-shrink: 0; background: var(--bg-level2); border: 1px solid var(--border-subtle);
  }
  .notif-item.completed .notif-icon-box { background: var(--accent-green-glow); color: var(--accent-green); border-color: var(--accent-green-glow); }
  .notif-item.ready_for_pickup .notif-icon-box { background: rgba(74,144,226,0.1); color: #4a90e2; border-color: rgba(74,144,226,0.1); }
  .notif-item.pending .notif-icon-box { background: var(--accent-orange-glow); color: var(--accent-orange); border-color: var(--accent-orange-glow); }
  .notif-item.rejected .notif-icon-box { background: rgba(255,80,80,0.1); color: #ff5050; border-color: rgba(255,80,80,0.1); }

  .notif-content { flex: 1; display: flex; flex-direction: column; gap: 6px; }
  .notif-subj { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.01em; }
  .notif-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.6; font-weight: 600; }
  .notif-time { font-family: 'Inter', sans-serif; font-size: 11px; color: var(--text-muted); margin-top: 8px; font-weight: 700; }
  
  .notif-product-list {
    margin-top: 12px; background: var(--bg-level2); border: 1px solid var(--border-subtle);
    border-radius: 12px; padding: 14px; font-size: 13px; color: var(--text-secondary);
    display: flex; flex-direction: column; gap: 8px;
    font-weight: 600;
  }
  .notif-product-row { display: flex; justify-content: space-between; align-items: center; }

  .notif-empty { padding: 80px 40px; text-align: center; color: var(--text-muted); font-family: 'Poppins', sans-serif; display: flex; flex-direction: column; align-items: center; gap: 16px; font-weight: 700; }
  .empty-icon { font-size: 64px; margin-bottom: 8px; opacity: 0.5; }
`;

export default function NotificationsDrawer({ isOpen, onClose, orders }) {

    const getNotificationDetails = (order) => {
        const orderIdShort = order.id.split('-')[0];
        switch (order.status) {
            case 'completed':
                return {
                    icon: '✅',
                    subject: 'Order Completed',
                    desc: `Thank you for your purchase! Your order #${orderIdShort} has been picked up.`
                };
            case 'ready_for_pickup':
                return {
                    icon: '📦',
                    subject: 'Order Ready for Pickup',
                    desc: `Great news! Your order #${orderIdShort} is confirmed and ready for pickup at our facility.`
                };
            case 'rejected':
                return {
                    icon: '❌',
                    subject: 'Order Cancelled',
                    desc: `Your order #${orderIdShort} was cancelled.`
                };
            case 'pending':
            default:
                return {
                    icon: '⏳',
                    subject: 'Order Placed Successfully',
                    desc: `We've received your order #${orderIdShort} and are reviewing it.`
                };
        }
    };

    return (
        <>
            <style>{notifStyles}</style>
            <div className={`notif-drawer-overlay ${isOpen ? "open" : ""}`} onClick={onClose} />

            <div className={`notif-drawer ${isOpen ? "open" : ""}`}>
                <div className="notif-header">
                    <div className="notif-title">Notifications</div>
                    <button className="notif-close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="notif-items">
                    {orders.length === 0 ? (
                        <div className="notif-empty">
                            <span className="empty-icon">📭</span>
                            <span>No notifications yet.</span>
                        </div>
                    ) : (
                        orders.map(order => {
                            const details = getNotificationDetails(order);
                            return (
                                <div key={order.id} className={`notif-item ${order.status}`}>
                                    <div className="notif-icon-box">{details.icon}</div>
                                    <div className="notif-content">
                                        <div className="notif-subj">{details.subject}</div>
                                        <div className="notif-desc">{details.desc}</div>

                                        {order.order_items && order.order_items.length > 0 && (
                                            <div className="notif-product-list">
                                                <div style={{ fontWeight: "800", color: "var(--text-primary)", marginBottom: "4px" }}>Items:</div>
                                                {order.order_items.map((it, idx) => (
                                                    <div key={idx} className="notif-product-row">
                                                        <span>{it.products?.icon || "📦"} {it.products?.name}</span>
                                                        <span style={{ fontFamily: "'Inter', sans-serif", color: "var(--accent-orange)" }}>x{it.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="notif-time">{new Date(order.created_at).toLocaleString()}</div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}
