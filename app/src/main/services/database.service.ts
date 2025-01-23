import Database from 'better-sqlite3'
import path from 'path'
import { app } from 'electron'

export type Interaction = {
  interaction_id?: number
  interaction_type: string
  week_commencing: string
  hit_count: number
}

function connect() {
  let dbPath: string
  if (process.env.NODE_ENV === 'development') {
    dbPath = path.join(__dirname, '../../resources/database.db')
    console.log('DB PATH!', dbPath)
  } else {
    dbPath = path.join(app.getPath('userData'), 'database.db')
  }

  return new Database(dbPath)
}

export function insertInteraction(interaction: Interaction) {
  const db = connect()
  const query = db.prepare(
    `INSERT INTO interactions (interaction_type, week_commencing, hit_count)
    VALUES (@interaction_type, @week_commencing, @hit_count)
    `
  )
  return query.run(interaction)
}

export function createTable() {
  const db = connect()

  console.log('DB!', db)

  const query = db.prepare(
    `
      CREATE TABLE IF NOT EXISTS interactions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        interaction_type STRING,
        week_commencing STRING,
        hit_count INTEGER
      )
    `
  )

  query.run()
}

export function updateInteraction(interactionId: number, hitCount: number) {
  const db = connect()

  const query = db.prepare(
    `
        UPDATE interactions SET hit_count = ? WHERE id = ?;
    `
  )

  console.log(query.run(hitCount, interactionId))
}

export function getInteractionsForMonday(date: string) {
  const db = connect()

  const query = db.prepare(
    `
            SELECT * FROM interactions WHERE date(week_commencing) = ?;
        `
  )

  return query.all(date) as Interaction[]
}

export function getInteractionsForOtherDaysOfWeek(date: String) {
  const db = connect()

  const query = db.prepare(
    `
      SELECT * FROM interactions WHERE (julianday(?) - julianday(week_commencing)) < 7
    `
  )

  return query.all(date) as Interaction[]
}
