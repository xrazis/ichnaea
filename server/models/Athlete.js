const mongoose = require('mongoose');
const {Schema} = mongoose;

const AthleteSchema = new Schema({
    id: String,
    name: String,
    _trainer: {type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('Athlete', AthleteSchema);
