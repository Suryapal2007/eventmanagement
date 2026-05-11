const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Registration = require('../models/Registration');
const Event = require('../models/Event');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create Razorpay Order
// @route   POST /api/payments/create-order
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const { eventId, registrationId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    const options = {
      amount: event.price * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_reg_${registrationId}`
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({
      student: req.user.id,
      event: eventId,
      amount: event.price,
      razorpayOrderId: order.id,
      status: 'created'
    });

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/payments/verify
// @access  Private
exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationId } = req.body;

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Transaction not legitimate!" });
    }

    // Update payment and registration status
    await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { status: 'paid', razorpayPaymentId: razorpay_payment_id }
    );

    await Registration.findByIdAndUpdate(registrationId, { paymentStatus: 'completed' });

    res.status(200).json({
      success: true,
      message: "Payment verified successfully"
    });
  } catch (err) {
    next(err);
  }
};
