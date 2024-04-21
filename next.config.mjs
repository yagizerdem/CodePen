import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
} from "next/constants.js";

export default (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        DBNAME: "testdatabase.db",
      },
    };
  }

  return {
    env: {
      DBNAME: "testdatabase.db",
    },
  };
};
