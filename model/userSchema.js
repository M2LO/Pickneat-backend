const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },

    email:{
        type: String,
        require: true
    },

    password:{
        type: String,
        require: true
    },

    cpassword:{
        type: String,
        require: true
    },

    date: {
        type: Date,
        default:Date.now
    },

    tokens: [
        {
            token:{
                type:String,
                require:true
            }
        }
    ]
})

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err)
    {
        console.log(err)
    } 
}


userSchema.pre('save', async function(next) {
    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next();
})

const User = mongoose.model('USER',userSchema);

module.exports = User;