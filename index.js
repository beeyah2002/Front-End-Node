const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const base_url = 'http://node51706-beeyah.proen.app.ruk-com.cloud'; // Assuming your first code listens on port 7000
// const base_url = 'http://localhost:3000';
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


app.use(express.static(__dirname + '/public'));

app.get('/Bands', async (req, res) => {
    try{
        const response = await axios.get(base_url + '/Band');
        res.render('Bands', {  Bands: response.data, });
    } catch (err) {
        console.log(err);
        res.status(500).send('err');
    }
});

app.get("/Band/:ID", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/Band/' + req.params.ID);
        res.render('Band', { Band: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/createBand", (req, res) => {
    
    res.render('createBand');
});

app.post("/createBand", async (req, res) => {
    try {
        const data = { Name: req.body.Name, Genre: req.body.Genre,  FormationYear: req.body.FormationYear, Member : req.body.Member, Pic: req.body.Pic };
        await axios.post(base_url + '/Band', data);
        res.redirect("/Bands"); 
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/updateband/:ID", async (req, res) => {
    try {
        const response = await axios.get(
            base_url + '/Band/' + req.params.ID);
            res.render('updateband', { Band: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.post("/updateband/:ID", async (req, res) => {
    try {
        const data = { Name: req.body.Name, Genre: req.body.Genre,  FormationYear: req.body.FormationYear, Member : req.body.Member, Pic: req.body.Pic };
        await axios.put(base_url + '/Band/' + req.params.ID, data);
        res.redirect("/Bands");
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/deleteband/:ID", async (req, res) => {
    try {
        await axios.delete(base_url + '/Band/' + req.params.ID);
            res.redirect("/Bands");
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});







app.get('/Albums', async (req, res) => {
    try{
        const response = await axios.get(base_url + '/Album');
        res.render('Albums', { Albums: response.data });
    } catch (err) {
        console.log(err);
        res.status(500).send('err');
    }
});

app.get("/Album/:ID", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/Album/' + req.params.ID);
        res.render('Album', { Album: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/createalbum", (req, res) => {
    res.render('createalbum');
});

app.post("/createalbum", async (req, res) => {
    try {
        const data = { Albumname: req.body.Albumname, Year: req.body.Year, Song: req.body.Song, Pic: req.body.Pic };
        await axios.post(base_url + '/Album', data);
        res.redirect("/Albums"); 
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/updatealbum/:ID", async (req, res) => {
    try {
        const response = await axios.get(
            base_url + '/Album/' + req.params.ID);
            res.render('updatealbum', { Album: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.post("/updatealbum/:ID", async (req, res) => {
    try {
        const data = { Albumname: req.body.Albumname, Year: req.body.Year, Song: req.body.Song, Pic: req.body.Pic };
        await axios.put(base_url + '/Album/' + req.params.ID, data);
        res.redirect("/Albums");
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/deletealbum/:ID", async (req, res) => {
    try {
        await axios.delete(base_url + '/Album/' + req.params.ID);
            res.redirect("/Albums");
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});



app.get('/', async (req, res) => {
    try{
        const response1 = await axios.get(base_url + '/Bandalbum');
        const response2 = await axios.get(base_url + '/Band');
        const response3 = await axios.get(base_url + '/Album');
       
        res.render('Bandalbums', {  
            Bandalbums: response1.data,
            Band: response2.data,
            Album: response3.data
            
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('err');
    }
});

app.get("/Bandalbum/:ID", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/Bandalbum/' + req.params.ID);
        res.render('Bandalbum', { Bandalbum: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/createbandalbum", (req, res) => {
    res.render('createbandalbum');
});

app.post("/createbandalbum", async (req, res) => {
    try {
        const data = {  bandID: req.body.bandID, albumID: req.body.albumID };
        await axios.post(base_url + '/Bandalbum', data);
        res.redirect("/"); 
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/updatebandalbum/:ID", async (req, res) => {
    try {
        const response = await axios.get(
            base_url + '/Bandalbum/' + req.params.ID);
            res.render('updatebandalbum', { Bandalbum: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.post("/updatebandalbum/:ID", async (req, res) => {
    try {
        const data = { bandID: req.body.bandID, albumID: req.body.albumID };
        await axios.put(base_url + '/Bandalbum/' + req.params.ID, data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});


app.get("/deletebandalbum/:ID", async (req, res) => {
    try {
        await axios.delete(base_url + '/Bandalbum/' + req.params.ID);
            res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});








app.listen(8080, () => {
    console.log('Listening on port 8080');
});