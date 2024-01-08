const express = require('express')
const app = express()
const {open} = express('sqlite')
const path = express('path');

const dbpath = path.join(__dirname, 'goodreads.db')

let db = null

const connectDBtoServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: express('sqlite3').Database,
    })
    console.log(db)
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
}

app.get('/books/', async (request, Response) => {
  const BookQuery = `SELECT * FROM book order by book_id;`
  const QureyRes = await db.all(BookQuery)
  Response.send(QureyRes)
})
app.listen(3000)
connectDBtoServer()
