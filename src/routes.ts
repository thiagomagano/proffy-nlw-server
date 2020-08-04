import { Router } from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = Router();

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string,
}

routes.get('/', (req, res) => res.json({ message: "Tudo ok" }))

routes.post('/classes', async (req, res) => {
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule,
  } = req.body;

  const trx = await db.transaction();

  try {
    const insertedUsersIds = await trx('users').insert({
      name,
      avatar,
      whatsapp,
      bio,
    });

    const user_id = insertedUsersIds[0];

    const insertedClassesIds = await trx('classes').insert({
      subject,
      cost,
      user_id,
    });

    const class_id = insertedClassesIds[0];

    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
      return {
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to)
      }
    });

    await trx('class_schedule').insert(classSchedule);

    await trx.commit();

    res.status(201).json({ message: 'inserido com sucesso' });

  } catch (err) {
    return res.status(400).json({
      error: "unxpected error while creating new class"
    })
  }
});

export default routes;