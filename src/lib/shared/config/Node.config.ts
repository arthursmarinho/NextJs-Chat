import {ConfigNodeModel} from "../models/ConfigNode.model";

export const NodeConfig = new ConfigNodeModel(
  process.env.NODE_ENV || "development"
);
