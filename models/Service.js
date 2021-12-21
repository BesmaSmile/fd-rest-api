const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  placement: Number,
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: String,
  icon: String,
  keywords: Array,
  params: {
    withDescription: {
      type: Boolean,
      default: false,
    },
    withDestination: {
      type: Boolean,
      default: false,
    },
  },
  prices: {
    timeslotPrices: [
      {
        from: String,
        to: String,
        price: Number,
      },
    ],
    loadingPrice: Number,
    unloadingPrice: Number,
    assemblyPrice: Number,
    disassemblyPrice: Number,
  },
  commission: {
    global: Number, // percentage
    deplacement: Number, // value
  },
});

module.exports = mongoose.model('Service', serviceSchema);
