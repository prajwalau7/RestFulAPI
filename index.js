const express = require("express");
const app = express();
const Joi = require("joi");
const port = process.env.PORT || 5000;

app.use(express.json());

const data = [
  { id: 1, name: "Abcd", number: "1234567890", email: "a@gmail.com" },
  { id: 2, name: "Bcde", number: "2345678901", email: "b@gmail.com" },
  { id: 3, name: "Cdef", number: "3456789012", email: "c@gmail.com" },
  { id: 4, name: "Defg", number: "4567890123", email: "d@gmail.com" },
  { id: 5, name: "Efgh", number: "5678901234", email: "e@gmail.com" },
  { id: 6, name: "Fghi", number: "6789012345", email: "f@gmail.com" },
  { id: 7, name: "Ghij", number: "7890123456", email: "g@gmail.com" },
  { id: 8, name: "Hijk", number: "8901234567", email: "h@gmail.com" },
  { id: 9, name: "Ijkl", number: "9012345678", email: "i@gmail.com" },
  { id: 10, name: "Jklm", number: "1234567891", email: "j@gmail.com" },
  { id: 11, name: "Klmn", number: "2345678910", email: "k@gmail.com" },
  { id: 12, name: "Lmno", number: "12345678910", email: "l@gmail.com" },
  { id: 13, name: "Mnop", number: "12345678920", email: "m@gmail.com" },
  { id: 14, name: "Nopq", number: "12345678930", email: "n@gmail.com" },
  { id: 15, name: "Opqr", number: "12345678940", email: "o@gmail.com" },
];

app.get("/employee/details/data", (req, res) => {
  res.send(data);
});

app.get("/employee/details/data/:id", (req, res) => {
  const idCheck = data.find((i) => i.id === parseInt(req.params.id));
  if (!idCheck) {
    res.status(404).send("No data available for this ID");
  }
  res.send(idCheck);
});

app.post("/employee/details/data", (req, res) => {
  const result = validationInput(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const insert = {
    id: data.length + 1,
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  };
  data.push(insert);
  res.send(insert);
});

//Validation
function validationInput(insert) {
  const schema = {
    name: Joi.string().min(3).required(),
    number: Joi.string().length(10).required(),
    email: Joi.string().email().required(),
  };

  return Joi.validate(insert, schema);
}

app.put("/employee/details/data/:id", (req, res) => {
  const insert = data.find((i) => i.id === parseInt(req.params.id));
  if (!insert) {
    res.status(404).send("No data available for this ID");
  }

  const result = validationInput(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  insert.name = req.body.name;
  insert.number = req.body.number;
  insert.email = req.body.email;

  res.send(insert);
});

app.delete("/employee/details/data/:id", (req, res) => {
  const insert = data.find((i) => i.id === parseInt(req.params.id));
  if (!insert) {
    res.status(404).send("No data available for this ID");
  }

  const index = data.indexOf(insert);
  data.splice(index, 1);
  res.send(insert);
});

app.get("/", (req, res) => {
  res.send("You are at the home page");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
