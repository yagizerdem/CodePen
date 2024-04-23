import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
} from "next/constants.js";
import crypto from "crypto";

export default (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        DBNAME: "developmentdatabase.db",
        AUTH_SECRET: crypto.randomBytes(32).toString("hex"),
      },
    };
  }

  return {
    env: {
      DBNAME: "productiondatabase.db",
      AUTH_SECRET: crypto.randomBytes(32).toString("hex"),
    },
  };
};
