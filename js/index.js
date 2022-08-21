import { FrameToFrame, createEvent } from "../../../core/client/client.js";
import { segment } from "oicq";

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
  e.reply("发送 #[资源名]在[地图名]哪 获取资源坐标，默认七国地图。例如 #甜甜花在哪，#丘丘人在层岩哪")
}
