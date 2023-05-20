import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signing out", async () => {
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

  const response = await request(app)
    .post("/api/user/signout")
    .send({})
    .expect(200);

  expect(response.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
