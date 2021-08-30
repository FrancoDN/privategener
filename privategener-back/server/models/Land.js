const mongoose = require('mongoose');
import mongoosePaginate from 'mongoose-paginate-v2'

let Schema = mongoose.Schema;

const landSchema = new Schema({
  landLink: { type: String},
  xCoord: { type: String},
  yCoord: { type: String},
  plantLink: {type: Array},
  active: {type: Boolean}

},
  {
    versionKey: false,
    timestamps: true
  });

  landSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Land', landSchema);

