import { format, formatDistanceToNow } from 'date-fns';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
	username: { type: Schema.Types.ObjectID, ref: 'User' },
	title: { type: String, maxLength: 50, minLength: 1 },
	message: { type: String, required: true, minLength: 1 },
	timestamp: { type: Date, default: Date.now },
});

MessageSchema.virtual('formatDate').get(function () {
	return formatDistanceToNow(this.timestamp, {
		includeSeconds: true,
		addSuffix: true,
	});
});

export default mongoose.model('Message', MessageSchema);
