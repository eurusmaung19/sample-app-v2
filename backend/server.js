const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const app = express()

app.use(cors())
app.use(express.json())

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432
})

async function initDB(){
 try{
  await pool.query(`
   CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name TEXT
   )
  `)
  console.log("Database ready")
 }catch(err){
  console.log("Waiting for database...")
  setTimeout(initDB,5000)
 }
}

initDB()

app.get("/api/users", async(req,res)=>{
 const result = await pool.query("SELECT * FROM users")
 res.json(result.rows)
})

app.post("/api/users", async(req,res)=>{
 const {name} = req.body
 await pool.query("INSERT INTO users(name) VALUES($1)",[name])
 res.json({message:"User added"})
})

app.listen(3000,()=>{
 console.log("Backend running")
})