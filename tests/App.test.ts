import { generateJwt } from "./lib/jwt";

import request from "supertest";
import { Note, Notes } from "../src/models/Notes.model";

import { Mongoose } from "mongoose";
import { MockMongoose } from "mock-mongoose";
import { Server } from "node:http";

describe("/notes*", () => {
  let userAToken: string;
  let userBToken: string;
  let app: Server;
  let mongoose: Mongoose;
  let mockMongoose: MockMongoose;

  beforeAll(async (done) => {
    mongoose = new Mongoose();
    mockMongoose = new MockMongoose(mongoose);

    await mockMongoose.prepareStorage();
    // await mongoose.connect('mongodb://example.com/TestingDB');
    app = require("../src/App");

    userAToken = await generateJwt("jwt-secret", {
      sub: "user-a",
    });
    userBToken = await generateJwt("jwt-secret", {
      sub: "user-b",
    });
    done();
  });

  beforeEach(async () => {
    await Notes.remove({});
  });

  afterAll(async (done) => {
    await mockMongoose.killMongo();
    await mongoose.connection.close();
    app.close(done);
  });

  describe("POST /notes", () => {
    it("Should create it", async () => {
      expect((await Notes.find({})).length).toBe(0);

      const result = await request(app)
        .post("/notes")
        .set("Authorization", `Bearer ${userAToken}`)
        .send({ text: "myText" });

      const notes = await Notes.find({});

      expect(result.status).toEqual(200);
      expect(notes.length).toBe(1);
      expect(notes[0].text).toBe("myText");
      expect(notes[0].owner).toBe("user-a");
      expect(notes[0].archived).toBe(false);
    });
  });

  describe("GET /notes/unarchive", () => {
    let userANotes: Note[];
    let userBNotes: Note[];

    beforeEach(async () => {
      await Notes.remove({});

      userANotes = [
        await new Notes({
          text: "unarchived note",
          owner: "user-a",
          archived: false,
        }).save(),
        await new Notes({
          text: "second unarchived note",
          owner: "user-a",
          archived: false,
        }).save(),
      ];

      userBNotes = [
        await new Notes({
          text: "third unarchived note",
          owner: "user-b",
          archived: false,
        }).save(),
      ];
    });

    it("Should list unarchived for user-a", async () => {
      const result = await request(app)
        .get(`/notes/unarchived`)
        .set("Authorization", `Bearer ${userAToken}`)
        .send();

      expect(result.status).toEqual(200);
      const returnedNotes: Note[] = JSON.parse(result.text);

      expect(result.text).toBe(JSON.stringify(userANotes));
    });

    it("Should list unarchived for user-b", async () => {
      const result = await request(app)
        .get(`/notes/unarchived`)
        .set("Authorization", `Bearer ${userBToken}`)
        .send();

      expect(result.status).toEqual(200);
      const returnedNotes: Note[] = JSON.parse(result.text);

      expect(result.text).toBe(JSON.stringify(userBNotes));

    });
  });


  describe("GET /notes/archive", () => {
    let userANotes: Note[];
    let userBNotes: Note[];

    beforeEach(async () => {
      await Notes.remove({});

      userANotes = [
        await new Notes({
          text: "archived note",
          owner: "user-a",
          archived: true,
        }).save(),
      ];

      userBNotes = [
        await new Notes({
          text: "second archived note",
          owner: "user-b",
          archived: true,
        }).save(),
        await new Notes({
          text: "third archived note",
          owner: "user-b",
          archived: true,
        }).save(),
      ];
    });

    it("Should list archived for user-a", async () => {
      const result = await request(app)
        .get(`/notes/archived`)
        .set("Authorization", `Bearer ${userAToken}`)
        .send();

      expect(result.status).toEqual(200);
      const returnedNotes: Note[] = JSON.parse(result.text);

      expect(result.text).toBe(JSON.stringify(userANotes));
    });

    it("Should list archived for user-b", async () => {
      const result = await request(app)
        .get(`/notes/archived`)
        .set("Authorization", `Bearer ${userBToken}`)
        .send();

      expect(result.status).toEqual(200);
      const returnedNotes: Note[] = JSON.parse(result.text);

      expect(result.text).toBe(JSON.stringify(userBNotes));
    });
  });
});
