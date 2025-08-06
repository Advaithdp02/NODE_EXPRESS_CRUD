const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// DB Connection
mongoose.connect('mongodb://localhost:27017/studentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ Connection Failed:', err));

// Routes
app.get('/', async (req, res) => {
  const students = await Student.find();
  res.render('index', { students });
});
app.get("/sort", async (req, res) => {
  const students = await Student.find().sort({ age:1 });
  const halfstudent= students.slice( Math.ceil(students.length / 2,students.length));
  
  const finalStudent=[...students.slice(0, Math.ceil(students.length / 2)), ...halfstudent.sort((a, b) => b.age - a.age)];
  res.render('index', { students: finalStudent});
});
app.get('/filter/:dept',async (req,res)=>{
  const students=await Student.find({course:req.params.dept});
  res.render('index', { students });
})

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/create', async (req, res) => {
  await Student.create(req.body);
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render('edit', { student });
});

app.post('/update/:id', async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

