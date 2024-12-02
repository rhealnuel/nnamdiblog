const nnamdiUser = require('../model/nnamdiUser')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')



router.post('/create_user', async (req, res) => {

    const { username, email, password } = req.body;

    try {
     const exist = await nnamdiUser.findOne({username})  
     
     if (exist) {
        return res.status(403).json({ error: 'User already exist'});
        }
        
    const emailExist = await nnamdiUser.findOne({email}) 
    if(emailExist){
       return res.status(403).json({message: "email already exist"})
    }



      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Save the user to the database
      const newUser = await nnamdiUser.create({
        username,
        email,
        password: hashedPassword,
      });
  
      return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        return res.status(500).json({ error: 'Error registering user', details: error.message });
    }
})


router.post('/login', async(req, res) => {
   const {email, password} = req.body;

   try {
        const userExist = await nnamdiUser.findOne({email})
        if (!userExist) {
          return  res.status(404).json({message: "user does not exist"})
        }


        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if(!isPasswordValid) {
          return  res.status(403).json({message: "email or password does not match"})

        }else{
          return  res.status(200).json({message: "logged in succesfully", userExist})
        }

   } catch (error) {
    return res.status(500).json({error: "error occured", errorDetail: error.message})
   }
})


module.exports = router;