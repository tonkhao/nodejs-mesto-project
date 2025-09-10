const dotenv = require('dotenv');

dotenv.config({ path: './.env.deploy' });

const {
  DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DEPLOY_REPOSITORY,
} = process.env;
const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
} = process.env;

module.exports = {
  apps: [
    {
      name: 'Mesto Backend',
      script: './dist/app.js',
      env_production: {
        NODE_ENV: 'production',
        DATABASE_HOST,
        DATABASE_USER,
        DATABASE_PASSWORD,
      },
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPOSITORY,
      path: DEPLOY_PATH,
      'pre-deploy-local': `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH}`,
      'post-deploy': 'pwd && npm ci && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
