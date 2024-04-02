
import express from "express"; 
import pg from "pg";

const app = express(); 
const PORT = 3001;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "#Sunset123",
    port: 5432,
  });


  // Connect the database to the Server
 db.connect((err) => { 
  if(err){
    console.log(err)
  } else { 
    console.log("The connection is successful")
  }
});


// This is for the Get Request of 
const getCapitals = async ()  => { 
    try {
        const capitals = await db.query("SELECT * FROM capitals"); 
        if (!capitals.rows) {
            throw new Error("No data returned from query");
        }
        const quiz = capitals.rows.map(row => row.capital);
        return quiz;
    } catch (error) {
        console.error("Error fetching capitals:", error);
        return [];
    }

}

app.get("/", async (req, res) => { 
    try {
        const capitals = await getCapitals();
        const html = `<html><head><title>Capitals</title></head><body><h1>Capitals</h1><ul>${capitals.map(capital => `<li>${capital}</li>`).join('')}</ul></body></html>`;
        res.send(html);
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
    }
})



app.listen(PORT, (req, res) => { 

    console.log("Listening on port", PORT ); 
})