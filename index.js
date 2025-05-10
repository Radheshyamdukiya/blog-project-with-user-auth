const express = require("express");
const app = express();
const session = require('express-session'); 

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const mongoose = require("mongoose");
async function main() {
    try {

        await mongoose.connect("mongodb://localhost:27017/testdb", {

        });
    }
    catch (err) {
        console.log(err);
    }
}
main()
    .then((res) => {
        console.log("succesd")
    })
    .catch((rej) => {
        console.log("rej");
    })


const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const port = 8030;

const data = new mongoose.Schema({
    name: String,
    emailid: String,
    password: String,
});
const user = mongoose.models.user || mongoose.model("user", data);

const post=new mongoose.Schema({
    name:"string",
    title:"string",
    details:"string",
})
const blog = mongoose.models.blog || mongoose.model("blog", post);

app.get("/register", (req, res) => {
    res.render("register");
})
app.post("/register", async (req, res) => {

    try {
        let { username, email, password } = req.body;
        const varfied = await user.findOne({ emailid: email });
        if (!varfied) {
            const user1 = new user({
                name: username,
                emailid: email,
                password: password,
            })
            user1.save()
                .then(() => {
                    console.log("data is saved succesfully");
                })
                .catch((err) => {
                    console.log("data is not saved");
                })
            res.redirect("/login");
        }
        else {
            res.send("you canot store data because email is alrady exist");
        }
    }
    catch (err) {
        console.log(err);
    }
})

app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/login", async (req, res) => {

    try {
        let { email, password } = req.body;


        let user1 = await user.findOne({ emailid: email, password: password });

        if (user1) { 
            
            req.session.user = user1;
            res.render("main", { user: user1}) 
        
        }
        else {
            res.send("password or email wrong");

        } 
    }
    catch (err) {
        console.log(err);
    }
})


app.get("/posts/new",async(req,res)=>{
  res.render("posts")
})
app.post("/posts/new",async(req,res)=>{
    
    try{
        let {title,details}=req.body;
        const username = req.session.user ? req.session.user.name : "Anonymous";
   const data= await new blog(
    { name:username,
       title:title,
       details:details,
    }
  )
  await data.save()
  .then((resul)=>{
    console.log(resul);
    res.send("data saved");
  })
  .catch((err)=>{
    console.log(err);
  })
}
catch(err)
{
    console.log(err);
}
})
app.get("/showposts",async(req,res)=>{
     try
     {
        const allpost= await blog.find();
        res.render("showposts",{blogs:allpost});
     }
     catch(err)
     {
        console.log(err);
     }
})


app.get("/myposts",async(req,res)=>{
   try
   {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    const username = req.session.user.name;
    let userpost= await blog.find({name:username});
    res.render("myposts", { blogs: userpost, user: username });

   }
   catch(err)
   {
    console.log(err);
   }

})


app.get("/posts/edit/:id",async(req,res)=>{
    let{id}=req.params;
    let user= await blog.findById(id);
    res.render("edit",{user});
})
app.patch("/posts/edit/:id",async(req,res)=>{
    try{
   const {id}=req.params;
   const {title,details}=req.body;
   let update= await blog.findByIdAndUpdate(id,
    {
        title:title,
        details:details,
    }
   )

   if(!update)
   {
    res.send("not update");
   }
   else
   {
    console.log("updated succesfully");
    res.redirect("/myposts")
   }
}
catch(err)
{
    console.log(err);
}
    
}) 


app.delete('/posts/delete/:id', async (req, res) => {
    const { id } = req.params;
    await blog.findByIdAndDelete(id);
    res.redirect('/myposts');
});

 
 







app.listen(port, () => {
    console.log("port listened successfully on port " + port);
});
