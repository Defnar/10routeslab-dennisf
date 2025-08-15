const express = require("express");
const app = express();
const port = 3000;

//api key
//api key = myapikey
app.use("/api", (req, res, next) => {
  if (req.headers["api_key"] !== "myapikey")
    res.status(401).json({ error: "Unauthorized: API Key required" });
  else next();
});

app.get("/api", (req, res) => {
  res.send("Welcome to my api");
});

//api dashboard
app.get("/api/dashboard", (req, res) => {
  res.send("This the admin dashboard");
});

//api profile
app.get("/api/profile", (req, res) => {
  res.send("This is the api profile screen");
});

//api jigglypuff
app.get("/jigglypuff", (req, res) => {
  res.send(
    "You expected jigglypuff, but really the best pokemon is Gyarados.  He's always in my party, every game"
  );
});

//greetings name
app.get("/greetings/:name", (req, res) => {
  const userName = req.params.name;
  res.send(`Greetings, ${userName}`);
});

//8ball page
app.get("/8ball", (req, res) => {
  const ballAnswers = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes, definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful.",
  ];

  const index = Math.floor(Math.random() * (ballAnswers.length + 1));
  res.send(ballAnswers[index]);
});

//boss
app.get("/boss", (req, res, next) => {
    req.requestTime = Date.now();
    let accessGranted;
    if (req.headers["boss"] !== "boss") { res.status(401).json({error: "Unauthorized: bosses only"})
        accessGranted = false;
    }
    else {
        next()
        accessGranted=true;
    };
    console.log(`${new Date(req.requestTime).toISOString()}: METHOD:${req.method}, ROUTE:${req.path}, ACCESS ${accessGranted? "ALLOWED" : "DENIED"}`)
})
//boss 
app.get("/boss", (req, res) => {
    res.send("It seems you ended up here by accident, try boss/dashboard, boss/profile boss/destruction ")
})

//boss dashboard
app.get("/boss/dashboard", (req, res) => {
    res.send("a secret dashboard only for bosses")
})

//boss profile
app.get("/boss/profile", (req, res) => {
    res.send("only the most amazing boss")
})


//boos destruction
app.get("/boss/destruction", (req, res) => {
    res.send("Commencing destruction...")
})

app.listen(port, console.log(`Server is running at http://localhost:${port}`))