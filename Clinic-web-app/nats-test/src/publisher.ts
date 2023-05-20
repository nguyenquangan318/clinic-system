import { DoctorCreatedPublisher } from "./events/doctor-created-publisher";
import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("clinic", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new DoctorCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      name: "Nguyễn Quảng An",
      phone: "0123456789",
      department: "cấp cứu",
      avatar: "uploads/123",
    });
  } catch (err) {
    console.log(err);
  }
  // const data = JSON.stringify({
  //   id: "123",
  //   name: "Nguyễn Quảng An",
  //   phone: "0123456789",
  //   department: "cấp cứu",
  //   avatar: "uploads/123",
  // });

  // stan.publish("doctor:created", data, () => {
  //   console.log("Event published");
  // });
});
