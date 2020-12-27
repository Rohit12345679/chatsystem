const express=require("express");
const app=express();
const path=require("path");
const http=require('http').createServer(app);
const PORT=process.env.PORT || 3000;
const staticPath=path.join(__dirname,"/public");
app.use(express.static(staticPath));

http.listen(PORT, ()=>{
    console.log(`listing the port ${PORT}`);
});
//app.get("/",(req,res)=>{
  // res.send("hello from the express");
//});
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
   res.sendFile((_dirname+'/index.html'));
});
const io=require('socket.io')(http);

io.on('connection',(socket)=>{

  console.log('connected..');
  socket.on('message',(msg)=>{
    socket.broadcast.emit('message',msg);
  });
});
// show message on server
