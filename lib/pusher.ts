import Pusher from "pusher";
const pusher = new Pusher({
  appId: "1798624",
  key: "f13241349d4f989608e3",
  secret: "a58798b6306509fbed0f",
  cluster: "sa1",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

export default pusher;