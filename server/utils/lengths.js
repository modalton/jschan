const lengths = {
  VARCHAR:45,
  TINY_TEXT:255,
  TEXT:65535
};

function test(length,string){
  if(!lengths.hasOwnProperty(length)) throw(new Error('Invalid Length'));

  //If null/undefined length won't overflow buffer. Falsy obj/arr values caught by other functionality!
  if(!string || string.length < lengths[length]) return true;
  return false;
}

module.exports = exports = {lengths,test};
