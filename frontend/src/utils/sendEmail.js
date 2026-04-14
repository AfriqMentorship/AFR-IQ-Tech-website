import emailjs from '@emailjs/browser';

// ─── EmailJS Configuration ───────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_84yj9uq';
const EMAILJS_PUBLIC_KEY  = 'lG5wi-zCYNiLAfAPv';
const APPLICANT_TEMPLATE_ID = 'template_srounw2'; 
const ADMIN_CONTACT_TEMPLATE_ID = 'template_srounw2'; 
const ADMIN_EMAIL = 'iamsifu.dev@gmail.com'; 

// Initialize EmailJS once
emailjs.init(EMAILJS_PUBLIC_KEY);

// ─── 1. IMS Application Status Notification (to applicant) ───────────────────
export const sendNotificationEmail = async (to_email, to_name, program_name, status) => {
  try {
    const message = status === 'Approved'
      ? `Congratulations ${to_name}! Your application for ${program_name} has been Approved. You can now log in to your dashboard at afr-iq.tech/ims to start recording your daily activities and tracking your progress.`
      : `Dear ${to_name}, we regret to inform you that your application for ${program_name} has not been approved at this time. Please contact us for more information.`;

    const timeNow = new Date().toLocaleString('en-UG', {
      timeZone: 'Africa/Kampala',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      APPLICANT_TEMPLATE_ID,
      {
        // 🚨 FOOLPROOF FIX: We assign the student's email (to_email) to EVERY SINGLE
        // email variable. This physically forces EmailJS to send it to the student,
        // no matter how the dashboard template routing is misconfigured.
        to_email:     to_email,
        email:        to_email, 
        reply_to:     to_email,
        admin_email:  to_email,
        customer_email: to_email,
        from_email:   to_email,
        sender_email: to_email,
        
        // Sender Display Names (who it's from)
        from_name:    'AFR-IQ Technologies',
        sender_name:  'AFR-IQ Technologies',
        company_name: 'AFR-IQ Technologies',
        
        to_name:      to_name || 'Applicant',
        name:         'AFR-IQ Technologies',
        time:         timeNow,
        message:      message,

        // Extra info
        student_name: to_name || 'AFR-IQ Applicant',
        program_name: program_name,
        status:       status,
      }
    );

    console.log(`✅ ${status} notification sent to student:`, to_email);
    return true;
  } catch (error) {
    console.error('❌ Failed to send applicant email:', error);
    return false;
  }
};

// ─── 2. Admin Contact-Form Notification ──────────────────────────────────────
export const sendAdminContactNotification = async ({ name, email, phone, subject, message }) => {
  try {
    const timeNow = new Date().toLocaleString('en-UG', {
      timeZone: 'Africa/Kampala',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      ADMIN_CONTACT_TEMPLATE_ID,
      {
        to_email:      ADMIN_EMAIL,
        email:         ADMIN_EMAIL,    
        admin_email:   ADMIN_EMAIL,
        to_name:       'AFR-IQ Admin',
        from_name:     name,
        company_name:  'AFR-IQ Technologies',

        name:          name,
        time:          timeNow,
        message:       `Contact Form Message from ${name} (${email}):\n\n${message}`,

        phone:         phone || 'Not provided',
        sender_name:   'AFR-IQ Technologies',
        customer_name: name,
        // MUST NOT USE STUDENT EMAIL IN ANY ADDRESS FIELD
        sender_email:  ADMIN_EMAIL,
        sender_phone:  phone || 'Not provided',

        subject:       `Contact Form: ${subject}`,

        // We provide a specific variable for the customer email
        customer_email: email,

        // Reverting reply_to back to ADMIN_EMAIL for now so that the admin
        // receives the email, because the EmailJS dashboard template is 
        // mistakenly using {{reply_to}} as the "To" address!
        reply_to:      ADMIN_EMAIL,
        sent_at:       timeNow,
      }
    );

    console.log('✅ Admin notification sent:', result.text);
    return true;
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error);
    return false;
  }
};

// ─── 3. Generic Admin Alert ───────────────────────────────────────────────────
export const sendAdminAlert = async (subject, message, from_name = null, from_email = null) => {
  try {
    const timeNow = new Date().toLocaleString('en-UG', {
      timeZone: 'Africa/Kampala',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      ADMIN_CONTACT_TEMPLATE_ID,
      {
        to_email:     ADMIN_EMAIL,
        admin_email:  ADMIN_EMAIL,
        email:        ADMIN_EMAIL,  
        to_name:      'AFR-IQ Admin',

        name:         from_name || 'AFR-IQ System',
        time:         timeNow,
        message:      message,
        subject:      subject,
        title:        subject,

        from_name:    from_name || 'AFR-IQ System',
        company_name: 'AFR-IQ Technologies',
        // MUST NOT USE STUDENT EMAIL IN ANY ADDRESS FIELD EXCEPT REPLY_TO / CUSTOMER_EMAIL
        from_email:   ADMIN_EMAIL,
        sender_name:  'AFR-IQ Technologies',
        sender_email: ADMIN_EMAIL,

        customer_email: from_email || ADMIN_EMAIL,
        reply_to:     from_email || ADMIN_EMAIL,
        sent_at:      timeNow,
      }
    );
    console.log('✅ Admin alert sent:', result.text);
    return true;
  } catch (error) {
    console.error('❌ Failed to send admin alert:', error);
    return false;
  }
};

// ─── 4. Admin Order Notification ─────────────────────────────────────────────
export const sendAdminOrderNotification = async ({ orderId, customerName, customerEmail, customerPhone, total, items, address }) => {
  try {
    const timeNow = new Date().toLocaleString('en-UG', {
      timeZone: 'Africa/Kampala',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const itemsList = items.map(i => `- ${i.name} (x${i.qty})`).join('\n');
    const orderSummary = `New order received!\n\nOrder ID: #${orderId}\nCustomer: ${customerName}\nEmail: ${customerEmail}\nPhone: ${customerPhone}\nAddress: ${address}\nTotal: UGX ${total.toLocaleString()}\n\nItems:\n${itemsList}`;

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      ADMIN_CONTACT_TEMPLATE_ID,
      {
        to_email:     ADMIN_EMAIL,
        admin_email:  ADMIN_EMAIL,
        email:        ADMIN_EMAIL,    
        to_name:      'AFR-IQ Admin',
        from_name:    customerName,
        company_name: 'AFR-IQ Technologies',
        customer_name: customerName,
        
        name:         customerName,
        time:         timeNow,
        message:      orderSummary,
        
        phone:        customerPhone,
        sender_name:  'AFR-IQ Technologies',
        // MUST NOT USE STUDENT EMAIL IN ANY ADDRESS FIELD
        sender_email: ADMIN_EMAIL,
        sender_phone: customerPhone,
        
        subject:      `New Order #${orderId} from ${customerName}`,
        customer_email: customerEmail,
        reply_to:     ADMIN_EMAIL   
      }
    );
    return true;
  } catch (error) {
    console.error('❌ Failed to send order notification:', error);
    return false;
  }
};

// ─── 5. Admin Enrollment Notification ──────────────────────────────────────────
export const sendAdminEnrollmentNotification = async ({ name, email, phone, course, mode }) => {
  try {
    const timeNow = new Date().toLocaleString('en-UG', {
      timeZone: 'Africa/Kampala',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const enrollSummary = `New academy enrollment request received!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCourse: ${course}\nMode: ${mode}`;

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      ADMIN_CONTACT_TEMPLATE_ID,
      {
        to_email:     ADMIN_EMAIL,
        admin_email:  ADMIN_EMAIL,
        email:        ADMIN_EMAIL,    
        to_name:      'AFR-IQ Admin',
        from_name:    name,
        company_name: 'AFR-IQ Technologies',
        customer_name: name,
        
        name:         name,
        time:         timeNow,
        message:      enrollSummary,
        
        phone:        phone,
        sender_name:  'AFR-IQ Technologies',
        // MUST NOT USE STUDENT EMAIL IN ANY ADDRESS FIELD
        sender_email: ADMIN_EMAIL,
        sender_phone: phone,
        
        subject:      `New Enrollment: ${course} by ${name}`,
        customer_email: email,
        reply_to:     ADMIN_EMAIL           
      }
    );
    return true;
  } catch (error) {
    console.error('❌ Failed to send enrollment notification:', error);
    return false;
  }
};
