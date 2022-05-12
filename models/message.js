import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
	username: { type: Schema.Types.ObjectID, ref: 'User' },
	title: { type: String, maxLength: 50 },
	message: { type: String, required: true, minLength: 1 },
	timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Message', MessageSchema);
