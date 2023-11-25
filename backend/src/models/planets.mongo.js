const mongoose = require ('mongoose');

const planetsShema = new mongoose.Schema(
{
   keplerName:{type:String,required:true},
}
)

module.exports= mongoose.Model('planet',planetsShema);