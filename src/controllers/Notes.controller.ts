import { Request, Response } from "express";
import { UpdateQuery } from "mongoose";
import { Notes } from "../models/Notes.model";

interface JwtUser {
  sub?: string;
}

export const getArchivedNotes = async ({ user }: Request, res: Response) => {
  const { sub: owner } = user as JwtUser;
  const notes = await Notes.find({
    owner,
    archived: true,
  });
  res.json(notes);
};

export const getUnarchivedNotes = async ({ user }: Request, res: Response) => {
  const { sub: owner } = user as JwtUser;
  const notes = await Notes.find({
    owner,
    archived: false,
  });
  res.json(notes);
};


