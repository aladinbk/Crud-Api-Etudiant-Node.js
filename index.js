const express=require('express')
const mongoose=require('mongoose')
const app = express()
const Etudiant = require('./models/etudiant')
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/etudiants',async (req,res)=>{
    try{
    await  Etudiant.find({})
    .then(result=>{
    res.send(result)
    })
    }
    catch(err){
    console.log(err)    
    }
    
})

app.post('/saveEtudiant',async(req,res)=>{
    try{
    let new_etudiant = new Etudiant({
        cin: req.body.cin,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email
    });
    await new_etudiant.save();
    res.send('POST effecutée avec Succées');
    }
    catch(err){
        console.log(err);
    }
    
})
app.put('/updateEtudiant/:id',async(req,res)=>{
    try{
        await Etudiant.findOneAndUpdate({_id:req.params.id},{
            email : req.body.email
        })
        res.send("Modification avec succées !");
    }
    catch (err){
        console.log(err);
    }
})

app.delete('/deleteEtudiant/:id',async(req,res)=>{
    try{
        await Etudiant.findOneAndDelete({id:req.params.id})
        res.send("Suppression avec succées !");
    }
    catch (err){
        console.log(err);
    }
})
mongoose.connect('mongodb+srv://alaeddine:alaeddine@cluster0.kajyv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',(err,done)=>{
    if(err){
        console.log(err);
    }
    if(done){
        console.log("Base de données connectée");
    }
})

app.listen(3000,()=>{
    console.log("serveur en marche");
})
