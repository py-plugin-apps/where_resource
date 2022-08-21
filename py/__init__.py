import re
from .util import ResourceMap, Error
from core import Handler, Response, Request

package = "where_resource"


@Handler.FrameToFrame
async def where_resource_is(request: Request) -> Response:
    res = re.search(r'(#(?P<name>.+)?在(?P<map_name>.+)?哪)', request.event.msg).groupdict()
    if not res["name"]:
        return Response("请指定物品！")

    if res["map_name"] in ["渊下宫"]:
        map_id = "7"
    elif res["map_name"] in ["层岩", "层岩巨渊"]:
        map_id = "9"
    elif res["map_name"] in ["海岛", "金苹果", "金苹果群岛"]:
        map_id = "12"
    else:
        map_id = "2"

    try:
        res = await ResourceMap.draw(res["name"], map_id)

        return Response(image=res)
    except Error as e:
        return Response(str(e))
