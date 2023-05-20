import request from "supertest";
import { app } from "../../app";

it("Return a 201 on succesful signup", async () => {
  return request(app)
    .post("/api/user/signup")
    .send({
      email: "test@test.com",
      password: "password",
      clinicName: "Phong kham",
      address: "Ha Noi",
      phone: "0123456789",
    })
    .expect(201);
});

it("Return a 400 with a invalid email", async () => {
  return request(app)
    .post("/api/user/signup")
    .send({
      email: "test",
      password: "password",
      clinicName: "Phong kham",
      address: "Ha Noi",
      phone: "0123456789",
    })
    .expect(400);
});

it("Return a 400 with a invalid password", async () => {
  return request(app)
    .post("/api/user/signup")
    .send({
      email: "test@test.com",
      password: "p",
      clinicName: "Phong kham",
      address: "Ha Noi",
      phone: "0123456789",
    })
    .expect(400);
});

it("Return a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/user/signup")
    .send({
      email: "test@test.com",
      clinicName: "Phong kham",
      address: "Ha Noi",
      phone: "0123456789",
    })
    .expect(400);
  await request(app)
    .post("/api/user/signup")
    .send({
      password: "password",
      clinicName: "Phong kham",
      address: "Ha Noi",
      phone: "0123456789",
    })
    .expect(400);
});

it("disalow duplicate email", async () => {
  await request(app)
    .post("/api/user/signup")
    .send({
      email: "test@test.com",
      password: "password",
      clinicName: "Phong kham",
      address: "Ha Noi",
      phone: "0123456789",
    })
    .expect(201);

  await request(app)
    .post("/api/user/signup")
    .send({
      email: "test@test.com",
      password: "password",
      clinicName: "Phong kham",
      address: "Ha Noi",
      phone: "0123456789",
    })
    .expect(400);
});
