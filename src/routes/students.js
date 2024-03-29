// routes for students

const router = require('express').Router()
const studentDB = require('../db/students')

let presenting_student = null

router.post('/students', function(req, res) {
    studentDB.createStudents([req.body]).then(r => {
        res.send(r, 201)
    }).catch(err => res.json({err: err}, 500))
});

router.get('/students', async function (req, res) {
    const data = await studentDB.getStudents()
    res.status(200).send(data)
});

router.put('/students/:id', function(req, res) {
    studentDB.putStudent((req.params.id), req.body).then(r => res.status(200).send(''))
        .catch(err => res.status(500).send(err))
});

router.get('/students/presenting', function(req, res) {
    res.status(200).send(presenting_student)
})

router.post('/students/presenting', function(req, res) {
    console.log('posting presenting student', req.body)
    presenting_student = req.body.id ? req.body : null
    res.status(200).send({})
});

module.exports = router;
