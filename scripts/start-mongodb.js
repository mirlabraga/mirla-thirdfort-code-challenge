let res = [
  db.createUser(
    {
      user: "notes",
      pwd: "notes",
      roles: [ "readWrite", "dbAdmin" ]
    }
 ),
];

printjson(res);