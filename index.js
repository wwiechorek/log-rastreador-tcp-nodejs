var net = require('net');
var mysql = require('mysql');

var pool = mysql.createPool({
   connectionLimit: 10,
   host: "HOST NAME",
   user: "USER NAME",
   password: "PASSOWRD",
   database: "DATABASE"
});

const imeis = [
   "864180034513981"
];

net.createServer(function (socket) {
   // Identify this client
   socket.name = socket.remoteAddress + ":" + socket.remotePort
   socket.on('data', function (data) {

      //salva log no banco de dados
      pool.getConnection(function(err, conn) {
         if (err) throw err;
         var sql = "INSERT INTO message_history (client, message, date) VALUES ('" + socket.name + "', '" + sdata + "', now())";
         conn.query(sql, function (err, result) {
            if (err) throw err;
         });
      });


      let sdata = data.toString()
      let d = sdata.split(',')

      //authenticação
      if(d.length === 3) {
         if(d[0] === '##') {
            socket.write("LOAD");

            let imei = d[1].replace('imei:', '');
            socket.imei = imei;

            //configura para receber localização a cada 30s
            // socket.write(`**,imei:${socket.imei},C,30s`);

            //configura para alarme de movimento
            // socket.write(`**,imei:${imei},G`)
         }
      }

      //verifica se autenticado
      if(!socket.imei || imeis.indexOf(socket.imei) < 0) {
         socket.destroy();
         return;
      }

      //manter logado
      if(d.length === 1) {
         socket.write("ON");
      }

      // sempre que receber tracker
      if(d[1] && d[1] === 'tracker') {
         //configura para receber localização a cada 30s
         socket.write(`**,imei:${socket.imei},C,30s`)
      }

   });

   // Cliente fechou a conexão
   socket.on('end', function () {
      console.log(socket.name + " ::: " + " left the server.\n");
   });

}).listen(5000);
// Put a friendly message on the terminal of the server.
console.log("Server running at port 5000\n");
