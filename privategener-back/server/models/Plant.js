const mongoose = require('mongoose');
import mongoosePaginate from 'mongoose-paginate-v2'

let Schema = mongoose.Schema;

const plantSchema = new Schema({
  uid: {type: String},
  grupo: {type: Number},
  plantid: { type: Array},
  account: {type: Number}
},
  {
    versionKey: false,
    timestamps: true
  });

  plantSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Plant', plantSchema);

