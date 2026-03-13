import { CronJob } from 'cron';

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {

	static createJob( cronTipe: CronTime, onTick : OnTick){
		const job = new CronJob(cronTipe, onTick);

		job.start();

		return job;

	}


}