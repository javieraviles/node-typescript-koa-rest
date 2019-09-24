import { CronJob } from 'cron';
import { config } from './config';
import controller = require('./controller');

const deleteTestUsersCronJob = new CronJob(config.deleteTestUsersCronExpression, () => {
    controller.user.deleteTestUsers();
});

export { deleteTestUsersCronJob };