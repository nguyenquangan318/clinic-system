import request from "supertest";
import { app } from "../../app";

const createDoctor = () => {
  return request(app).post("/api/doctor").set("Cookie", global.signin()).send({
    name: "Nguyên Quảng An",
    phone: "0123456789",
    department: "cấp cứu",
    avatar: "uploads/123",
  });
};

it("can fetch a list of Doctors", async () => {
  await createDoctor();
  await createDoctor();
  await createDoctor();

  const response = await request(app).get("/api/doctor").send().expect(200);

  expect(response.body.length).toEqual(3);
});
