import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	member: { type: Boolean, default: false },
	admin: { type: Boolean, default: false },
});

export default mongoose.model('User', UserSchema);
