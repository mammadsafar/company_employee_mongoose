const express = require('express');
const router = express.Router();
const company = require('../models/company');
const employee = require('../models/employee');
const factor = require('../models/factor');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/', function (req, res) {
    company.find({}, (err, companies) => {
        if (err) return res.status(500).json({
            msg: "Server Error :22)",
            err: err.msg
        });
        // res.json(companies);
        res.render('companies', {
            companies
        });
    });
})
router.get('/employeesPage:id', function (req, res) {
    employee.find({company: req.params.id}, (err, employees) => {

        if (err) return res.status(500).json({
            msg: "Server Error :22)",
            err: err.msg
        });
        // res.json(companies);
        res.render('companiesInfo', {
            employees
        });
    });
})


// ? -------------------------------------- < ready company > ---------------------
router.get('/all', (req, res) => {
    company.find({}, (err, companies) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        if (!companies) return res.status(404).json({msg: "Not Found :)", err: err.message});
        res.json(companies);
    });
});
// todo -------------------------------------- all company and admins
router.get('/companies_and_admin', (req, res) => {
    employee.find({}, (err, employee) => {
        if (err) return res.status(500).json({msg: "Server Error :-)", err: err.message});

        company.find({}, {__v: 0}).populate('manager').exec((err, product) => {
            if (err) return res.status(500).json({msg: "Server Error :=)", err: err.message});

            res.json(product)
        })
    })
})

// todo -------------------------------------- find admin
router.get('/company_admin:company', (req, res) => {
    employee.find({$and: [{company: req.params.company}, {"manager" : true}]}, {__v: 0}, (err, employee) => {
        if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        if (!employee) return res.status(404).json({msg: "Not Found :)", err: err.message});
        res.json(employee)
    })
})
// todo -------------------------------------- find employees
router.get('/company:company', (req, res) => {
    employee.find({"company": req.params.company}, {__v: 0}, (err, employee) => {
        if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        if (!employee) return res.status(404).json({msg: "Not Found :)", err: err.message});
        res.json(employee)
    })
})

// todo -------------------------------- < find last years for req.params.id > --------------------------------
router.get('/recently:id', (req, res) => {
    var pastYear = new Date().getFullYear() - req.params.id;

    company.find({
        "date_registered": {
            $gt: `${pastYear}`
        }
    }, (err, companies) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });

        if (!companies) return res.status(404).json({msg: "Not Found :)", err: err.message});

        res.json(companies);
    });
});


router.get('/filter:id', (req, res) => {
    let arr = req.params.id.split('-');

    let recentlyYear =  arr[2];
    let oldYear =  arr[6];

    console.log(arr);
    console.log(recentlyYear, oldYear);


    company.find({
        $and: [{
            "date_registered": {
                $gt: `${recentlyYear}`
            }
        }, {
            "date_registered": {
                $lt: `${ oldYear}`
            }
        }]
    }, (err, companies) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        console.log(companies);
        res.json(companies);
    })

});


// todo -------------------------------- < / find last years for req.params.id >
router.get('/:id', (req, res) => {

    company.findOne({
        _id: req.params.id
    }, (err, company) => {

        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });

        if (!companies) return res.status(404).json({msg: "Not Found :)", err: err.message});

        res.json(companies);
    })

});

// ? -------------------------------------- < create company > ---------------------
router.post('/', (req, res) => {

    company.find({
        $or: [
        {name : req.body.name.toLowerCase()},
        {id_register: req.body.id_register}
        ]
    }, (err, company_find) => {
        if (err) return res.status(500).json({
            msg: "Server Error :=)",
            err: err.msg
        });

        if (company_find.length>0) return res.status(400).json({msg: "Bad Request :=)"});

        const newCompany = new company({

            name: req.body.name.toLowerCase(),
            id_register: req.body.id_register,
            city: req.body.city,
            province: req.body.province,
            date_registered: req.body.date_registered,
            phone_number: req.body.phone_number

        });

        newCompany.save((err, company) => {
            console.log(err);
            if (err) return res.status(500).json({
                msg: "Server Error :==)",
                err: err.msg
            });
            res.json(company);
        })


    });




});
// ? -------------------------------------- < update company > ---------------------

router.put('/changeCity', (req, res) => {


        company.updateMany({"__v" : 0},
            req.body, {
                city: req.body.city,
                province: req.body.province
            }, (err, company) => {
                if (err) return res.status(500).json({
                    msg: "Server Error :)",
                    err: err.msg
                });
                res.json(company);
            })


});


router.put('/:id', (req, res) => {


    company.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        name: req.body.name,
        id_register: req.body.id_register,
        city: req.body.city,
        province: req.body.province,
        date_registered: req.body.date_registered,
        phone_number: req.body.phone_number
    }, (err, company) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        res.json(company);
    })
});
// ? -------------------------------------- < delete company > ---------------------
router.delete('/:id', (req, res) => {


    employee.deleteMany({
        company: req.params.id
    }, (err, employee) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        // res.json(employee);
    })

    factor.deleteMany({
        company: req.params.id
    }, (err, employee) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        // res.json(employee);
    })

    company.findOneAndDelete({
        _id: req.params.id
    }, (err, company) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        res.json(company);
    })
});



module.exports = router;