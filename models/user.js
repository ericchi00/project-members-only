import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
	username: { type: String, required: true, minlength: 4 },
	password: { type: String, required: true, minlength: 5 },
	member: { type: Boolean, default: false },
	admin: { type: Boolean, default: false },
	join_date: { type: Date, default: Date.now },
});

export default mongoose.model('User', UserSchema);
