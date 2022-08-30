import { FrameToFrame, createEvent } from "../../../core/client/client.js";
import { segment } from "oicq";
import { render } from "../../../core/util/render.js";

export const rule = {
  where_source: {
    reg: "^#(.+)在(.+)?哪",
    priority: 800,
    describe: "查找资源",
  },
  where_help: {
    reg: "^#地图资源查询教程",
    priority: 800,
    describe: "查找资源",
  },
};

export async function where_source(e) {
  console.log(1);
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

export async function where_help(e) {
  FrameToFrame({
    _package: "where_resource",
    _handler: "where_resource_help",
    params: {
      event: await createEvent(e),
    },
    onData: async (error, response) => {
      if (error) {
        console.log(error.stack);
      } else {
        render("where_resource", "where_help", { data: JSON.parse(response.message) },"jpeg").then(img => {
          e.reply(img);
        });
      }
    },
  });
  return true;
}
