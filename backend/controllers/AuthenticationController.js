const User = require('../models/userModel');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const registerUser = async (req,res) => {
    const { name, email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })  // Controlla se l'utente esiste già tramite
        if(existingUser){
            return res.status(400).json({ msg: 'utente già registrato'})
        }
        // si potrebbe inserire qualcosa per crittografare la password
        const user = new User({ name, email, password})  // se l'utente non esisite, cea un nuovo User e poi lo salva
        await user.save()
        res.status(200).json({msg:'Registrazione avvenuta con successo'})
    } catch (e) {
        res.status(500).json({ msg:'error', error: e})
    }
}

const login = async (req, res) => {
    const {email, password } = req.body

    try{
        const user = await User.findOne({ email })
          // va a cercare l'utente nel database e se non lo trova restituisce un messaggio di errore
        if(!user){  
            return res.status(400).json({msg:'email o password errati'})
        }

        const isMatch = await bcrypt.compare(password, user.password)  // confronta la password fornita con quella che si trova nel database
        
        if(!isMatch) {
            return res.status(400).json({msg: 'email o password errati'})
        }
        const token = jwt.sign({id: user._id}, 'key', {expiresIn : '1h'}) // Se la password è corretta, genera un JWT token valido per 1 ora
        res.status(200).json({
            msg : 'Login effettuato con successo',
            user: {id:user._id, name:user.name, email:user.email },
            token,
        })
    } catch (e){
        res.status(500).json({msg :'error',error:e })
    }
}

const logout = (req, res ) => {
    res.clearCookie('token');
    res.status(200).json({msg:'logout effettuato con successo', clearToken:true})
}

const getUser = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({msg: "Errore nel recupero dell'utente", error})
    }
};

module.exports = {registerUser,logout,login,getUser};