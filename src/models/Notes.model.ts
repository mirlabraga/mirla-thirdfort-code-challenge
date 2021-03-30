import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;

export interface Note extends Document {
  owner: string;
  text: string;
  archived: boolean;
}

export const NotesSchema = new Schema({
  owner: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  archived: {
    type: Boolean,
    required: true,
    default: false,
  }
})


export const Notes = mongoose.model<Note>('Notes', NotesSchema);
