import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { supabase, COURSE_UNITS } from "../supabaseClient";
import { sendNotificationEmail } from "../utils/sendEmail";

const styles = `
  .admin-page {
    min-height: calc(100vh - 75px);
    background: var(--bg-base);
    color: var(--text-primary);
    font-family: 'Poppins', sans-serif;
    display: flex;
    transition: background 0.3s ease;
  }

  /* SIDEBAR */
  .admin-sidebar {
    width: 300px;
    background: var(--bg-level1);
    border-right: 1px solid var(--border-subtle);
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 10px 0 30px rgba(0,0,0,0.02);
  }
  .admin-nav-item {
    padding: 16px 20px;
    border-radius: 16px;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 16px;
    color: var(--text-secondary);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid transparent;
  }
  .admin-nav-item:hover {
    background: var(--bg-level2);
    color: var(--text-primary);
    transform: translateX(5px);
  }
  .admin-nav-item.active {
    background: var(--accent-orange-glow);
    border-color: var(--accent-orange-glow);
    color: var(--accent-orange);
    box-shadow: 0 10px 20px rgba(255,165,0,0.05);
  }
  .admin-nav-icon {
    font-size: 20px;
  }

  /* MAIN CONTENT */
  .admin-content {
    flex: 1;
    padding: 60px 48px;
    overflow-y: auto;
  }
  
  .admin-header {
    margin-bottom: 56px;
  }
  .admin-title {
    font-family: 'Poppins', sans-serif;
    font-size: 56px;
    color: var(--text-primary);
    letter-spacing: 0.02em;
    line-height: 1;
  }
  .admin-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--accent-green);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 700;
    margin-bottom: 8px;
  }

  /* STATS GRID */
  .admin-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 32px;
    margin-bottom: 64px;
  }
  .admin-stat-card {
    background: var(--bg-level1);
    border: 1px solid var(--border-subtle);
    border-radius: 24px;
    padding: 32px;
    box-shadow: var(--shadow-soft);
    transition: all 0.4s ease;
  }
  .admin-stat-card:hover {
    transform: translateY(-8px);
    border-color: var(--accent-green);
    box-shadow: 0 30px 60px rgba(0,0,0,0.1);
  }
  .stat-card-title {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--text-muted);
    text-transform: uppercase;
    margin-bottom: 16px;
    letter-spacing: 0.1em;
    font-weight: 700;
  }
  .stat-card-value {
    font-family: 'Poppins', sans-serif;
    font-size: 48px;
    color: var(--accent-green);
    line-height: 1;
  }

  /* DATA TABLE */
  .admin-table-wrapper {
    background: var(--bg-level1);
    border: 1px solid var(--border-subtle);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: var(--shadow-soft);
  }
  .admin-table {
    width: 100%;
    border-collapse: collapse;
  }
  .admin-table th, .admin-table td {
    padding: 20px 24px;
    text-align: left;
    border-bottom: 1px solid var(--border-subtle);
  }
  .admin-table th {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--text-muted);
    text-transform: uppercase;
    background: var(--bg-level2);
    letter-spacing: 0.1em;
    font-weight: 700;
  }
  .admin-table td {
    font-size: 15px;
    color: var(--text-primary);
  }
  .admin-table tr:hover td {
    background: var(--bg-level2-half);
  }
  
  .badge {
    padding: 6px 12px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.05em;
  }
  .badge.active { background: var(--accent-green-glow); color: var(--accent-green); border: 1px solid var(--accent-green-glow); }
  .badge.pending { background: var(--accent-orange-glow); color: var(--accent-orange); border: 1px solid var(--accent-orange-glow); }
  .badge.completed { background: rgba(74,144,226,0.15); color: #4a90e2; border: 1px solid rgba(74,144,226,0.2); }
  .badge.rejected { background: rgba(255,80,80,0.15); color: #ff5050; border: 1px solid rgba(255,80,80,0.2); }
  .badge.admin { background: rgba(155,89,182,0.15); color: #9b59b6; border: 1px solid rgba(155,89,182,0.2); }
  
  .action-btn {
    background: none;
    border: none;
    color: var(--accent-blue);
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 700;
    transition: all 0.3s ease;
    padding: 6px 12px;
    border-radius: 8px;
  }
  .action-btn:hover { background: var(--bg-level2); color: var(--accent-blue-hover); transform: scale(1.05); }

  @media (max-width: 1200px) {
    .admin-page { flex-direction: column; }
    .admin-sidebar { width: 100%; border-right: none; border-bottom: 1px solid var(--border-subtle); flex-direction: row; overflow-x: auto; padding: 20px; }
    .admin-nav-item { white-space: nowrap; padding: 12px 16px; }
    .admin-content { padding: 40px 24px; }
  }

  /* PREMIUM NOTIFICATION ARTIFACT */
  .admin-notification {
    position: fixed;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10001;
    padding: 18px 32px;
    border-radius: 20px;
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 14px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.3);
    animation: toastSlideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    background: var(--bg-level1);
    border: 1px solid var(--border-medium);
    pointer-events: auto;
  }
  .admin-notification.success {
    color: var(--accent-green);
    border-color: var(--accent-green-glow);
  }
  .admin-notification.error {
    color: #ff5050;
    border-color: rgba(255, 80, 80, 0.2);
  }
  @keyframes toastSlideIn {
    from { transform: translate(-50%, -100px); opacity: 0; }
    to { transform: translate(-50%, 0); opacity: 1; }
  }
  .notif-icon { font-size: 20px; }

  .admin-confirm-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; z-index: 99999;
  }
  .admin-confirm-modal {
    background: var(--bg-level1); border: 1px solid var(--border-medium);
    padding: 32px; border-radius: 24px; box-shadow: 0 40px 80px rgba(0,0,0,0.5);
    max-width: 400px; width: 90%; text-align: center;
    animation: toastSlideIn 0.3s ease;
  }
  .admin-confirm-icon { font-size: 48px; margin-bottom: 16px; }
  .admin-confirm-title { font-size: 24px; font-weight: 800; color: var(--text-primary); margin-bottom: 12px; }
  .admin-confirm-text { font-size: 14px; color: var(--text-secondary); margin-bottom: 32px; line-height: 1.5; }
  .admin-confirm-actions { display: flex; gap: 12px; }
  .admin-confirm-actions button {
    flex: 1; padding: 14px; border-radius: 12px; font-size: 14px; font-weight: 700; font-family: 'Poppins', sans-serif;
    cursor: pointer; transition: all 0.25s; border: none;
  }
  .btn-cancel { background: var(--bg-level2); color: var(--text-primary); }
  .btn-cancel:hover { background: var(--border-medium); }
  .btn-confirm { background: #ff5050; color: #fff; }
  .btn-confirm:hover { background: #ff3333; transform: translateY(-2px); box-shadow: 0 8px 16px rgba(255,80,80,0.3); }
`;

const TABS = [
  { id: 'overview', label: 'System Overview', icon: '📊' },
  { id: 'users', label: 'User Management', icon: '👥' },
  { id: 'ims', label: 'Internship (IMS)', icon: '📝' },
  { id: 'academy', label: 'Academy Programs', icon: '🎓' },
  { id: 'shop', label: 'Shop Orders', icon: '📦' },
  { id: 'messages', label: 'Contact Messages', icon: '💬' },
  { id: 'talented', label: 'Talent Pool', icon: '🌟' },
  { id: 'videos', label: 'Site Videos', icon: '🎥' }
];

export default function AdminDashboard() {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const [users, setUsers] = useState([]);
  const [imsApps, setImsApps] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [academyEnrolls, setAcademyEnrolls] = useState([]);
  const [onlineVideos, setOnlineVideos] = useState([]);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [talentedPool, setTalentedPool] = useState([]);
  const [siteVideos, setSiteVideos] = useState([]);
  const [dismissedIds, setDismissedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('admin_dismissed_ids') || '[]');
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);
  const [msgFilter, setMsgFilter] = useState('all');
  const [shopFilter, setShopFilter] = useState('pending');
  const [imsFilter, setImsFilter] = useState('interns');
  const [academyMode, setAcademyMode] = useState('enrollments'); // 'enrollments' | 'manage'
  const [shopMode, setShopMode] = useState('orders'); // 'orders' | 'inventory'
  const [shopOrders, setShopOrders] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [notif, setNotif] = useState(null); // { msg, type }
  const [confirmObj, setConfirmObj] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [checkedUnits, setCheckedUnits] = useState([]);
  const [strengthUnits, setStrengthUnits] = useState([]);

  const toggleUnit = (unit) => {
    setCheckedUnits(prev => prev.includes(unit) ? prev.filter(u => u !== unit) : [...prev, unit]);
    if (checkedUnits.includes(unit) && strengthUnits.includes(unit)) {
       setStrengthUnits(prev => prev.filter(u => u !== unit));
    }
  };

  const toggleStrength = (unit) => {
    setStrengthUnits(prev => prev.includes(unit) ? prev.filter(u => u !== unit) : [...prev, unit]);
  };

  const showNotif = (msg, type = 'success') => {
    setNotif({ msg, type });
    setTimeout(() => setNotif(null), 4000);
  };

  useEffect(() => {
    fetchData();

    // Listen to new orders in realtime
    const orderSub = supabase
      .channel('admin-orders-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, () => {
        showNotif('🔔 New order received! Please review for approval.', 'success');
        fetchData();
      })
      .subscribe();

    // Listen to new contact messages in realtime
    const msgSub = supabase
      .channel('admin-messages-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'contact_messages' }, (payload) => {
        const name = payload.new?.name || 'Someone';
        showNotif(`💬 New message from ${name}!`, 'success');
        fetchData();
      })
      .subscribe();

    // Listen to new users in realtime
    const userSub = supabase
      .channel('admin-users-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'users' }, (payload) => {
        const name = payload.new?.full_name || 'A new user';
        showNotif(`👤 ${name} just signed up!`, 'success');
        fetchData();
      })
      .subscribe();

    // Listen to new internships in realtime
    const internSub = supabase
      .channel('admin-interns-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'internships' }, () => {
        showNotif(`📝 New internship application received!`, 'success');
        fetchData();
      })
      .subscribe();

    // Listen to new academy enrollments in realtime
    const academySub = supabase
      .channel('admin-academy-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'academy_enrollments' }, () => {
        showNotif(`🎓 New academy enrollment received!`, 'success');
        fetchData();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(orderSub);
      supabase.removeChannel(msgSub);
      supabase.removeChannel(userSub);
      supabase.removeChannel(internSub);
      supabase.removeChannel(academySub);
    };
  }, [fetchData]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [usersRes, imsRes, companiesRes, academyRes, onlineRes, shopRes, msgRes, productsRes, talentedRes, siteVideosRes] = await Promise.all([
      supabase.from('users').select('*').order('created_at', { ascending: false }),
      supabase.from('internships').select('*, users!internships_student_id_fkey(full_name, email, phone), companies(name)').order('created_at', { ascending: false }),
      supabase.from('companies').select('*').order('created_at', { ascending: false }),
      supabase.from('academy_enrollments').select('*, users(full_name, email, phone)').order('created_at', { ascending: false }),
      supabase.from('academy_videos').select('*').order('created_at', { ascending: false }),
      supabase.from('orders').select('*, users(full_name, email, phone), order_items(quantity, products(name))').neq('status', 'Deleted').order('created_at', { ascending: false }),
      supabase.from('contact_messages').select('*').neq('status', 'Deleted').order('created_at', { ascending: false }),
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('talented').select('*').neq('status', 'Deleted').order('created_at', { ascending: false }),
      supabase.from('site_videos').select('*').order('created_at', { ascending: false })
    ]);

    if (usersRes.data) setUsers(usersRes.data);
    if (imsRes.data) setImsApps(imsRes.data);
    if (companiesRes.data) setCompanies(companiesRes.data);
    if (academyRes.data) setAcademyEnrolls(academyRes.data);
    if (onlineRes.data) setOnlineVideos(onlineRes.data);
    if (shopRes.data) setShopOrders(shopRes.data.filter(o => !dismissedIds.includes(o.id)));
    if (msgRes.data) setMessages(msgRes.data.filter(m => !dismissedIds.includes(m.id)));
    if (productsRes.data) setProducts(productsRes.data);
    if (talentedRes.data) setTalentedPool(talentedRes.data);
    if (siteVideosRes.data) setSiteVideos(siteVideosRes.data);
    setLoading(false);
  }, [dismissedIds]);

  const dismissItemLocally = (id) => {
    const updated = [...dismissedIds, id];
    setDismissedIds(updated);
    localStorage.setItem('admin_dismissed_ids', JSON.stringify(updated));
  };

  const deleteProduct = async (id) => {
    setConfirmObj({
      msg: "Are you sure you want to permanently delete this product? This will also affect existing orders referencing it.",
      onConfirm: async () => {
        setConfirmObj(null);
        const { error } = await supabase.from('products').delete().eq('id', id);
        if(!error) {
          showNotif("Product successfully deleted.", "success");
          fetchData();
        } else {
          showNotif(`Failed to delete product: ${error.message}`, "error");
        }
      }
    });
  };

  const deleteOrder = async (id) => {
    setConfirmObj({
      msg: "Are you sure you want to permanently delete this order record? This cannot be undone.",
      onConfirm: async () => {
        setConfirmObj(null);
        // Step 1: Try Hard Delete
        const { data: deletedRows, error } = await supabase.from('orders').delete().eq('id', id).select();
        
        if (!error && deletedRows && deletedRows.length > 0) {
          showNotif("Order record successfully deleted.", "success");
          fetchData();
        } else {
          // Step 2: Fallback to Soft Delete (hide from UI)
          const { data: updated, error: softError } = await supabase.from('orders').update({ status: 'Deleted' }).eq('id', id).select();
          if(!softError && updated && updated.length > 0) {
            showNotif("Order record removed from view.", "success");
            fetchData();
          } else {
            console.warn("Database refused deletion, using local dismissal.");
            dismissItemLocally(id);
            setShopOrders(prev => prev.filter(o => o.id !== id));
            showNotif("Order record hidden from view.", "success");
          }
        }
      }
    });
  };


  const updateMessageStatus = async (id, status) => {
    const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id);
    if (!error) {
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
      if (selectedMessage?.id === id) setSelectedMessage(prev => ({ ...prev, status }));
    } else {
      showNotif('Failed to update message status.', 'error');
    }
  };

  const deleteMessage = (id) => {
    setConfirmObj({
      msg: 'Are you sure you want to permanently delete this message?',
      onConfirm: async () => {
        setConfirmObj(null);
        const { data: deletedRows, error } = await supabase.from('contact_messages').delete().eq('id', id).select();
        
        if (!error && deletedRows && deletedRows.length > 0) {
          setMessages(prev => prev.filter(m => m.id !== id));
          if (selectedMessage?.id === id) setSelectedMessage(null);
          showNotif('Message permanently deleted.', 'success');
        } else {
          // Fallback to soft delete
          const { data: updated, error: softError } = await supabase.from('contact_messages').update({ status: 'Deleted' }).eq('id', id).select();
          if (!softError && updated && updated.length > 0) {
            setMessages(prev => prev.filter(m => m.id !== id));
            if (selectedMessage?.id === id) setSelectedMessage(null);
            showNotif('Message removed from view.', 'success');
          } else {
            console.warn("Database refused message deletion, using local dismissal.");
            dismissItemLocally(id);
            setMessages(prev => prev.filter(m => m.id !== id));
            if (selectedMessage?.id === id) setSelectedMessage(null);
            showNotif('Message hidden from view.', 'success');
          }
        }
      }
    });
  };

  const finishUpdateOrder = async (orderId, targetStatus, txnId = null) => {
    const updateData = { status: targetStatus };
    if (txnId) updateData.transaction_id = txnId;

    const { data: updatedRows, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select();

    if (error) {
      console.error("Orders Update Error:", error);
      showNotif(`Failed to update order: ${error.message || 'Unknown error'}`, "error");
      return;
    }

    // If no rows returned, RLS policy silently blocked the update
    if (!updatedRows || updatedRows.length === 0) {
      console.error("Orders Update — no rows affected. Possible RLS policy block.", { orderId, targetStatus });
      showNotif("Update failed: Permission denied by database policy. Please check your Supabase RLS settings for the orders table.", "error");
      return;
    }

    if (targetStatus === 'ready_for_pickup') showNotif("Order Confirmed! ✅", "success");
    else if (targetStatus === 'completed') showNotif("Order Marked as Picked Up! ✅", "success");
    else if (targetStatus === 'rejected') showNotif("Order Cancelled! ❌", "success");
    else if (targetStatus === 'cancelled') showNotif("Order Cancelled! ❌", "success");
    fetchData();
  };

  const updateOrderStatus = (orderId, targetStatus) => {
    if (targetStatus === 'ready_for_pickup') {
      const tid = prompt("Please enter the Mobile Money Transaction ID to confirm this order:");
      if (!tid) {
        showNotif("Transaction ID is required to confirm order.", "error");
        return;
      }
      finishUpdateOrder(orderId, targetStatus, tid);
      return;
    }

    // Confirm before rejecting/cancelling an order
    if (targetStatus === 'rejected' || targetStatus === 'cancelled') {
      setConfirmObj({
        msg: "Are you sure you want to cancel this order? This cannot be undone.",
        onConfirm: () => {
          setConfirmObj(null);
          finishUpdateOrder(orderId, targetStatus);
        }
      });
      return;
    }

    finishUpdateOrder(orderId, targetStatus);
  };

  const updateImsStatus = async (table, id, targetStatus, userEmail, userName, appName) => {
    const { error } = await supabase.from(table).update({ status: targetStatus }).eq('id', id);
    if (!error) {
      showNotif(`${table.replace('_', ' ')} successfully marked as ${targetStatus}`, "success");
      fetchData();
      
      if (userEmail && (targetStatus === 'Approved' || targetStatus === 'Rejected')) {
        console.log(`Attempting to send ${targetStatus} email to:`, userEmail);
        sendNotificationEmail(userEmail, userName, appName, targetStatus)
          .then(res => console.log('Email sent result:', res))
          .catch(err => console.error('Email module call error:', err));
      }
    } else {
      console.error("IMS Update Error:", error);
      showNotif(`Failed to update ${table}: ${error.message || 'Unknown error'}`, "error");
    }
  };

  const deleteImsRecord = (table, id) => {
    setConfirmObj({
      msg: "Are you sure you want to permanently delete this record?",
      onConfirm: async () => {
        setConfirmObj(null);
        const { data: deletedRows, error } = await supabase.from(table).delete().eq('id', id).select();
        
        if (error) {
          console.error(`Delete Error for ${table}:`, error);
          showNotif(`Failed to delete from ${table}: ${error.message || 'Unknown error'}`, "error");
        } else if (!deletedRows || deletedRows.length === 0) {
          // RLS policy blocked hard delete. Fallback to soft delete
          console.log("Hard delete blocked by RLS. Performing soft-delete.");
          const { error: softError } = await supabase.from(table).update({ status: 'Deleted' }).eq('id', id);
          if (!softError) {
            showNotif(`Record soft-deleted successfully`, "success");
            fetchData();
          } else {
            showNotif(`Could not delete due to Database Security Policies.`, "error");
          }
        } else {
          showNotif(`${table.replace('_', ' ')} deleted successfully`, "success");
          fetchData();
        }
      }
    });
  };

  const deleteUser = (userId) => {
    if (currentUser && userId === currentUser.id) {
      showNotif("You cannot delete your own admin account.", "error");
      return;
    }

    setConfirmObj({
      msg: "Are you sure you want to delete this user completely?",
      onConfirm: async () => {
        setConfirmObj(null);
        const { data: deletedRows, error } = await supabase.from('users').delete().eq('id', userId).select();
        
        if (error || !deletedRows || deletedRows.length === 0) {
          console.log("Hard delete failed or blocked. Performing soft-delete.", error);
          const { error: softError } = await supabase.from('users').update({ status: 'Deleted' }).eq('id', userId);
          if (!softError) {
            showNotif(`User deactivated and concealed successfully.`, "success");
            fetchData();
          } else {
            showNotif("Error deleting user: " + (error?.message || softError?.message || "Unknown constraints"), "error");
          }
        } else {
          showNotif("User deleted successfully from the platform.", "success");
          fetchData();
        }
      }
    });
  };

  const getStatusBadgeClass = (status) => {
    if (!status) return 'pending';
    const s = status.toLowerCase();
    if (['active', 'completed', 'shipped', 'admin'].includes(s)) return s;
    if (['rejected', 'deleted'].includes(s)) return 'rejected';
    return 'pending';
  };

  const renderContent = () => {
    if (loading) {
      return <div style={{ color: "rgba(var(--text-rgb), 0.5)", fontFamily: "'Inter', sans-serif" }}>Loading platform data...</div>;
    }

    switch (activeTab) {
      case 'overview':
        return (
          <>


            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "28px", color: "var(--text)", marginBottom: "20px" }}>Recent Registrations</h3>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Signed Up</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.status !== 'Deleted').slice(0, 5).map(u => (
                    <tr key={u.id}>
                      <td style={{ fontWeight: '600' }}>{u.full_name || 'N/A'}</td>
                      <td>{u.email}</td>
                      <td>{new Date(u.created_at).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="action-btn"
                          style={{ color: '#ff5050' }}
                          onClick={() => deleteUser(u.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.filter(u => u.status !== 'Deleted').length === 0 && (
                    <tr><td colSpan="4" style={{ textAlign: "center", color: "rgba(var(--text-rgb), 0.5)" }}>No active users found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        );

      case 'users':
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "28px", color: "var(--text)" }}>All Registered Users</h3>
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.status !== 'Deleted').map(u => (
                    <tr key={u.id}>
                      <td style={{ fontWeight: '600' }}>{u.full_name || 'N/A'}</td>
                      <td style={{ color: 'rgba(var(--text-rgb), 0.6)' }}>{u.email}</td>
                      <td><span className={`badge ${getStatusBadgeClass(u.role)}`}>{u.role}</span></td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(u.status)}`}>{u.status || 'Active'}</span>
                      </td>
                      <td>
                        <button className="action-btn">Edit</button>
                        <button
                          className="action-btn"
                          style={{ color: '#ff5050', marginLeft: '12px' }}
                          onClick={() => deleteUser(u.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.filter(u => u.status !== 'Deleted').length === 0 && (
                    <tr><td colSpan="5" style={{ textAlign: "center", color: "rgba(var(--text-rgb), 0.5)" }}>No active users found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        );

      case 'ims':
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "28px", color: "var(--text)" }}>IMS Control Center</h3>
              <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px' }}>
                {['interns', 'companies'].map(f => (
                  <button
                    key={f} onClick={() => setImsFilter(f)}
                    style={{
                      background: imsFilter === f ? 'rgba(0,200,120,0.15)' : 'transparent', color: imsFilter === f ? '#00c878' : 'rgba(var(--text-rgb), 0.5)',
                      border: 'none', padding: '6px 12px', borderRadius: '4px', fontFamily: "'Poppins', sans-serif", fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {imsFilter === 'interns' && (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr><th>Applicant Name</th><th>Package</th><th>Details</th><th>Company Assignment</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {imsApps.map(app => (
                      <tr key={app.id}>
                        <td style={{ fontWeight: '600' }}>{app.users?.full_name || 'Unknown'}<br /><span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif" }}>{app.users?.email}</span></td>
                        <td>{app.package_name || app.title || 'N/A'}</td>
                        <td style={{ fontSize: '11px', lineHeight: '1.4', color: 'rgba(255,255,255,0.7)' }}>
                          {app.university && <div><b>Uni:</b> {app.university}</div>}
                          {app.registration_number && <div><b>Reg:</b> {app.registration_number}</div>}
                          {app.location && <div><b>Loc:</b> {app.location}</div>}
                          {app.application_url && <div><a href={app.application_url} target="_blank" style={{ color: '#00c878', fontWeight: 'bold' }}>View Letter</a></div>}
                        </td>
                        <td style={{ color: "rgba(255,255,255,0.6)" }}>{app.companies?.name || "Unassigned"}</td>
                        <td><span className={`badge ${getStatusBadgeClass(app.status)}`}>{app.status}</span></td>
                        <td>
                          {app.status === 'Pending' && (
                            <>
                      <button className="action-btn" style={{ color: '#00c878' }} onClick={() => {
                        const fullName = `${app.first_name || ''} ${app.last_name || ''}`.trim() || app.users?.full_name || 'AFR-IQ Applicant';
                        updateImsStatus('internships', app.id, 'Approved', app.email || app.users?.email, fullName, app.package_name || app.title || 'Internship');
                      }}>Approve</button>
                      <button className="action-btn" style={{ color: '#ff5050' }} onClick={() => {
                        const fullName = `${app.first_name || ''} ${app.last_name || ''}`.trim() || app.users?.full_name || 'AFR-IQ Applicant';
                        updateImsStatus('internships', app.id, 'Rejected', app.email || app.users?.email, fullName, app.package_name || app.title || 'Internship');
                      }}>Reject</button>
                            </>
                          )}
                          {app.status === 'Approved' && (
                            <button className="action-btn" style={{ color: '#4a90e2' }} onClick={() => updateImsStatus('internships', app.id, 'Ongoing')}>Start Ongoing</button>
                          )}
                          <button className="action-btn" style={{ color: '#ff5050', opacity: 0.8, marginLeft: '8px' }} onClick={() => deleteImsRecord('internships', app.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {imsApps.length === 0 && (<tr><td colSpan="6" style={{ textAlign: "center", color: "rgba(var(--text-rgb), 0.5)" }}>No intern applications found</td></tr>)}
                  </tbody>
                </table>
              </div>
            )}

            {imsFilter === 'companies' && (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr><th>Company Name</th><th>Location</th><th>Website</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {companies.map(c => (
                      <tr key={c.id}>
                        <td style={{ fontWeight: '600' }}>{c.name}</td>
                        <td>{c.address || 'N/A'}</td>
                        <td>{c.website ? <a href={c.website} target="_blank" style={{ color: "#4a90e2" }}>{c.website}</a> : 'N/A'}</td>
                        <td><span className={`badge ${getStatusBadgeClass(c.status)}`}>{c.status}</span></td>
                        <td>
                          {c.status === 'Pending' && (
                            <>
                              <button className="action-btn" style={{ color: '#00c878' }} onClick={() => updateImsStatus('companies', c.id, 'Approved', c.email || null, c.name, 'Company Registration')}>Approve</button>
                              <button className="action-btn" style={{ color: '#ff5050' }} onClick={() => updateImsStatus('companies', c.id, 'Rejected', c.email || null, c.name, 'Company Registration')}>Reject</button>
                            </>
                          )}
                          <button className="action-btn" style={{ color: '#ff5050', opacity: 0.8, marginLeft: '8px' }} onClick={() => deleteImsRecord('companies', c.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {companies.length === 0 && (<tr><td colSpan="5" style={{ textAlign: "center", color: "rgba(var(--text-rgb), 0.5)" }}>No registered companies found</td></tr>)}
                  </tbody>
                </table>
              </div>
            )}
          </>
        );

      case 'academy':
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "28px", color: "var(--text)" }}>Academy Management</h3>
              <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px' }}>
                {['enrollments', 'manage'].map(m => (
                  <button
                    key={m} onClick={() => setAcademyMode(m)}
                    style={{
                      background: academyMode === m ? 'rgba(74,144,226,0.15)' : 'transparent', color: academyMode === m ? '#4a90e2' : 'rgba(var(--text-rgb), 0.5)',
                      border: 'none', padding: '6px 12px', borderRadius: '4px', fontFamily: "'Poppins', sans-serif", fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {academyMode === 'enrollments' && (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Duration / Price</th>
                      <th>Mode of Study</th>
                      <th>Start Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {academyEnrolls.filter(e => e.status !== 'Deleted').map(enrol => (
                      <tr key={enrol.id}>
                        <td style={{ fontWeight: '600' }}>
                          {enrol.users?.full_name || 'Unknown'}
                          <br />
                          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif" }}>{enrol.users?.email}</span>
                          {enrol.users?.phone && <><br /><span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif" }}>{enrol.users?.phone}</span></>}
                        </td>
                        <td style={{ maxWidth: '200px', whiteSpace: 'normal', lineHeight: '1.4', fontSize: '13px' }}>{enrol.program_name || 'N/A'}</td>
                        <td style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px' }}>
                          —
                        </td>
                        <td>
                          <span style={{
                            background: (enrol.program_name || '').includes('Physical') ? 'rgba(0,200,120,0.12)' : 'rgba(74,144,226,0.12)',
                            color: (enrol.program_name || '').includes('Physical') ? '#00c878' : '#4a90e2',
                            border: `1px solid ${(enrol.program_name || '').includes('Physical') ? 'rgba(0,200,120,0.25)' : 'rgba(74,144,226,0.25)'}`,
                            padding: '3px 10px', borderRadius: '4px',
                            fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 'bold'
                          }}>
                            {(enrol.program_name || '').includes('Physical') ? '🏫 Physical' : '💻 Online'}
                          </span>
                        </td>
                        <td style={{ color: 'rgba(var(--text-rgb), 0.5)', fontFamily: "'Inter', sans-serif", fontSize: '11px' }}>
                          {enrol.created_at ? new Date(enrol.created_at).toLocaleDateString() : '—'}
                        </td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(enrol.status)}`}>{enrol.status}</span>
                        </td>
                        <td>
                          {enrol.status === 'Pending' && (
                            <>
                              <button className="action-btn" style={{ color: '#00c878' }} onClick={() => updateImsStatus('academy_enrollments', enrol.id, 'Approved', enrol.users?.email, enrol.users?.full_name, enrol.program_name || 'Academy Program')}>Approve</button>
                              <button className="action-btn" style={{ color: '#ff5050' }} onClick={() => updateImsStatus('academy_enrollments', enrol.id, 'Rejected', enrol.users?.email, enrol.users?.full_name, enrol.program_name || 'Academy Program')}>Reject</button>
                            </>
                          )}
                          {enrol.status === 'Approved' && (
                            <button className="action-btn" style={{ color: '#4a90e2' }} onClick={() => updateImsStatus('academy_enrollments', enrol.id, 'Completed')}>Mark Complete</button>
                          )}
                          <button className="action-btn" style={{ color: '#ff5050', opacity: 0.8 }} onClick={() => deleteImsRecord('academy_enrollments', enrol.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {academyEnrolls.length === 0 && (
                      <tr><td colSpan="7" style={{ textAlign: "center", color: "rgba(var(--text-rgb), 0.5)", padding: "40px" }}>No enrollments yet — they'll appear here once students enroll.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {academyMode === 'manage' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* ADD VIDEO FORM */}
                <div style={{ background: 'var(--bg-level1)', border: '1px solid var(--border-subtle)', borderRadius: '24px', padding: '32px' }}>
                  <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '20px', marginBottom: '20px', color: 'var(--text-primary)' }}>Add Online Course Video</h4>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const fd = new FormData(e.target);
                    const payload = {
                      title: fd.get('title'),
                      category: fd.get('category'),
                      video_url: fd.get('video_url'),
                      price: fd.get('price') || 'Free',
                      description: fd.get('description'),
                      duration: fd.get('duration') || '1 Hour',
                      lessons: fd.get('lessons') || '1 Lesson',
                      instructor: 'AFR-IQ Academy',
                      rating: 5.0,
                      reviews: 0,
                      level: 'beg',
                      levelLabel: 'Beginner',
                      enrolled: '0'
                    };
                    const { error } = await supabase.from('academy_videos').insert([payload]);
                    if (!error) {
                      showNotif('Online course video added successfully!', 'success');
                      e.target.reset();
                      fetchData();
                    } else {
                      showNotif('Error: ' + error.message, 'error');
                    }
                  }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group"><label className="form-label">Course Title</label><input className="form-input" name="title" required placeholder="e.g. Master React in 2 Hours" /></div>
                    <div className="form-group"><label className="form-label">Category</label><input className="form-input" name="category" required placeholder="e.g. Web Development" /></div>
                    <div className="form-group"><label className="form-label">Video URL (YouTube/Vimeo)</label><input className="form-input" name="video_url" required placeholder="https://youtube.com/..." /></div>
                    <div className="form-group"><label className="form-label">Price (e.g. UGX 50,000 or Free)</label><input className="form-input" name="price" placeholder="UGX 50,000" /></div>
                    <div className="form-group"><label className="form-label">Duration</label><input className="form-input" name="duration" placeholder="e.g. 2.5 Hours" /></div>
                    <div className="form-group"><label className="form-label">Total Lessons</label><input className="form-input" name="lessons" placeholder="e.g. 12 Lessons" /></div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}><label className="form-label">Short Description</label><textarea className="form-textarea" name="description" placeholder="What will they learn?" /></div>
                    <button type="submit" className="btn-submit" style={{ gridColumn: '1 / -1' }}>Upload Online Course</button>
                  </form>
                </div>

                {/* VIDEO LIST */}
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr><th>Video Title</th><th>Category</th><th>Price</th><th>URL</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {onlineVideos.map(v => (
                        <tr key={v.id}>
                          <td style={{ fontWeight: 700 }}>{v.title}</td>
                          <td>{v.category}</td>
                          <td style={{ color: '#00c878' }}>{v.price}</td>
                          <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <a href={v.video_url} target="_blank" style={{ color: 'var(--accent-orange)' }}>{v.video_url}</a>
                          </td>
                          <td>
                            <button className="action-btn" style={{ color: '#ff5050' }} onClick={() => {
                              setConfirmObj({
                                msg: 'Are you sure you want to delete this video?',
                                onConfirm: async () => {
                                  setConfirmObj(null);
                                  await supabase.from('academy_videos').delete().eq('id', v.id);
                                  fetchData();
                                  showNotif('Video removed.');
                                }
                              });
                            }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                      {onlineVideos.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '40px' }}>No online videos added yet.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </>
        );

      case 'shop': {
        const filteredOrders = shopOrders.filter(o => {
          if (o.status === 'Deleted') return false; // Never show deleted orders
          if (shopFilter === 'pending') return o.status === 'pending';
          if (shopFilter === 'ready') return o.status === 'ready_for_pickup';
          if (shopFilter === 'completed') return o.status === 'completed';
          if (shopFilter === 'cancelled') return o.status === 'rejected';
          return true;
        });
          return (
            <>
              <div style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
              <button
                onClick={() => setShopMode('orders')}
                style={{
                  background: shopMode === 'orders' ? 'var(--accent-orange)' : 'var(--bg-level2)',
                  color: shopMode === 'orders' ? '#fff' : 'var(--text-muted)',
                  border: 'none', padding: '10px 24px', borderRadius: '10px',
                  fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s'
                }}
              >
                Orders Management
              </button>
              <button
                onClick={() => setShopMode('inventory')}
                style={{
                  background: shopMode === 'inventory' ? 'var(--accent-orange)' : 'var(--bg-level2)',
                  color: shopMode === 'inventory' ? '#fff' : 'var(--text-muted)',
                  border: 'none', padding: '10px 24px', borderRadius: '10px',
                  fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s'
                }}
              >
                Catalog / Inventory
              </button>
            </div>

            {shopMode === 'orders' ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "28px", color: "var(--text)" }}>Shop Orders</h3>
                  <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px' }}>
                    {['pending', 'ready', 'completed', 'cancelled'].map(f => (
                      <button
                        key={f}
                        onClick={() => setShopFilter(f)}
                        style={{
                          background: shopFilter === f ? 'rgba(255,165,0,0.15)' : 'transparent',
                          color: shopFilter === f ? '#ffa500' : 'rgba(var(--text-rgb), 0.5)',
                          border: 'none', padding: '6px 12px', borderRadius: '4px',
                          fontFamily: "'Poppins', sans-serif", fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        {f.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Customer Info</th>
                        <th>Item</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => {
                          const itemsDesc = order.order_items
                            ? order.order_items.map(oi => `${oi.quantity}x ${oi.products?.name || 'Item'}`).join(', ')
                            : 'N/A';
                          const customerName = order.customer_name || order.users?.full_name || 'Guest User';
                          const customerPhone = order.customer_phone || order.users?.phone || 'No Phone';
                        return (
                          <tr key={order.id}>
                            <td style={{ fontWeight: '600' }}>
                              <div style={{ color: 'var(--accent-orange)', fontSize: '10px', marginBottom: '4px' }}>ORDER #{order.id.split('-')[0].toUpperCase()}</div>
                              {customerName}<br />
                              <span style={{ fontSize: '11px', color: 'rgba(var(--text-rgb), 0.5)', fontFamily: "'Inter', sans-serif" }}>{customerPhone}</span>
                            </td>
                            <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={itemsDesc}>
                              {itemsDesc}
                            </td>
                            <td style={{ color: '#00c878', fontWeight: 'bold' }}>
                              UGX {Number(order.total_price).toLocaleString()}
                            </td>
                            <td>
                              <span className={`badge ${getStatusBadgeClass(order.status)}`}>{order.status}</span>
                              {order.transaction_id && (
                                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'monospace' }}>Txn: {order.transaction_id}</div>
                              )}
                            </td>
                            <td style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              {order.status === 'pending' && (
                                <>
                                  <button className="action-btn" onClick={() => updateOrderStatus(order.id, 'ready_for_pickup')}>Confirm</button>
                                  <button className="action-btn" style={{ color: '#ff5050' }} onClick={() => updateOrderStatus(order.id, 'rejected')}>Cancel</button>
                                </>
                              )}
                              {order.status === 'ready_for_pickup' && (
                                <button className="action-btn" style={{ color: '#00c878' }} onClick={() => updateOrderStatus(order.id, 'completed')}>Mark Picked Up</button>
                              )}
                              <button
                                className="action-btn"
                                style={{ color: '#ff5050', opacity: 0.6 }}
                                onClick={() => deleteOrder(order.id)}
                                title="Permanently Delete Order"
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredOrders.length === 0 && (
                        <tr><td colSpan="5" style={{ textAlign: "center", color: "rgba(var(--text-rgb), 0.5)" }}>No {shopFilter} orders found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              // Inventory Management UI
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "28px", color: "var(--text)" }}>Product Catalog</h3>
                </div>
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product Info</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id}>
                          <td style={{ fontWeight: '600' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ width: '40px', height: '40px', background: 'var(--bg-level2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                {p.image_url ? <img src={p.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📦'}
                              </div>
                              <div>
                                {p.name}
                                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{p.id.split('-')[0].toUpperCase()}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.05em' }}>{p.category}</td>
                          <td style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>UGX {Number(p.price * (p.price < 10000 ? 3900 : 1)).toLocaleString()}</td>
                          <td>
                            <span style={{ color: p.stock > 0 ? 'inherit' : '#ff5050', fontWeight: '700' }}>
                              {p.stock} units
                            </span>
                          </td>
                          <td>
                            <button className="action-btn" style={{ color: '#ff5050' }} onClick={() => deleteProduct(p.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                      {products.length === 0 && (
                        <tr><td colSpan="5" style={{ textAlign: "center", color: "rgba(var(--text-rgb), 0.5)", padding: '40px' }}>No products found in database.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        );
      }
      case 'talented':
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "28px", color: "var(--text)" }}>Talent Pool Management</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* ADD TALENT FORM */}
              <div style={{ background: 'var(--bg-level1)', border: '1px solid var(--border-subtle)', borderRadius: '24px', padding: '32px' }}>
                <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '20px', marginBottom: '20px', color: 'var(--text-primary)' }}>Add New Talent</h4>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const fd = new FormData(e.target);
                    const cvFile = fd.get('cv_file');
                    const picFile = fd.get('pic_file');
                    let cv_url = null;
                    let image_url = null;

                    showNotif('Adding talent, please wait...', 'pending');

                    // Upload CV
                    if (cvFile && cvFile.size > 0) {
                      const fileName = `${Date.now()}_cv_${cvFile.name.replace(/\s+/g, '_')}`;
                      const { error: uploadError } = await supabase.storage
                        .from('talented_cvs')
                        .upload(fileName, cvFile);
                      
                      if (uploadError) throw new Error('CV Upload Error: ' + uploadError.message);
                      const { data: { publicUrl } } = supabase.storage.from('talented_cvs').getPublicUrl(fileName);
                      cv_url = publicUrl;
                    }

                    // Upload Picture
                    if (picFile && picFile.size > 0) {
                      const fileName = `${Date.now()}_pic_${picFile.name.replace(/\s+/g, '_')}`;
                      const { error: uploadError } = await supabase.storage
                        .from('talented_cvs')
                        .upload(fileName, picFile);
                      
                      if (uploadError) throw new Error('Picture Upload Error: ' + uploadError.message);
                      const { data: { publicUrl } } = supabase.storage.from('talented_cvs').getPublicUrl(fileName);
                      image_url = publicUrl;
                    }

                    const payload = {
                      name: fd.get('name'),
                      category: fd.get('category'),
                      course: fd.get('course'),
                      cv_url: cv_url,
                      image_url: image_url,
                      skills: checkedUnits.join(', '),
                      strengths: strengthUnits.join(', ')
                    };

                    const { error } = await supabase.from('talented').insert([payload]);
                    if (error) throw error;

                    showNotif('Talent added successfully!', 'success');
                    e.target.reset();
                    fetchData();
                  } catch (err) {
                    console.error("Submission error:", err);
                    showNotif('Error: ' + (err.message || 'Check database table and storage bucket existence.'), 'error');
                  }
                }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" name="name" required placeholder="Full Name" style={{ background: 'var(--bg-level2)', border: '1px solid var(--border-subtle)', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)' }} /></div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-input" name="category" required style={{ background: 'var(--bg-level2)', border: '1px solid var(--border-subtle)', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)', width: '100%' }}>
                      <option value="Afric Graduate">Academy Graduate</option>
                      <option value="Intern Graduate">Internship Graduate</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Course Completed</label>
                    <select 
                      className="form-input" 
                      name="course" 
                      required 
                      value={selectedCourse}
                      onChange={(e) => {
                        setSelectedCourse(e.target.value);
                        setCheckedUnits([]);
                        setStrengthUnits([]);
                      }}
                      style={{ background: 'var(--bg-level2)', border: '1px solid var(--border-subtle)', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)', width: '100%' }}
                    >
                      <option value="">Select a Course...</option>
                      {Object.keys(COURSE_UNITS).map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Student Picture</label><input type="file" className="form-input" name="pic_file" accept="image/*" style={{ background: 'var(--bg-level2)', border: '1px solid var(--border-subtle)', padding: '8px', borderRadius: '8px', color: 'var(--text-primary)' }} /></div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}><label className="form-label">CV (PDF)</label><input type="file" className="form-input" name="cv_file" accept=".pdf" style={{ background: 'var(--bg-level2)', border: '1px solid var(--border-subtle)', padding: '8px', borderRadius: '8px', color: 'var(--text-primary)', width: '100%' }} /></div>
                  
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Course Units & Areas of Strength</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                          type="text" 
                          id="custom-unit-input"
                          placeholder="Add custom unit..." 
                          style={{ 
                            background: 'var(--bg-level3)', border: '1px solid var(--border-subtle)', 
                            padding: '4px 12px', borderRadius: '20px', fontSize: '11px', color: 'var(--text-primary)',
                            width: '140px'
                          }} 
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const val = e.target.value.trim();
                              if (val) {
                                setCheckedUnits(prev => prev.includes(val) ? prev : [...prev, val]);
                                e.target.value = '';
                              }
                            }
                          }}
                        />
                        {selectedCourse && <span style={{ fontSize: '10px', color: 'var(--accent-green)', fontWeight: 700 }}>★ Mark as Strength</span>}
                      </div>
                    </label>
                    {((selectedCourse && COURSE_UNITS[selectedCourse]) || checkedUnits.length > 0) ? (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', background: 'var(--bg-level2)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                        {[...new Set([...(COURSE_UNITS[selectedCourse] || []), ...checkedUnits])].map((unit, idx) => {
                          const isChecked = checkedUnits.includes(unit);
                          const isStrength = strengthUnits.includes(unit);
                          return (
                            <div key={idx} style={{ 
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', 
                                background: isChecked ? 'rgba(var(--text-primary-rgb), 0.03)' : 'transparent', 
                                borderRadius: '10px', border: '1px solid',
                                borderColor: isStrength ? 'var(--accent-green)' : (isChecked ? 'var(--border-strong)' : 'var(--border-subtle)'),
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                            }} onClick={() => toggleUnit(unit)}>
                               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                 <div style={{ 
                                   width: '18px', height: '18px', borderRadius: '4px', border: '2px solid var(--border-strong)',
                                   background: isChecked ? 'var(--accent-orange)' : 'none',
                                   display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff'
                                 }}>
                                   {isChecked && '✓'}
                                 </div>
                                 <span style={{ fontSize: '13px', color: isChecked ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: isChecked ? 600 : 400 }}>{unit}</span>
                               </div>
                               {isChecked && (
                                 <button 
                                   type="button" 
                                   onClick={(e) => { e.stopPropagation(); toggleStrength(unit); }} 
                                   style={{ 
                                     background: isStrength ? 'var(--accent-green)' : 'none', 
                                     border: 'none', cursor: 'pointer', fontSize: '14px', 
                                     width: '24px', height: '24px', borderRadius: '50%',
                                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                                     color: isStrength ? '#fff' : 'var(--text-muted)',
                                     filter: isStrength ? 'none' : 'grayscale(1)',
                                     opacity: isStrength ? 1 : 0.4,
                                     transition: 'all 0.2s'
                                   }}
                                 >
                                   ★
                                 </button>
                               )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--bg-level2)', borderRadius: '16px', border: '2px dashed var(--border-subtle)' }}>
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>📚</div>
                        <div style={{ fontSize: '14px', fontWeight: 600 }}>Please select a course above to manage candidate units</div>
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn-submit" style={{ gridColumn: '1 / -1', background: 'var(--accent-orange)', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Add to Pool</button>
                </form>
              </div>

              {/* TALENT LIST */}
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr><th>Photo</th><th>Name</th><th>Category</th><th>Course</th><th>CV</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {talentedPool.map(t => (
                      <tr key={t.id}>
                        <td>
                          <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-level2)' }}>
                            {t.image_url ? <img src={t.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '👤'}
                          </div>
                        </td>
                        <td style={{ fontWeight: 700 }}>{t.name}</td>
                        <td><span className={`badge ${t.category === 'Afric Graduate' ? 'active' : 'completed'}`}>{t.category}</span></td>
                        <td>{t.course}</td>
                        <td>
                          {t.cv_url ? <a href={t.cv_url} target="_blank" style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>📄 View CV</a> : 'No CV'}
                        </td>
                        <td>
                          <button className="action-btn" style={{ color: '#ff5050' }} onClick={() => {
                            setConfirmObj({
                              msg: 'Are you sure you want to remove this person from the talented pool?',
                              onConfirm: async () => {
                                setConfirmObj(null);
                                await supabase.from('talented').delete().eq('id', t.id);
                                fetchData();
                                showNotif('Removed from talented pool.');
                              }
                            });
                          }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {talentedPool.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '40px' }}>No talent added yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );

      case 'videos':
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "28px", color: "var(--text)" }}>Site Videos Management</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ background: 'var(--bg-level1)', border: '1px solid var(--border-subtle)', borderRadius: '24px', padding: '32px' }}>
                <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '20px', marginBottom: '20px', color: 'var(--text-primary)' }}>Add New Video</h4>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target);
                  const payload = {
                    title: fd.get('title'),
                    description: fd.get('description'),
                    video_url: fd.get('video_url'),
                  };
                  const { error } = await supabase.from('site_videos').insert([payload]);
                  if (!error) {
                    showNotif('Video added successfully!', 'success');
                    e.target.reset();
                    fetchData();
                  } else {
                    showNotif('Error: ' + error.message, 'error');
                  }
                }} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                  <div className="form-group"><label className="form-label">Video Title</label><input className="form-input" name="title" required placeholder="e.g. Campus Tour 2026" /></div>
                  <div className="form-group"><label className="form-label">Video URL (YouTube/Vimeo)</label><input className="form-input" name="video_url" required placeholder="https://youtube.com/..." /></div>
                  <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" name="description" placeholder="Short description about the video" /></div>
                  <button type="submit" className="btn-submit" style={{ background: 'var(--accent-orange)', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Add Video to Site</button>
                </form>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr><th>Title</th><th>Description</th><th>URL</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {siteVideos.map(v => (
                      <tr key={v.id}>
                        <td style={{ fontWeight: 700 }}>{v.title}</td>
                        <td>{v.description || 'N/A'}</td>
                        <td><a href={v.video_url} target="_blank" style={{ color: 'var(--accent-orange)' }}>{v.video_url}</a></td>
                        <td>
                          <button className="action-btn" style={{ color: '#ff5050' }} onClick={() => {
                            setConfirmObj({
                              msg: 'Are you sure you want to delete this video?',
                              onConfirm: async () => {
                                setConfirmObj(null);
                                await supabase.from('site_videos').delete().eq('id', v.id);
                                fetchData();
                                showNotif('Video removed from site.');
                              }
                            });
                          }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {siteVideos.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '40px' }}>No site videos added yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );

      case 'messages': {
        const unreadCount = messages.filter(m => m.status === 'unread').length;
        const filteredMsgs = messages.filter(m => {
          if (dismissedIds.includes(m.id)) return false;
          if (m.status?.toLowerCase() === 'deleted') return false;
          if (msgFilter === 'unread') return m.status === 'unread';
          if (msgFilter === 'read') return m.status === 'read';
          if (msgFilter === 'replied') return m.status === 'replied';
          return true;
        });
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '28px', color: 'var(--text)' }}>Contact Messages</h3>
                {unreadCount > 0 && (
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#ff5050', marginTop: '4px', fontWeight: 700 }}>
                    🔴 {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px' }}>
                {['all', 'unread', 'read', 'replied'].map(f => (
                  <button key={f} onClick={() => setMsgFilter(f)} style={{
                    background: msgFilter === f ? 'rgba(255,165,0,0.15)' : 'transparent',
                    color: msgFilter === f ? '#ffa500' : 'rgba(var(--text-rgb), 0.5)',
                    border: 'none', padding: '6px 12px', borderRadius: '4px',
                    fontFamily: "'Poppins', sans-serif", fontSize: '12px', fontWeight: 'bold',
                    textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s'
                  }}>{f}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: selectedMessage ? '1fr 1fr' : '1fr', gap: '24px' }}>
              {/* Message List */}
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>Subject</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMsgs.map(msg => (
                      <tr
                        key={msg.id}
                        style={{
                          cursor: 'pointer',
                          background: selectedMessage?.id === msg.id ? 'var(--bg-level2-half)' : 'transparent',
                          fontWeight: msg.status === 'unread' ? '700' : 'normal',
                        }}
                        onClick={() => {
                          setSelectedMessage(msg);
                          if (msg.status === 'unread') updateMessageStatus(msg.id, 'read');
                        }}
                      >
                        <td>
                          <div style={{ fontWeight: 700 }}>{msg.name}</div>
                          <div style={{ fontSize: '11px', color: 'rgba(var(--text-rgb), 0.5)', fontFamily: "'Inter', sans-serif" }}>{msg.email}</div>
                          {msg.phone && <div style={{ fontSize: '11px', color: 'rgba(var(--text-rgb), 0.4)', fontFamily: "'Inter', sans-serif" }}>{msg.phone}</div>}
                        </td>
                        <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {msg.status === 'unread' && <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#ff5050', marginRight: 8, verticalAlign: 'middle' }} />}
                          {msg.subject}
                        </td>
                        <td style={{ color: 'rgba(var(--text-rgb), 0.5)', fontFamily: "'Inter', sans-serif", fontSize: '11px', whiteSpace: 'nowrap' }}>
                          {new Date(msg.created_at).toLocaleDateString()}<br/>
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td>
                          <span style={{
                            padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                            background: msg.status === 'unread' ? 'rgba(255,80,80,0.15)' : msg.status === 'replied' ? 'rgba(0,200,120,0.15)' : 'rgba(74,144,226,0.15)',
                            color: msg.status === 'unread' ? '#ff5050' : msg.status === 'replied' ? '#00c878' : '#4a90e2',
                          }}>{msg.status || 'unread'}</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }} onClick={e => e.stopPropagation()}>
                            {msg.status !== 'replied' && (
                              <button className="action-btn" style={{ color: '#00c878', fontSize: '12px', padding: '4px 8px' }}
                                onClick={() => updateMessageStatus(msg.id, 'replied')}>
                                ✓ Replied
                              </button>
                            )}
                            <button className="action-btn" style={{ color: '#ff5050', fontSize: '12px', padding: '4px 8px' }}
                              onClick={() => deleteMessage(msg.id)}>
                              🗑
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredMsgs.length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: 'center', color: 'rgba(var(--text-rgb), 0.5)', padding: '40px' }}>No {msgFilter === 'all' ? '' : msgFilter} messages found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Message Detail Panel */}
              {selectedMessage && (
                <div style={{
                  background: 'var(--bg-level1)', border: '1px solid var(--border-subtle)',
                  borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                        {selectedMessage.subject}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(var(--text-rgb), 0.5)' }}>
                        {new Date(selectedMessage.created_at).toLocaleString()}
                      </div>
                    </div>
                    <button className="action-btn" style={{ color: '#ff5050' }} onClick={() => setSelectedMessage(null)}>✕ Close</button>
                  </div>

                  <div style={{ background: 'var(--bg-level2)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>
                      <span style={{ color: 'rgba(var(--text-rgb), 0.5)', fontWeight: 600 }}>From: </span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{selectedMessage.name}</span>
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>
                      <span style={{ color: 'rgba(var(--text-rgb), 0.5)', fontWeight: 600 }}>Email: </span>
                      <a href={`mailto:${selectedMessage.email}`} style={{ color: 'var(--accent-orange)', fontWeight: 700, textDecoration: 'none' }}>{selectedMessage.email}</a>
                    </div>
                    {selectedMessage.phone && (
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>
                        <span style={{ color: 'rgba(var(--text-rgb), 0.5)', fontWeight: 600 }}>Phone: </span>
                        <a href={`tel:${selectedMessage.phone}`} style={{ color: 'var(--accent-orange)', fontWeight: 700, textDecoration: 'none' }}>{selectedMessage.phone}</a>
                      </div>
                    )}
                  </div>

                  <div style={{ flex: 1, background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px' }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(var(--text-rgb), 0.4)', marginBottom: '12px' }}>Message</div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.75', whiteSpace: 'pre-wrap', margin: 0 }}>
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                      style={{
                        flex: 1, padding: '14px', background: 'var(--accent-orange)', color: '#fff',
                        borderRadius: '10px', textAlign: 'center', fontFamily: "'Poppins', sans-serif",
                        fontWeight: 800, fontSize: '14px', textDecoration: 'none', transition: 'all 0.3s',
                        boxShadow: '0 8px 16px var(--accent-orange-glow)'
                      }}
                      onClick={() => updateMessageStatus(selectedMessage.id, 'replied')}
                    >
                      ✉️ Reply via Email
                    </a>
                    {selectedMessage.phone && (
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        style={{
                          flex: 1, padding: '14px', background: 'rgba(0,200,120,0.15)', color: '#00c878',
                          border: '1px solid rgba(0,200,120,0.2)', borderRadius: '10px', textAlign: 'center',
                          fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '14px',
                          textDecoration: 'none', transition: 'all 0.3s'
                        }}
                      >
                        📞 Call Back
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        );
      }

      default:
        return null;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="admin-page">
        {/* SIDEBAR */}
        <div className="admin-sidebar">
          {TABS.map(tab => {
            const isMsg = tab.id === 'messages';
            const unread = isMsg ? messages.filter(m => m.status === 'unread').length : 0;
            return (
              <div
                key={tab.id}
                className={`admin-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{ position: 'relative' }}
              >
                <span className="admin-nav-icon">{tab.icon}</span>
                {tab.label}
                {unread > 0 && (
                  <span style={{
                    position: 'absolute', top: '8px', right: '10px',
                    background: '#ff5050', color: '#fff', borderRadius: '50%',
                    width: '20px', height: '20px', fontSize: '10px', fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Inter', sans-serif", boxShadow: '0 2px 8px rgba(255,80,80,0.4)'
                  }}>{unread}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* CONTENT */}
        <div className="admin-content">
          <div className="admin-header">
            <div className="admin-subtitle">Administrator Portal</div>
            <h1 className="admin-title">Control Panel</h1>
          </div>
          <div className="admin-stats-grid" style={{ marginBottom: "32px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <div className="admin-stat-card" style={{ padding: "24px" }}>
              <div className="stat-card-title">Total Users</div>
              <div className="stat-card-value" style={{ color: '#4a90e2', fontSize: "36px" }}>{users.filter(u => u.status !== 'Deleted').length}</div>
            </div>
            <div className="admin-stat-card" style={{ padding: "24px" }}>
              <div className="stat-card-title">Pending Interns</div>
              <div className="stat-card-value" style={{ fontSize: "36px" }}>{imsApps.filter(doc => doc.status === 'Pending').length}</div>
            </div>
            <div className="admin-stat-card" style={{ padding: "24px" }}>
              <div className="stat-card-title">Pending Academy</div>
              <div className="stat-card-value" style={{ color: '#ffa500', fontSize: "36px" }}>{academyEnrolls.filter(req => req.status === 'Pending').length}</div>
            </div>
            <div className="admin-stat-card" style={{ padding: "24px" }}>
              <div className="stat-card-title">Pending Orders</div>
              <div className="stat-card-value" style={{ color: '#ff5f56', fontSize: "36px" }}>{shopOrders.filter(o => o.status === 'pending').length}</div>
            </div>
          </div>

          {renderContent()}
        </div>

        {/* CONFIRMATION OVERLAY */}
        {confirmObj && (
          <div className="admin-confirm-overlay">
            <div className="admin-confirm-modal">
              <div className="admin-confirm-icon">⚠️</div>
              <h3 className="admin-confirm-title">Confirm Action</h3>
              <p className="admin-confirm-text">{confirmObj.msg}</p>
              <div className="admin-confirm-actions">
                <button className="btn-cancel" onClick={() => setConfirmObj(null)}>Cancel</button>
                <button className="btn-confirm" onClick={confirmObj.onConfirm}>Yes, proceed</button>
              </div>
            </div>
          </div>
        )}

        {/* NOTIFICATION TOAST */}
        {notif && (
          <div className={`admin-notification ${notif.type}`} onClick={() => setNotif(null)}>
            <span className="notif-icon">{notif.type === 'success' ? '✅' : '⚠️'}</span>
            <span className="notif-text">{notif.msg}</span>
          </div>
        )}
      </div>
    </>
  );
}
