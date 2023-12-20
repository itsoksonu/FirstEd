import  express   from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";

const app = express();
const port = 3000;
const mongoURL = "#";

// Connection with mongodb localhost
mongoose.connect(mongoURL);


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async(req, res)=>{
    res.render("index.ejs");
});

// notes 
app.get('/Computer_Science_Engineering_Notes', async(req,res)=>{
    res.render('Computer Science & Engineering Notes.ejs')
})
app.get('/Electrical_Engineering_Notes', async(req,res)=>{
    res.render('Electrical Engineering Notes.ejs')
})
app.get('/Civil_Engineering_Notes', async(req,res)=>{
    res.render('Civil Engineering Notes.ejs')
})
app.get('/Mechanical_Engineering_Notes', async(req,res)=>{
    res.render('Mechanical Engineering Notes.ejs')
})
app.get('/Electronic_Communication_Engineering_Notes', async(req,res)=>{
    res.render('Electronics & Communication Engineering Notes.ejs')
})
app.get('/Information_Technology_Notes', async(req,res)=>{
    res.render('Information Technology Notes.ejs')
})
app.get('/Computer_Science_Engineering_Cyber_Security_Notes', async(req,res)=>{
    res.render('Computer Science & Engineering (Cyber Security) Notes.ejs')
})
app.get('/Electronics_Instrumentation_Engineering_Notes', async(req,res)=>{
    res.render('Electronics & Instrumentation Engineering Notes.ejs')
})
app.get('/Impotrant_Study_Links', async(req,res)=>{
    res.render('Impotrant Study Links.ejs')
})

// pervious year papers routes
app.get('/Computer_Science_Engineering', async(req,res)=>{
    res.render('Computer Science & Engineering.ejs')
})
app.get('/Electrical_Engineering', async(req,res)=>{
    res.render('Electrical Engineering.ejs')
})
app.get('/Civil_Engineering', async(req,res)=>{
    res.render('Civil Engineering.ejs')
})
app.get('/Mechanical_Engineering', async(req,res)=>{
    res.render('Mechanical Engineering.ejs')
})
app.get('/Electronic_Communication_Engineering', async(req,res)=>{
    res.render('Electronics & Communication Engineering.ejs')
})
app.get('/Information_Technology', async(req,res)=>{
    res.render('Information Technology.ejs')
})
app.get('/Computer_Science_Engineering_Cyber_Security', async(req,res)=>{
    res.render('Computer Science & Engineering (Cyber Security).ejs')
})
app.get('/Electronics_Instrumentation_Engineering', async(req,res)=>{
    res.render('Electronics & Instrumentation Engineering.ejs')
})

//about and contact routes
app.get('/about', async(req,res)=>{
    res.render('about.ejs')
})
app.get('/contact', async(req,res)=>{
    res.render('contact.ejs')
})

const {Schema} = mongoose;



const fileSchema = new Schema({
    name: {
        type: String
    },
    data: {
        type: Buffer
    },
    contentType: {
        type: String
    },
});
  
const File = mongoose.model('File', fileSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

app.post('/submit_file', upload.single('notesFile'),  async (req, res)=> {
    // console.log(req.file);
    try{
        const { originalname, buffer, mimetype } = req.file;
        const my_title = req.body.title
        const my_description = req.body.description

        const newFile = new File({
            name: originalname,
            data: buffer,
            contentType: mimetype,
        });

        await newFile.save();

        res.render('index.ejs', {message:"File uploaded successfully!"})
    }
    catch{
        res.redirect("/")
    }

});

app.get('/files/:id', async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).send('File not found');
    }

    res.setHeader('Content-Type', file.contentType);
    res.send(file.data);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
});
