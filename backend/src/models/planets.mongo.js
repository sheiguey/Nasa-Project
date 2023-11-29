const mongoose = require ('mongoose');

const planetsShema = new mongoose.Schema(
{
   keplerName:{type:String,required:true},
}
)

module.exports= mongoose.model('planet',planetsShema);