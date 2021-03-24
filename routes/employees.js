const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const employee = require('../models/employee');
const Company = require('../models/company');
const factor = require('../models/factor');



router.get('/employeePages:id', function (req, res) {
    employee.find({}, (err, companies) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        // res.json(companies);
        res.render('employee', {
            companies
        });
    });
})



// ? -------------------------------------- < ready company > ---------------------

router.get('/all', (req, res) => {
    employee.find({}, (err, employies) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        res.json(employies);
    });
});
router.get('/manager', (req, res) => {
    Company.find({}, (err, company) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        employee.find({
            manager: true
        }).populate("company", {
            name: 1
        }).exec((err, employee) => {
            if (err) return res.status(500).json({
                msg: "Server Error :)",
                err: err.msg
            });
            res.json(employee);
        })
    })

});
router.get('/allEmployee:id', (req, res) => {
    Company.find({}, (err, company) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        employee.find({
            company: req.params.id
        }).populate("company", {
            name: 1
        }).exec((err, employee) => {
            if (err) return res.status(500).json({
                msg: "Server Error :)",
                err: err.msg
            });
            res.json(employee);
        })
    })

});

router.get('/:id', (req, res) => {
    let arr = req.params.id.split('-');

    let recentlyYear = new Date().getFullYear() - arr[0];
    let oldYear = new Date().getFullYear() - arr[1];

    console.log(arr);
    console.log(recentlyYear, oldYear);
    employee.find({
        $and: [{
            "birthday": {
                $lt: `${recentlyYear}`
            }
        }, {
            "birthday": {
                $gt: `${oldYear}`
            }
        }]
    }, {
        "_id": 0
    }, (err, employee) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        res.json(employee);
    })

});

// ? -------------------------------------- < create company > ---------------------
router.post('/', (req, res) => {

    if (!req.body.company || !req.body.first_name) {
        return res.status(400).json({
            msg: "Bad Request :=)"
        })
    }

    let Manager = JSON.parse(req.body.manager);

    // ! manager validation
    if (Manager === true) {


        employee.findOne({
            "company": req.body.company,
            "manager": true
        }, (err, employee_id) => {
            if (err) return res.status(500).json({
                msg: "Server Error :-)",
                err: err.message
            });
            console.log("=====> ", employee_id);
            if (employee_id) {
                return res.status(400).json({
                    msg: "Bad Request :===)"
                })
            }
            // ! company validation

            Company.findById(req.body.company, (err, company) => {
                if (err) return res.status(500).json({
                    msg: "Server Error :)",
                    err: err.message
                });
                if (!company) return res.status(404).json({
                    msg: "Not Found :)"
                })
                console.log(Manager);
                console.log("-------------------------------------------------------------");
                console.log(req.body);



                const newEmployee = new employee({
                    _id: new mongoose.Types.ObjectId,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    national_number: req.body.national_number,
                    gender: req.body.gender,
                    manager: true,
                    birthday: req.body.birthday,
                    company: req.body.company
                });

                const newFactory = new factor({
                    employee: newEmployee._id,
                    company: req.body.company
                });

                Company.findOneAndUpdate({
                    _id: req.body.company
                }, {
                    $set: {
                        manager: newEmployee._id
                    }
                }, {
                    useFindAndModify: false
                }, (err, company) => {
                    console.log(err);
                    if (err) return res.status(500).json({
                        msg: "Server Error :1)",
                        err: err.msg
                    });
                    // res.json(company);
                })

                newFactory.save((err, factor) => {
                    if (err) return res.status(500).json({
                        msg: "Server Error :2)",
                        err: err.message
                    });
                    // res.json(product)
                })

                newEmployee.save((err, employee) => {
                    if (err) return res.status(500).json({
                        msg: "Server Error :3)",
                        err: err.message
                    });
                    res.json(employee)
                })
            });
        })

    }
    if (Manager === false) {
        const newEmployee = new employee({
            _id: new mongoose.Types.ObjectId,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            national_number: req.body.national_number,
            gender: req.body.gender,
            manager: false,
            birthday: req.body.birthday,
            company: req.body.company
        });

        const newFactory = new factor({
            employee: newEmployee._id,
            company: req.body.company
        });


        newFactory.save((err, factor) => {
            if (err) return res.status(500).json({
                msg: "Server Error :)",
                err: err.message
            });
            // res.json(product)
        })

        newEmployee.save((err, employee) => {
            if (err) return res.status(500).json({
                msg: "Server Error :)",
                err: err.message
            });
            res.json(employee)
        })
    }






});
// ? -------------------------------------- < update company > ---------------------

router.put('/:id', (req, res) => {
    employee.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        national_number: req.body.national_number,
        gender: req.body.gender,
        manager: req.body.manager,
        birthday: req.body.birthday
    }, (err, employee) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        res.json(employee);
    })
});
// ? -------------------------------------- < delete company > ---------------------
router.delete('/:id', (req, res) => {
    factor.deleteMany({
        employee: req.params.id
    }, (err, employee) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        // res.json(employee);
    })

    employee.findOneAndDelete({
        _id: req.params.id
    }, (err, employee) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        res.json(employee);
    })
});



module.exports = router;