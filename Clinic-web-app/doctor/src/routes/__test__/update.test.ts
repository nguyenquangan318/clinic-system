import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { response } from "express";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/doctor/${id}`)
    .set("Cookie", global.signin())
    .send({
      name: "Nguyên Quảng An",
      phone: "0123456789",
      department: "cấp cứu",
      avatar: "uploads/123",
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/doctor/${id}`)
    .send({
      name: "Nguyên Quảng An",
      phone: "0123456789",
      department: "cấp cứu",
      avatar: "uploads/123",
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid name or phone", async () => {
  const cookie = global.signin();
  const res = await request(app)
    .post(`/api/doctor/`)
    .set("Cookie", cookie)
    .send({
      name: "Nguyên Quảng An",
      phone: "0123456789",
      department: "cấp cứu",
      avatar: "uploads/123",
    });

    await request(app)
    .put(`/api/doctor/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      name: "",
      phone: "0123456789",
      department: "cấp cứu",
      avatar: "uploads/123",
    })
    .expect(400);

  await request(app)
    .put(`/api/doctor/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      name: "Nguyên Quảng An",
      phone: "0129",
      department: "cấp cứu",
      avatar: "uploads/123",
    })
    .expect(400);
});

it("updates the doctor provided valid inputs", async () => {
  const cookie = global.signin();
  const res = await request(app)
    .post(`/api/doctor/`)
    .set("Cookie", cookie)
    .send({
      name: "Nguyên Quảng An",
      phone: "0123456789",
      department: "cấp cứu",
      avatar: "uploads/123",
    });

    await request(app)
    .put(`/api/doctor/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      name: "Nguyên Văn An",
      phone: "0123456788",
      department: "cấp cứu",
      avatar: "uploads/123",
    })
    .expect(200);

  const doctorResponse = await request(app)
    .get(`/api/doctor/${res.body.id}`)
    .send();

  expect(doctorResponse.body.name).toEqual('Nguyên Văn An');
  expect(doctorResponse.body.phone).toEqual("0123456788");
});
