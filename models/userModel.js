const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;


const createUserSchema = new Schema({
    firstName: {type: String, required: [true, 'Please provide first name']},
    lastName: {type: String, required: [true, 'Please provide last name']},
    email: {type: String, required: [true, 'Please enter a valid email'], unique: true},
    password: {type: String,required: [true, 'Please provide a password'],minlength: 8,select: false,},
    dob: { type: String },
    address1: {type: String, required: [true, 'Please provide address one']},
    address2: {type: String, required: [true, 'Please provide address two']},
    city: {type: String, required: [true, 'Please provide city']},
    state: {type: String, required: [true, 'Please provide state']},
    country: {type: String, required: [true, 'Please provide country']},
    token: { type: String },
},{ timestamps: true });


createUserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

createUserSchema.plugin(mongoosePaginate);

createUserSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

  createUserSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
      ret.id = ret._id.toString();
  
      delete ret['password'];
      delete ret['_id'];
      delete ret['__v'];
      return ret;
    },
  });

const AppUser  = mongoose.model('AppUser', createUserSchema);

module.exports = AppUser;