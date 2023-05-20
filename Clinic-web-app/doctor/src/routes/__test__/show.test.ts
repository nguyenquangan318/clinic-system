import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("return 404 if not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/doctor/${id}`).send().expect(404);
});

it("return doctor if found", async () => {
  const response = await request(app)
    .post("/api/doctor")
    .set("Cookie", global.signin())
    .send({
      name: "Nguyên Quảng An",
      phone: "0123456789",
      department: "cấp cứu",
      avatar: "uploads/123",
      // avatar: {
      //   data: "https://mybucket.s3.us-east-2.amazonaws.com/12144etest.jpg",
      //   contentType: "image/png",
      // },
    })
    .expect(201);

  const doctorRes = await request(app)
    .get(`/api/doctor/${response.body.id}`)
    .send()
    .expect(200);
});
