import request from "supertest";
import { app } from "../../app";
import { Doctor } from "../../models/doctor";

it("has a route handler listening to /api/doctor for post requests", async () => {
  const response =  await request(app).post("/api/doctor").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const response =  await request(app).post("/api/doctor").send({});
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/doctor")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid name is provided", async () => {
  await request(app)
    .post("/api/doctor")
    .set("Cookie", global.signin())
    .send({
      name: "",
      phone: "0123456789",
      department: "cấp cứu",
      avatar: "test avatar",
    })
    .expect(400);
});

it("returns an error if an invalid phone number is provided", async () => {
  await request(app)
    .post("/api/doctor")
    .set("Cookie", global.signin())
    .send({
      name: "Nguyên Quảng An",
      phone: "019",
      department: "cấp cứu",
      avatar: "test avatar",
    })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  let doctors = await Doctor.find({});
  expect(doctors.length).toEqual(0);
  await request(app)
    .post("/api/doctor")
    .set("Cookie", global.signin())
    .send({
      name: "Nguyên Quảng An",
      phone: "0123456789",
      department: "cấp cứu",
      avatar:"uploads/123"
      // avatar: {
      //   data: "https://mybucket.s3.us-east-2.amazonaws.com/12144etest.jpg",
      //   contentType: "image/png",
      // },
    })
    .expect(201);
    doctors = await(Doctor.find({}))
    expect(doctors.length).toEqual(1)
    expect(doctors[0].phone).toEqual("0123456789")
});
