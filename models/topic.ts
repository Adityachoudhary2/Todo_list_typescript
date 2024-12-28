import { ObjectId } from "mongodb";

export interface Topic {
  _id?: ObjectId;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}