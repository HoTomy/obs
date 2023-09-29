import { Schema, Document } from "mongoose";

export interface Book extends Document {
  title: string;
  description: string;
  editor: string;
  publishedDate: Date;
  availability: boolean;
  editedDate: Date;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  editor: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  availability: { type: Boolean, required: true },
  editedDate: { type: Date, required: true },
});

export const BookModel = mongoose.model<Book>("Book", BookSchema);