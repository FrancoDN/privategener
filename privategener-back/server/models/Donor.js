const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const donorSchema = new Schema({
  discord: { type: String},
  uid: { type: String},
  active: { type: Boolean, default: true },
  license: {type: Number}
},
  {
    versionKey: false,
    timestamps: true
  });

module.exports = mongoose.model('Donor', donorSchema);

