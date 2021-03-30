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

export const createNote = async (req: Request, res: Response) => {
  const { sub: owner } = req.user as JwtUser;
  const note = new Notes({
    owner,
    text: req.body.text,
    archived: false
  });
  await note.save();
  res.json(note);
};

export const deleteNote = async (req: Request, res: Response) => {
  const { sub: owner } = req.user as JwtUser;
  const { id: _id } = req.params;
  const note = await Notes.findOneAndDelete({
    owner,
    _id
  });
  if (!note) {
    res.status(404).send();
  } else {
    res.status(204).send();
  }
};

