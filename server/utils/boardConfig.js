//Keeps some board settings that may affect middle ware down the route (ex. if board posts 'ids' or not)

//hard code value for rn
let boardConfig = (req,res,next)=>{
  res.locals.boardConfig = {
    tokenBoard:true
  };
  next();
};

module.exports = boardConfig;
