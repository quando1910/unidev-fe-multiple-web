const { exec } = require('child_process');

var name='multiple-web-admin';
var path=`/var/www/${name}/`;

var user = 'root'
var server_ip= '178.128.126.186'

exec('npm run build', (e, stdout, stderr) => {
  if (e) {
    console.log(e);
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
  console.log('Finish BUILDING!!!!');
  exec(`scp -r ./dist/. ${user}@${server_ip}:${path}`, (e, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    console.log('Finish DEPLOY!!!!');
  });
});

