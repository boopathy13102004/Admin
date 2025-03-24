// seedFeesData.js
const mongoose = require('mongoose');
const { Fees } = require('./mongo');

const mongoURI = "mongodb://divansan05:Divansan0076@loginformpractice-shard-00-00.vlg9n.mongodb.net:27017,loginformpractice-shard-00-01.vlg9n.mongodb.net:27017,loginformpractice-shard-00-02.vlg9n.mongodb.net:27017/mydatabase?replicaSet=atlas-nbf2o3-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=LoginFormPractice";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB for seeding...');
        const count = await Fees.countDocuments();
        if (count === 0) {
            const defaultFeesData = new Fees({
                tuition: [
                    { branch: "COMPUTER SCIENCE AND ENGINEERING", fg: "30000", nonFg: "55000", gq: "55000", mq: "35000" },
                    { branch: "ELECTRONICS AND COMMUNICATION ENGINEERING", fg: "20000", nonFg: "45000", gq: "45000", mq: "45000" },
                    { branch: "MECHANICAL ENGINEERING", fg: "15000", nonFg: "40000", gq: "40000", mq: "40000" },
                    { branch: "MECHANICAL AND MECHOTRONICS ENGINEERING", fg: "15000", nonFg: "40000", gq: "40000", mq: "40000" },
                    { branch: "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE", fg: "40000", nonFg: "65000", gq: "65000", mq: "65000" },
                    { branch: "INFORMATION TECHNOLOGY", fg: "30000", nonFg: "55000", gq: "55000", mq: "55000" },
                    { branch: "AGRICULTURAL ENGINEERING", fg: "15000", nonFg: "40000", gq: "40000", mq: "40000" }
                ],
                hostel: [
                    { branch: "COMPUTER SCIENCE AND ENGINEERING", bcMbc: "50000", scSt: "45000" },
                    { branch: "ELECTRONICS AND COMMUNICATION ENGINEERING", bcMbc: "50000", scSt: "35000" },
                    { branch: "MECHANICAL ENGINEERING", bcMbc: "50000", scSt: "30000" },
                    { branch: "MECHANICAL AND MECHOTRONICS ENGINEERING", bcMbc: "50000", scSt: "30000" },
                    { branch: "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE", bcMbc: "50000", scSt: "35000" },
                    { branch: "INFORMATION TECHNOLOGY", bcMbc: "50000", scSt: "45000" },
                    { branch: "AGRICULTURAL ENGINEERING", bcMbc: "50000", scSt: "30000" }
                ]
            });
            await defaultFeesData.save();
            console.log('Default fees data inserted successfully!');
        } else {
            console.log('Fees collection is not empty.');
        }
    })
    .catch((err) => console.error('Error seeding database:', err))
    .finally(() => mongoose.disconnect());