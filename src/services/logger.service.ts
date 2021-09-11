import pino from 'pino';

const developmentPinoConfig = {
  enabled: true,
  prettyPrint: {
    levelFirst: true,
    ignore: 'hostname,pid',
  },
};

export const logger = pino(developmentPinoConfig);
