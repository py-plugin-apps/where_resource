import { FrameToFrame, createEvent } from "../../../core/client/client.js";
import { segment } from "oicq";

export const rule = {
  where_source: {
    reg: "^#(.+)在(.+)?哪",
    priority: 800,
    describe: "查找资源",
  },
};

export async function where_source(e) {
  FrameToFrame({
    _package: "where_resource",
    _handler: "where_resource_is",
    params: {
      event: await createEvent(e),
    },
    onData: (error, response) => {
      if (error) {
        console.log(error.stack);
      } else {
        if (response.message) {
          e.reply(response.message);
        } else {
          e.reply(segment.image(response.image));
        }
      }
    },
  });
  return true;
}
