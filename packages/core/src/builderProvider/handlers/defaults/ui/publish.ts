import { Handler } from "@/builderProvider/types/type";
import { Publish, PublishData } from "@/types/publish";

export type PublishHandler = (uid: string, extra?: PublishData) => Promise<PublishData>;

export interface PublishHandlerData {
  publishHandler: PublishHandler;
  uid: string;
}

export const getPublish = (data: PublishHandlerData): Publish => {
  const { publishHandler, uid } = data;

  const handler: Handler<PublishData, string, PublishData> = async (res, rej, extra) => {
    try {
      const data = await publishHandler(uid, extra);
      res(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error publishing";
      rej(message);
    }
  };

  return { handler };
};
