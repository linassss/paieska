
const express = require('express');
const app = express();
var path = require('path');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/index.html', async function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  });

app.post('/', async function (req, res) {
    if (req.body.preke != '') {
        prekesPavadinimas = req.body.preke;

        const lemona = require('./lemona');
        const evita = require('./evita');
        const rcl = require('./rcl');

        prekesLemonoje = lemona.paieskaLemonoje(prekesPavadinimas);
        prekesEvitoje = evita.paieskaEvitoje(prekesPavadinimas);
        prekesRCL = rcl.paieskaRCL(prekesPavadinimas);

        Promise.all([prekesLemonoje, prekesEvitoje, prekesRCL]).then(function(prekes) {
            res.render(path.join(__dirname + '/index.ejs'), {lemonosPrekes: prekes[0], evitosPrekes: prekes[1], rclPrekes: prekes[2]})
          });

    ;
    } else {
        res.sendFile(path.join(__dirname + '/index.html'));
    };
  });

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);