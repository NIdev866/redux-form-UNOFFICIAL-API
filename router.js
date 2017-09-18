//const passportService = require('./services/passport');
const jwt = require('jwt-simple');
const User = require('./models/user');
const config = require('./config');




function tokenForAdmin(AdminId) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: AdminId, iat: timestamp }, config.secret);
}
















const passport = require('passport');
const db = require('./db');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {



  app.get("/create-campaign/fetch-job-sectors", (req, res)=>{
    let allJobSectorTitles = new Promise((resolve, reject)=>{
      db.query(`SELECT sector_title FROM job_sectors`, function(err, allJobSectorTitles){
        if(allJobSectorTitles){
          resolve(allJobSectorTitles)
        }
      })
    })
    allJobSectorTitles.then((result)=>{
      let mapped = result.map((element)=>{
        return element.sector_title
      })
      res.send(mapped)
    })
  })

  app.post("/create-campaign/fetch-job-titles", (req, res)=>{
    let selectedJobSector = req.body
    res.send(selectedJobSector)
    let allJobTitles = new Promise((resolve, reject)=>{
      db.query(`SELECT sector_title FROM job_sectors`, function(err, allJobTitles){
        if(allJobTitles){
          resolve(allJobTitles)
        }
      })
    })
    allJobSectorTitles.then((result)=>{
      let mapped = result.map((element)=>{
        return element.sector_title
      })
      res.send(mapped)
    })
  })



  app.post('/signup', function(req, res, next) {

    const email = req.body.email;
    const password = req.body.password;
    
    if(!email || !password) {
      return res.status(422).send({ error: 'You must provide email and password' });
    }
    

    db.query(`SELECT * FROM admins WHERE email = '${email}'`, function(err, existingAdmin){
      if (err) { return next(err); }

      console.log(JSON.stringify(existingAdmin))
      
      if (existingAdmin) { 
        return res.send(existingAdmin)
        return res.status(422).send({ error: 'Email is in useeeee' });
      }
      res.send(existingAdmin)
/*      let newAdminId = ""
      
      db.query(`INSERT INTO admins (email, password) VALUES (${email}, ${password})`, function(err, result) {
        if (err) throw err;

        db.query(`SELECT admin_id FROM admins WHERE email=${email}`, function(err, admin){
          //newAdminId = admin
          console.log(admin)
        })




      })
      // Respond
      res.json({ token: tokenForAdmin(newAdminId) });*/
    });
  });
};
