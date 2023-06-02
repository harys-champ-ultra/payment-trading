////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DATABASE INTEGRATION
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// use mysql database
const mysql = require('mysql');

// create connection for mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pksuccesstrading'
});

// connecting with mysql
connection.connect();

// use session for saving the state of user
const session = require('express-session');






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STARTING EXPRESS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// require express server for running app
const express = require('express')

// save express method function in app
const app = express()

// path for joining other directories folder files
const path = require('path')
const appName = 'PKSuccessTrading'

// analyzing the body values
const parser = require('body-parser');
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// use for saving secure passwords
const bcrypt = require('bcrypt');
const saltRounds = 10;

// initialize an ejs variable
const ejs = 'ejs';

// use mailing module
const nodemailer = require('nodemailer');
const { connect } = require('http2');

// url localhost:3000
const port = 3000

// setting template engine as ejs
app.set('view engine', ejs)

// use path for joining other directories folder files
app.use(express.static(path.join(__dirname, 'public')))

// use session management
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // 1 s = 1000 ms
    // 1 min = 1000 * 60 ms = 60000 ms
    // 1 hr = 60000 * 60 ms = 3600000 ms
    // 1 day = 24 * 3600000 ms = 86400000 ms
    // 1 week = 86400000 * 7 ms = 604800000 ms
    cookie: { maxAge: 604800000 }
}))






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EXPRESS PATHING LOCATIONS PAGES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// route for admin page
app.get('/admin', (req, res) => {
    // if page as logged in
    if (req.session.adminLoggedIn) {
        // call query
        connection.query("SELECT * FROM `bank`", (err1, result1) => {
            if (err1) {
                throw err1
            } else {
                connection.query("SELECT `deposit`.`depositid`, `deposit`.`depositamount`, `deposit`.`deposittransaction`, `deposit`.`planid`, `deposit`.`clientid`, `client`.`clientname`, `plans`.`planname` FROM `deposit`, `client`, `plans` WHERE `deposit`.`clientid`=`client`.`clientid` AND `deposit`.`planid`=`plans`.`planid` AND `depositstatus`='Pending'", (err2, result2) => {
                    if (err2) {
                        throw err2
                    } else {
                        connection.query("SELECT * FROM `withdraw`, `client` WHERE `withdraw`.`clientid`=`client`.`clientid` AND `withdrawstatus`='Pending'", (err3, result3) => {
                            if (err3) {
                                throw err3
                            } else {
                                connection.query("SELECT `client`.`clientname`, `referral`.`referralid`, `referral`.`referralname` FROM `client`, `referral` WHERE `referral`.`clientid`=`client`.`clientid` AND `referral`.`referralstatus`='Pending'", (err4, result4) => {
                                    if (err4) {
                                        throw err4
                                    } else {
                                        connection.query("SELECT SUM(`depositamount`) AS `totaldeposit` FROM `deposit` WHERE `depositstatus`='Approved'", (err5, result5) => {
                                            if (err5) {
                                                throw err5
                                            } else {
                                                connection.query("SELECT SUM(`withdrawamount`) AS `totalwithdraw` FROM `withdraw` WHERE `withdrawstatus`='Approved'", (err6, result6) => {
                                                    if (err6) {
                                                        throw err6
                                                    } else {
                                                        connection.query("SET @rc=0, @rd=0, @rw=0", (err0, result0) => {
                                                            if (err0) {
                                                                throw err0
                                                            } else {
                                                                connection.query("SELECT @rc:=@rc+1 AS `serialid`, `clientid`, `clientname`, `clientemail`, `clientphone`, `clientgender`, `activedate` FROM `client`", (err7, result7) => {
                                                                    if (err7) {
                                                                        throw err7
                                                                    } else {
                                                                        connection.query("SELECT @rd:=@rd+1 AS `serialid`, `client`.`clientname`, `client`.`clientemail`, `client`.`clientgender`, SUM(`deposit`.`depositamount`) AS `total` FROM `client`, `deposit` WHERE `deposit`.`clientid`=`client`.`clientid` AND `deposit`.`depositstatus`='Approved' GROUP BY `client`.`clientid` ORDER BY `serialid`", (err8, result8) => {
                                                                            if (err8) {
                                                                                throw err8
                                                                            } else {
                                                                                connection.query("SELECT @rw:=@rw+1 AS `serialid`, `client`.`clientname`, `client`.`clientemail`, `client`.`clientgender`, SUM(`withdraw`.`withdrawamount`) AS `total`, `withdraw`.`withdrawbank` FROM `client`, `withdraw` WHERE `withdraw`.`clientid`=`client`.`clientid` AND `withdraw`.`withdrawstatus`='Approved' GROUP BY `client`.`clientid` ORDER BY `serialid`", (err9, result9) => {
                                                                                    if (err9) {
                                                                                        throw err9
                                                                                    } else {
                                                                                        connection.query("SELECT @rf:=@rf+1 AS `serialid`, `feedback`.`feedbackid`, `feedback`.`feedbacktitle`, `feedback`.`clientid`, `client`.`clientid`, `client`.`clientname`, `client`.`clientemail` FROM `feedback`, `client` WHERE `feedback`.`clientid`=`client`.`clientid` GROUP BY `feedback`.`feedbackid` ORDER BY `serialid`", (err10, result10) => {
                                                                                            const afterSign = [
                                                                                                { 'name': 'Logout', 'route': './adminLogout' }
                                                                                            ]
                                                                                            res.render('./admin/dashboard', {
                                                                                                'title': 'Admin Dashboard | PKSuccessTrading',
                                                                                                'navRight': afterSign,
                                                                                                'adminId': req.session.adminId,
                                                                                                'adminName': req.session.adminName,
                                                                                                'adminEmail': req.session.adminEmail,
                                                                                                'bankData': result1,
                                                                                                'depositData': result2,
                                                                                                'withdrawData': result3,
                                                                                                'referralData': result4,
                                                                                                'totalDeposit': result5,
                                                                                                'totalWithdraw': result6,
                                                                                                'clientData': result7,
                                                                                                'dData': result8,
                                                                                                'wData': result9,
                                                                                                'feedbackData': result10
                                                                                            })
                                                                                        })
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    } else {
        res.redirect('./adminLogin')
    }
})

// route for sub admin page
app.get('/subadmin', (req, res) => {
    // if page as logged in
    if (req.session.subadminLoggedIn) {
        // call query
        connection.query("SELECT * FROM `bank`", (err1, result1) => {
            if (err1) {
                throw err1
            } else {
                connection.query("SELECT `deposit`.`depositid`, `deposit`.`depositamount`, `deposit`.`deposittransaction`, `deposit`.`planid`, `deposit`.`clientid`, `client`.`clientname`, `plans`.`planname` FROM `deposit`, `client`, `plans` WHERE `deposit`.`clientid`=`client`.`clientid` AND `deposit`.`planid`=`plans`.`planid` AND `depositstatus`='Pending'", (err2, result2) => {
                    if (err2) {
                        throw err2
                    } else {
                        connection.query("SELECT * FROM `withdraw`, `client` WHERE `withdraw`.`clientid`=`client`.`clientid` AND `withdrawstatus`='Pending'", (err3, result3) => {
                            if (err3) {
                                throw err3
                            } else {
                                connection.query("SELECT `client`.`clientname`, `referral`.`referralid`, `referral`.`referralname` FROM `client`, `referral` WHERE `referral`.`clientid`=`client`.`clientid` AND `referral`.`referralstatus`='Pending'", (err4, result4) => {
                                    if (err4) {
                                        throw err4
                                    } else {
                                        connection.query("SELECT SUM(`depositamount`) AS `totaldeposit` FROM `deposit` WHERE `depositstatus`='Approved'", (err5, result5) => {
                                            if (err5) {
                                                throw err5
                                            } else {
                                                connection.query("SELECT SUM(`withdrawamount`) AS `totalwithdraw` FROM `withdraw` WHERE `withdrawstatus`='Approved'", (err6, result6) => {
                                                    if (err6) {
                                                        throw err6
                                                    } else {
                                                        connection.query("SET @rc=0, @rd=0, @rw=0", (err0, result0) => {
                                                            if (err0) {
                                                                throw err0
                                                            } else {
                                                                connection.query("SELECT @rc:=@rc+1 AS `serialid`, `clientid`, `clientname`, `clientemail`, `clientphone`, `clientgender`, `activedate` FROM `client`", (err7, result7) => {
                                                                    if (err7) {
                                                                        throw err7
                                                                    } else {
                                                                        connection.query("SELECT @rd:=@rd+1 AS `serialid`, `client`.`clientname`, `client`.`clientemail`, `client`.`clientgender`, SUM(`deposit`.`depositamount`) AS `total` FROM `client`, `deposit` WHERE `deposit`.`clientid`=`client`.`clientid` AND `deposit`.`depositstatus`='Approved' GROUP BY `client`.`clientid` ORDER BY `serialid`", (err8, result8) => {
                                                                            if (err8) {
                                                                                throw err8
                                                                            } else {
                                                                                connection.query("SELECT @rw:=@rw+1 AS `serialid`, `client`.`clientname`, `client`.`clientemail`, `client`.`clientgender`, SUM(`withdraw`.`withdrawamount`) AS `total`, `withdraw`.`withdrawbank` FROM `client`, `withdraw` WHERE `withdraw`.`clientid`=`client`.`clientid` AND `withdraw`.`withdrawstatus`='Approved' GROUP BY `client`.`clientid` ORDER BY `serialid`", (err9, result9) => {
                                                                                    if (err9) {
                                                                                        throw err9
                                                                                    } else {
                                                                                        connection.query("SELECT @rf:=@rf+1 AS `serialid`, `feedback`.`feedbackid`, `feedback`.`feedbacktitle`, `feedback`.`clientid`, `client`.`clientid`, `client`.`clientname`, `client`.`clientemail` FROM `feedback`, `client` WHERE `feedback`.`clientid`=`client`.`clientid` GROUP BY `feedback`.`feedbackid` ORDER BY `serialid`", (err10, result10) => {
                                                                                            const afterSign = [
                                                                                                { 'name': 'Logout', 'route': './subadminLogout' }
                                                                                            ]
                                                                                            res.render('./subadmin/dashboard', {
                                                                                                'title': 'Sub-Admin Dashboard | PKSuccessTrading',
                                                                                                'navRight': afterSign,
                                                                                                'subadminId': req.session.subadminId,
                                                                                                'subadminName': req.session.subadminName,
                                                                                                'subadminEmail': req.session.subadminEmail,
                                                                                                'bankData': result1,
                                                                                                'depositData': result2,
                                                                                                'withdrawData': result3,
                                                                                                'referralData': result4,
                                                                                                'totalDeposit': result5,
                                                                                                'totalWithdraw': result6,
                                                                                                'clientData': result7,
                                                                                                'dData': result8,
                                                                                                'wData': result9,
                                                                                                'feedbackData': result10
                                                                                            })
                                                                                        })
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    } else {
        res.redirect('./subadminLogin')
    }
})

// route for admin add bank page
app.get('/adminAddBank', (req, res) => {
    // if page as logged in
    if (req.session.adminLoggedIn) {
        const afterSign = [
            { 'name': 'Logout', 'route': './adminLogout' }
        ]
        res.render('./admin/addBank', {
            'title': 'Admin Add Bank | PKSuccessTrading',
            'navRight': afterSign,
        })
    } else {
        res.redirect('./adminLogin')
    }
})

const adminBeforeSign = [
    { 'name': 'Login', 'route': './adminLogin' }
]

const subadminBeforeSign = [
    { 'name': 'Login', 'route': './subadminLogin' }
]

// route for admin login page
app.get('/adminLogin', (req, res) => {
    // if page as not logged in
    if (!(req.session.adminLoggedIn)) {
        res.render('./admin/login', {
            'title': 'Admin Login | PKSuccessTrading',
            'navRight': adminBeforeSign,
            'err': ''
            // 'err': 'Make sure you type correct email or password!'
        })
    } else {
        res.redirect('./admin')
    }
})

// route for sub admin login page
app.get('/subadminLogin', (req, res) => {
    // if page as not logged in
    if (!(req.session.subadminLoggedIn)) {
        res.render('./subadmin/login', {
            'title': 'Sub-Admin Login | PKSuccessTrading',
            'navRight': subadminBeforeSign,
            'err': ''
            // 'err': 'Make sure you type correct email or password!'
        })
    } else {
        res.redirect('./subadmin')
    }
})

// rout for admin delete clients
app.get('/removeClient/:id', (req, res) => {
    const { id } = req.params
    // if page as logged in
    if (req.session.adminLoggedIn) {
        connection.query("DELETE FROM `client` WHERE `clientid`='" + id + "'", (err, result) => {
            if (err) {
                throw err
            } else {
                res.redirect('../admin#clients')
            }
        })
    }
})

// rout for admin delete feedback
app.get('/removeFeedback/:id', (req, res) => {
    const { id } = req.params
    // if page as logged in
    if (req.session.adminLoggedIn) {
        connection.query("DELETE FROM `feedback` WHERE `feedbackid`='" + id + "'", (err, result) => {
            if (err) {
                throw err
            } else {
                res.redirect('../admin#feedbacks')
            }
        })
    }
})

// rout for admin delete bank
app.get('/deleteBank/:id', (req, res) => {
    const { id } = req.params
    // if page as logged in
    if (req.session.adminLoggedIn) {
        connection.query("DELETE FROM `bank` WHERE `bankid`='" + id + "'", (err, result) => {
            if (err) {
                throw err
            } else {
                res.redirect('../admin#viewbank')
            }
        })
    }
})

// route for admin accept deposit
app.get('/acceptDeposit/:id', (req, res) => {
    const { id } = req.params
    // if page as logged in
    if (req.session.adminLoggedIn) {
        connection.query("UPDATE `deposit` SET `depositstatus` = 'Approved' WHERE `deposit`.`depositid` = '" + id + "'", (err, result) => {
            if (err) {
                throw err
            } else {
                res.redirect('../admin#deposit')
            }
        })
    }
})

// route for sub admin accept deposit
app.get('/subacceptDeposit/:id', (req, res) => {
    const { id } = req.params
    // if page as logged in
    if (req.session.subadminLoggedIn) {
        connection.query("UPDATE `deposit` SET `depositstatus` = 'Approved' WHERE `deposit`.`depositid` = '" + id + "'", (err, result) => {
            if (err) {
                throw err
            } else {
                res.redirect('../subadmin#deposit')
            }
        })
    }
})

// route for sub admin reject deposit
app.get('/subrejectDeposit/:id', (req, res) => {
    const { id } = req.params
    // if page as logged in
    if (req.session.subadminLoggedIn) {
        connection.query("DELETE FROM `deposit` WHERE `depositid`='" + id + "'", (err, result) => {
            if (err) {
                throw err
            } else {
                res.redirect('../subadmin#deposit')
            }
        })
    }
})

// route for admin reject deposit
app.get('/rejectDeposit/:id', (req, res) => {
    const { id } = req.params
    // if page as logged in
    if (req.session.adminLoggedIn) {
        connection.query("DELETE FROM `deposit` WHERE `depositid`='" + id + "'", (err, result) => {
            if (err) {
                throw err
            } else {
                res.redirect('../admin#deposit')
            }
        })
    }
})

// rout for admin accept withdraw
app.get('/acceptWithdraw/:id', (req, res) => {
    const { id } = req.params
    // if page as logged in
    if (req.session.adminLoggedIn) {
        connection.query("UPDATE `withdraw` SET `withdrawstatus` = 'Approved' WHERE `withdraw`.`withdrawid` = '" + id + "'", (err, result) => {
            if (err) {
                throw err
            } else {
                res.redirect('../admin#withdraw')
            }
        })
    }
})

// rout for sub admin accept withdraw
app.get('/subacceptWithdraw/:id', (req, res) => {
    const { id } = req.params
    // if page as logged in
    if (req.session.subadminLoggedIn) {
        connection.query("UPDATE `withdraw` SET `withdrawstatus` = 'Approved' WHERE `withdraw`.`withdrawid` = '" + id + "'", (err, result) => {
            if (err) {
                throw err
            } else {
                res.redirect('../subadmin#withdraw')
            }
        })
    }
})

// rout for admin reject withdraw
app.get('/rejectWithdraw/:id', (req, res) => {
    const { id } = req.params
    // if page as logged in
    if (req.session.adminLoggedIn) {
        connection.query("DELETE FROM `withdraw` WHERE `withdrawid`='" + id + "'", (err, result) => {
            if (err) {
                throw err
            } else {
                res.redirect('../admin#withdraw')
            }
        })
    }
})

// rout for sub admin reject withdraw
app.get('/subrejectWithdraw/:id', (req, res) => {
    const { id } = req.params
    // if page as logged in
    if (req.session.subadminLoggedIn) {
        connection.query("DELETE FROM `withdraw` WHERE `withdrawid`='" + id + "'", (err, result) => {
            if (err) {
                throw err
            } else {
                res.redirect('../subadmin#withdraw')
            }
        })
    }
})

// rout for admin accept referral
app.post('/acceptReferral', (req, res) => {
    if (req.method === 'POST') {
        const referralAmount = req.body.referralAmount
        const referralId = req.body.referralId
        // if page as logged in
        if (req.session.adminLoggedIn) {
            connection.query("UPDATE `referral` SET `referralamount` = '" + referralAmount + "', `referralstatus` = 'Approved' WHERE `referral`.`referralid` = '" + referralId + "';", (err, result) => {
                if (err) {
                    throw err
                } else {
                    res.redirect('../admin#referral')
                }
            })
        }
    }
})

// rout for sub admin accept referral
app.post('/subacceptReferral', (req, res) => {
    if (req.method === 'POST') {
        const referralAmount = req.body.referralAmount
        const referralId = req.body.referralId
        // if page as logged in
        if (req.session.subadminLoggedIn) {
            connection.query("UPDATE `referral` SET `referralamount` = '" + referralAmount + "', `referralstatus` = 'Approved' WHERE `referral`.`referralid` = '" + referralId + "';", (err, result) => {
                if (err) {
                    throw err
                } else {
                    res.redirect('../subadmin#referral')
                }
            })
        }
    }
})

// rout for admin reject referral
app.get('/rejectReferral/:id', (req, res) => {
    const { id } = req.params
    // if page as logged in
    if (req.session.adminLoggedIn) {
        connection.query("DELETE FROM `referral` WHERE `referralid`='" + id + "'", (err, result) => {
            if (err) {
                throw err
            } else {
                res.redirect('../admin#referral')
            }
        })
    }
})

// rout for sub admin reject referral
app.get('/subrejectReferral/:id', (req, res) => {
    const { id } = req.params
    // if page as logged in
    if (req.session.subadminLoggedIn) {
        connection.query("DELETE FROM `referral` WHERE `referralid`='" + id + "'", (err, result) => {
            if (err) {
                throw err
            } else {
                res.redirect('../subadmin#referral')
            }
        })
    }
})

// route for admin sign out page
app.get('/adminLogout', (req, res) => {
    req.session.adminLoggedIn = false
    res.redirect('./adminLogin')
})

// route for sub admin sign out page
app.get('/subadminLogout', (req, res) => {
    req.session.subadminLoggedIn = false
    res.redirect('./subadminLogin')
})

// right navigation actions before client login
const beforeSign = [
    { 'name': 'Login', 'route': './login' },
    { 'name': 'Sign Up', 'route': './signup' }
]

// route for client home page
app.get('/', (req, res) => {
    // call query
    connection.query("SELECT `feedback`.`feedbacktitle`, `feedback`.`clientid`, `client`.`clientname` FROM `feedback`, `client` WHERE `feedback`.`clientid`=`client`.`clientid` ORDER BY `feedback`.`feedbackid` ASC", (err1, result1) => {
        if (err1) {
            throw err1
        } else {
            connection.query("SELECT * FROM `plans`", (err2, result2) => {
                if (err2) {
                    throw err2
                } else {
                    // page as logged in
                    if (req.session.isLoggedIn) {
                        const afterSign = [
                            { 'name': req.session.clientName, 'route': './dashboard' },
                            { 'name': 'Logout', 'route': './logoutClient' }
                        ]
                        res.render('./client/index', {
                            'title': 'Home | PKSuccessTrading',
                            'navRight': afterSign,
                            'feedbackData': result1,
                            'planData': result2
                        })
                    } else {
                        res.render('./client/index', {
                            'title': 'Home | PKSuccessTrading',
                            'navRight': beforeSign,
                            'feedbackData': result1,
                            'planData': result2
                        })
                    }
                }
            })
        }
    })
})

// route for client dashboard page
app.get('/dashboard', (req, res) => {
    // if page not logged in
    if (!(req.session.isLoggedIn)) {
        res.redirect('./login')
    } else {
        connection.query("SELECT SUM(`deposit`.`depositamount`) AS `total`, `deposit`.`depositstatus` from `deposit` WHERE `deposit`.`clientid`='" + req.session.clientId + "'", (err1, result1) => {
            // connection.query("SELECT SUM(`deposit`.`depositamount`) AS `total`, `deposit`.`depositstatus` from `deposit` WHERE `deposit`.`clientid`='"+req.session.clientId+"' AND `depositstatus`='Pending'", (err1, result1) => {
            // connection.query("SELECT SUM(`deposit`.`depositamount`) AS `total`, `deposit`.`depositstatus` from `deposit` WHERE `deposit`.`clientid`='"+req.session.clientId+"' AND `depositstatus`='Active' OR `depositstatus`='Pending'", (err1, result1) => {
            if (err1) {
                throw err1
            } else {
                // connection.query("SELECT SUM(`deposit`.`depositamount`) AS `total`, `deposit`.`depositstatus` from `deposit` WHERE `deposit`.`clientid`='"+req.session.clientId+"' AND `depositstatus`='Approved'", (err2, result2) => {
                connection.query("SELECT SUM(`deposit`.`raqam`) AS `total`, `deposit`.`depositstatus` from `deposit` WHERE `deposit`.`clientid`='" + req.session.clientId + "' AND `depositstatus`='Approved'", (err2, result2) => {
                    if (err2) {
                        throw err2
                    } else {
                        connection.query("SELECT SUM(`withdraw`.`withdrawamount`) AS `total` FROM `withdraw` WHERE `withdraw`.`clientid`='" + req.session.clientId + "' AND `withdrawstatus`='Approved'", (err3, result3) => {
                            if (err3) {
                                throw err3
                            } else {
                                // connection.query("SELECT SUM(`deposit`.`depositamount`)-(SELECT SUM(`withdraw`.`withdrawamount`) FROM `withdraw` WHERE `withdraw`.`clientid`='"+req.session.clientId+"' AND `withdraw`.`withdrawstatus`='Approved') AS `total` FROM `deposit` WHERE `deposit`.`clientid`='"+req.session.clientId+"' AND `deposit`.`depositstatus`='Approved'", (err4, result4) => {
                                connection.query("SELECT SUM(`deposit`.`raqam`)-(SELECT SUM(`withdraw`.`withdrawamount`) FROM `withdraw` WHERE `withdraw`.`clientid`='" + req.session.clientId + "' AND `withdraw`.`withdrawstatus`='Approved') AS `total` FROM `deposit` WHERE `deposit`.`clientid`='" + req.session.clientId + "' AND `deposit`.`depositstatus`='Approved'", (err4, result4) => {
                                    if (err4) {
                                        throw err4
                                    } else {
                                        connection.query("SELECT GROUP_CONCAT(`plans`.`planname`) AS `allplans`, `plans`.`planid`, `deposit`.`depositday` FROM `deposit`, `plans` WHERE `plans`.`planid`=`deposit`.`planid` AND `deposit`.`clientid`='" + req.session.clientId + "' AND `deposit`.`depositstatus`='Approved'", (err5, result5) => {
                                            // connection.query("SELECT GROUP_CONCAT(`plans`.`planname`) AS `allplans`, `plans`.`planid`, `deposit`.`depositday` FROM `deposit`, `plans` WHERE `plans`.`planid`=`deposit`.`planid` AND `deposit`.`clientid`='"+req.session.clientId+"' AND `deposit`.`depositstatus`='Active'", (err5, result5) => {
                                            if (err5) {
                                                throw err5
                                            } else {
                                                connection.query("SELECT SUM(`referral`.`referralamount`) AS `allreferral` FROM `referral` WHERE `referral`.`referralname`='" + req.session.clientEmail + "'", (err6, result6) => {
                                                    if (err6) {
                                                        throw err6
                                                    } else {
                                                        const afterSign = [
                                                            { 'name': req.session.clientName, 'route': './dashboard' },
                                                            { 'name': 'Logout', 'route': './logoutClient' }
                                                        ]
                                                        res.render('./client/dashboard', {
                                                            'title': 'Dashboard | PKSuccessTrading',
                                                            'navRight': afterSign,
                                                            'clientId': req.session.clientId,
                                                            'clientName': req.session.clientName,
                                                            'clientEmail': req.session.clientEmail,
                                                            'clientPhone': req.session.clientPhone,
                                                            'activeDate': req.session.activeDate,
                                                            'depositData': result1,
                                                            'earnedData': result2,
                                                            'withdrawData': result3,
                                                            'balanceData': result4,
                                                            'plansData': result5,
                                                            'referralData': result6
                                                        })
                                                        // connection.query("SET @refpese = (SELECT SUM(`referral`.`referralamount`) FROM `referral` WHERE `referral`.`referralname`='"+req.session.clientEmail+"')", (err7, result7) => {
                                                        //     if(err7) {
                                                        //         throw err7
                                                        //     } else {
                                                        //         connection.query("SET @deppese = (SELECT SUM(`deposit`.`raqam`) FROM `deposit` WHERE `deposit`.`clientid`='"+req.session.clientId+"' AND `depositstatus`='Approved')", (err8, result8) => {
                                                        //             if(err8) {
                                                        //                 throw err8
                                                        //             } else {
                                                        //                 connection.query("UPDATE `deposit` SET `deposit`.`raqam`= @deppese + @refpese WHERE `deposit`.`clientid`='"+req.session.clientId+"' AND `depositstatus`='Approved'", (err9, result9) => {
                                                        //                     if(err9) {
                                                        //                         throw err9
                                                        //                     } else {   
                                                        //                     }
                                                        //                 })
                                                        //             }
                                                        //         })
                                                        //     }
                                                        // })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})

// route for client deposit page
app.get('/deposit', (req, res) => {
    // call query
    connection.query("SELECT * FROM `plans`", (err1, result1) => {
        if (err1) {
            throw err1;
        } else {
            connection.query("SELECT * FROM `bank`", (err2, result2) => {
                if (err2) {
                    throw err2
                } else {
                    // if page not logged in
                    if (!(req.session.isLoggedIn)) {
                        res.redirect('./login')
                    } else {
                        const afterSign = [
                            { 'name': req.session.clientName, 'route': './dashboard' },
                            { 'name': 'Logout', 'route': './logoutClient' }
                        ]
                        res.render('./client/deposit', {
                            'title': 'Deposit | PKSuccessTrading',
                            'navRight': afterSign,
                            'clientId': req.session.clientId,
                            'clientName': req.session.clientName,
                            'clientEmail': req.session.clientEmail,
                            'clientPhone': req.session.clientPhone,
                            'activeDate': req.session.activeDate,
                            'planData': result1,
                            'bankData': result2
                        })
                    }
                }
            })
        }
    })
})

app.get('/depositsuccess', (req, res) => {
    // page as logged in
    if (!(req.session.isLoggedIn)) {
        res.redirect('./login')
    } else {
        const afterSign = [
            { 'name': req.session.clientName, 'route': './dashboard' },
            { 'name': 'Logout', 'route': './logoutClient' }
        ]
        res.render('./client/depositsuccess', {
            'title': 'Deposit Success | PKSuccessTrading',
            'navRight': afterSign
        })
    }
})

app.get('/withdrawsuccess', (req, res) => {
    // page as logged in
    if (!(req.session.isLoggedIn)) {
        res.redirect('./login')
    } else {
        const afterSign = [
            { 'name': req.session.clientName, 'route': './dashboard' },
            { 'name': 'Logout', 'route': './logoutClient' }
        ]
        res.render('./client/withdrawsuccess', {
            'title': 'Withdraw Success | PKSuccessTrading',
            'navRight': afterSign
        })
    }
})

app.get('/referralsuccess', (req, res) => {
    // page as logged in
    if (!(req.session.isLoggedIn)) {
        res.redirect('./login')
    } else {
        const afterSign = [
            { 'name': req.session.clientName, 'route': './dashboard' },
            { 'name': 'Logout', 'route': './logoutClient' }
        ]
        res.render('./client/referralsuccess', {
            'title': 'Referral Success | PKSuccessTrading',
            'navRight': afterSign
        })
    }
})

app.get('/withdraw', (req, res) => {
    // page as logged in
    if (!(req.session.isLoggedIn)) {
        res.redirect('./login')
    } else {
        // connection.query("SELECT SUM(`deposit`.`depositamount`)-(SELECT SUM(`withdraw`.`withdrawamount`) FROM `withdraw` WHERE `withdraw`.`clientid`='"+req.session.clientId+"' AND `withdraw`.`withdrawstatus`='Approved') AS `total` FROM `deposit` WHERE `deposit`.`clientid`='"+req.session.clientId+"' AND `deposit`.`depositstatus`='Approved'", (err, result) => {
        connection.query("SELECT SUM(`deposit`.`raqam`)-(SELECT SUM(`withdraw`.`withdrawamount`) FROM `withdraw` WHERE `withdraw`.`clientid`='" + req.session.clientId + "' AND `withdraw`.`withdrawstatus`='Approved') AS `total` FROM `deposit` WHERE `deposit`.`clientid`='" + req.session.clientId + "' AND `deposit`.`depositstatus`='Approved'", (err, result) => {
            if (err) {
                throw err
            } else {
                // connection.query("SELECT SUM(`deposit`.`depositamount`) AS `total` from `deposit` WHERE `deposit`.`clientid`='"+req.session.clientId+"' AND `depositstatus`='Approved'", (err2, result2) => {
                connection.query("SELECT SUM(`deposit`.`raqam`) AS `total` from `deposit` WHERE `deposit`.`clientid`='" + req.session.clientId + "' AND `depositstatus`='Approved'", (err2, result2) => {
                    if (err2) {
                        throw err2
                    } else {
                        connection.query("SELECT SUM(`referral`.`referralamount`) AS `allreferral` FROM `referral` WHERE `referral`.`referralname`='" + req.session.clientEmail + "'", (err3, result3) => {
                            if (err3) {
                                throw err3
                            } else {
                                const afterSign = [
                                    { 'name': req.session.clientName, 'route': './dashboard' },
                                    { 'name': 'Logout', 'route': './logoutClient' }
                                ]
                                res.render('./client/withdraw', {
                                    'title': 'Withdraw | PKSuccessTrading',
                                    'navRight': afterSign,
                                    'clientId': req.session.clientId,
                                    'clientName': req.session.clientName,
                                    'clientEmail': req.session.clientEmail,
                                    'clientPhone': req.session.clientPhone,
                                    'activeDate': req.session.activeDate,
                                    'withdrawData': result,
                                    'earnedData': result2,
                                    'referralData': result3
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})

app.get('/payproofs', (req, res) => {
    connection.query("SET @rd=0, @rw=0, @rc=0;", (err0, result0) => {
        if (err0) {
            throw err0
        } else {
            connection.query("SELECT @rd:=@rd+1 AS `serialid`, `client`.`clientname`, `client`.`clientemail`, `client`.`clientgender`, SUM(`deposit`.`depositamount`) AS `total` FROM `client`, `deposit` WHERE `deposit`.`clientid`=`client`.`clientid` AND `deposit`.`depositstatus`='Approved' GROUP BY `client`.`clientid` ORDER BY `serialid`", (err1, result1) => {
                if (err1) {
                    throw err1
                } else {
                    connection.query("SELECT @rw:=@rw+1 AS `serialid`, `client`.`clientname`, `client`.`clientemail`, `client`.`clientgender`, SUM(`withdraw`.`withdrawamount`) AS `total`, `withdraw`.`withdrawbank` FROM `client`, `withdraw` WHERE `withdraw`.`clientid`=`client`.`clientid` AND `withdraw`.`withdrawstatus`='Approved' GROUP BY `client`.`clientid` ORDER BY `serialid`", (err2, result2) => {
                        if (err2) {
                            throw err2
                        } else {
                            // page as logged in
                            if (!(req.session.isLoggedIn)) {
                                // res.redirect('./login')
                                res.render('./client/payproofs', {
                                    'title': 'Pay Proofs | PKSuccessTrading',
                                    'navRight': beforeSign,
                                    'depositData': result1,
                                    'withdrawData': result2
                                })
                            } else {
                                const afterSign = [
                                    { 'name': req.session.clientName, 'route': './dashboard' },
                                    { 'name': 'Logout', 'route': './logoutClient' }
                                ]
                                res.render('./client/payproofs', {
                                    'title': 'Pay Proofs | PKSuccessTrading',
                                    'navRight': afterSign,
                                    'clientId': req.session.clientId,
                                    'clientName': req.session.clientName,
                                    'clientEmail': req.session.clientEmail,
                                    'clientPhone': req.session.clientPhone,
                                    'activeDate': req.session.activeDate,
                                    'depositData': result1,
                                    'withdrawData': result2
                                })
                            }
                        }
                    })
                }
            })
        }
    })
})

app.get('/referral', (req, res) => {
    // page as logged in
    if (!(req.session.isLoggedIn)) {
        res.redirect('./login')
    } else {
        const afterSign = [
            { 'name': req.session.clientName, 'route': './dashboard' },
            { 'name': 'Logout', 'route': './logoutClient' }
        ]
        res.render('./client/referral', {
            'title': 'Referral Bonus | PKSuccessTrading',
            'navRight': afterSign,
            'clientId': req.session.clientId,
            'clientName': req.session.clientName,
            'clientEmail': req.session.clientEmail,
            'clientPhone': req.session.clientPhone,
            'activeDate': req.session.activeDate
        })
    }
})

app.get('/claimPlan/:id', (req, res) => {
    const { id } = req.params
    // if page as logged in
    if (req.session.isLoggedIn) {
        let pay = 0
        if (id == 1) {
            pay = 110
        } else if (id == 2) {
            pay = 303
        } else if (id == 3) {
            pay = 650
        } else if (id == 4) {
            pay = 1516
        } else if (id == 5) {
            pay = 3466
        } else if (id == 6) {
            pay = 7366
        }
        const today = new Date().getDate()
        // connection.query("SET @dp=(SELECT `deposit`.`depositamount` FROM `deposit` WHERE `deposit`.`planid` = '"+id+"' AND `deposit`.`clientid`='"+req.session.clientId+"')", (err0, result0) => {
        connection.query("SET @dp=(SELECT `deposit`.`raqam` FROM `deposit` WHERE `deposit`.`planid` = '" + id + "' AND `deposit`.`clientid`='" + req.session.clientId + "')", (err0, result0) => {
            if (err0) {
                throw err0
            } else {
                connection.query("UPDATE `deposit` SET `deposit`.`depositday` = '" + today + "' WHERE `deposit`.`planid` = '" + id + "'", (err1, result1) => {
                    if (err1) {
                        throw err1
                    } else {
                        // connection.query("UPDATE `deposit` SET `deposit`.`depositamount` = @dp + '"+pay+"', `deposit`.`depositstatus`='Approved' WHERE `deposit`.`planid` = '"+id+"'", (err2, result2) => {
                        connection.query("UPDATE `deposit` SET `deposit`.`raqam` = @dp + '" + pay + "', `deposit`.`depositstatus`='Approved' WHERE `deposit`.`planid` = '" + id + "'", (err2, result2) => {
                            if (err2) {
                                throw err2
                            } else {
                                res.redirect('../dashboard')
                            }
                        })
                    }
                })
            }
        })
    }
})

// route for client login page
app.get('/login', (req, res) => {
    if (!(req.session.isLoggedIn)) {
        res.render('./client/login', {
            'title': 'Login | PKSuccessTrading',
            'navRight': beforeSign,
            'err': ''
            // 'err': 'Make sure you type correct email or password!'
        })
    } else {
        res.redirect('./')
    }
})

// route for client sign up page
app.get('/signup', (req, res) => {
    if (!(req.session.isLoggedIn)) {
        res.render('./client/signup', {
            'title': 'Sign Up | PKSuccessTrading',
            'navRight': beforeSign,
            'err': ''
            // 'err': 'Make sure you type valid inputs according to given requirements!'
        })
    } else {
        res.redirect('./')
    }
})

// route for client sign out page
app.get('/logoutClient', (req, res) => {
    req.session.isLoggedIn = false
    res.redirect('./')
})






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EXPRESS PATHING LOCATIONS INPUTS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/adminBankPost', (req, res) => {
    if (req.method === 'POST') {
        const bankName = req.body.bankName
        const bankAccount = req.body.bankAccount
        const bankTitle = req.body.bankTitle
        if ((bankName.length <= 0) || (bankAccount.length <= 9) || (bankTitle.length <= 0)) {
            res.redirect('./adminAddBank')
        } else {
            connection.query("INSERT INTO `bank`(`bankname`, `bankaccount`, `banktitle`) VALUES ('" + bankName + "', '" + bankAccount + "', '" + bankTitle + "')", (err, result) => {
                if (err) {
                    res.redirect('./adminAddBank')
                } else {
                    res.redirect('./admin#viewbank')
                }
            })
        }
    } else {
        res.send('Failed')
    }
})

// input process of admin login page
app.post('/adminLoginPost', (req, res) => {
    // set login state false by default
    req.session.adminLoggedIn = false
    // storing input states
    if (req.method === 'POST') {
        const adminEmail = req.body.adminEmail
        const adminPassword = req.body.adminPassword
        // check if any input is empty
        if ((adminEmail.length <= 0) || (adminPassword.length <= 7)) {
            // res.redirect('./adminLogin')
            res.render('./admin/login', {
                'title': 'Admin Login | PKSuccessTrading',
                'navRight': adminBeforeSign,
                'err': 'Make sure you type correct email or password!'
            })
        } else {
            // call query
            connection.query("SELECT * FROM `admin` WHERE `adminemail`='" + adminEmail + "'", async (err, result) => {
                if (err) {
                    // res.redirect('./adminLogin')
                    res.render('./admin/login', {
                        'title': 'Admin Login | PKSuccessTrading',
                        'navRight': adminBeforeSign,
                        'err': 'Make sure you type correct email or password!'
                    })
                }
                // if account is found
                if (result.length > 0) {
                    const comparison = await bcrypt.compare(adminPassword, result[0].adminpassword)
                    // check for password correct or not
                    if (comparison) {
                        // set login state true, so data in account is accessable
                        req.session.adminLoggedIn = true
                        req.session.adminId = result[0].adminid
                        req.session.adminName = result[0].adminname
                        req.session.adminEmail = result[0].adminemail
                        res.redirect('./admin')
                    } else {
                        // res.redirect('./adminLogin')
                        res.render('./admin/login', {
                            'title': 'Admin Login | PKSuccessTrading',
                            'navRight': adminBeforeSign,
                            'err': 'Make sure you type correct email or password!'
                        })
                    }
                } else {
                    // res.redirect('./adminLogin')
                    res.render('./admin/login', {
                        'title': 'Admin Login | PKSuccessTrading',
                        'navRight': adminBeforeSign,
                        'err': 'Make sure you type correct email or password!'
                    })
                }
            })
        }
    } else {
        res.send('Failed!')
    }
})

// input process of sub admin login page
app.post('/subadminLoginPost', (req, res) => {
    // set login state false by default
    req.session.subadminLoggedIn = false
    // storing input states
    if (req.method === 'POST') {
        const subadminEmail = req.body.subadminEmail
        const subadminPassword = req.body.subadminPassword
        // check if any input is empty
        if ((subadminEmail.length <= 0) || (subadminPassword.length <= 7)) {
            // res.redirect('./adminLogin')
            res.render('./subadmin/login', {
                'title': 'Sub-Admin Login | PKSuccessTrading',
                'navRight': subadminBeforeSign,
                'err': 'Make sure you type correct email or password!'
            })
        } else {
            // call query
            connection.query("SELECT * FROM `subadmin` WHERE `subadminemail`='" + subadminEmail + "'", async (err, result) => {
                if (err) {
                    // res.redirect('./subadminLogin')
                    res.render('./subadmin/login', {
                        'title': 'Sub-Admin Login | PKSuccessTrading',
                        'navRight': subadminBeforeSign,
                        'err': 'Make sure you type correct email or password!'
                    })
                }
                // if account is found
                if (result.length > 0) {
                    const comparison = await bcrypt.compare(subadminPassword, result[0].subadminpassword)
                    // check for password correct or not
                    if (comparison) {
                        // set login state true, so data in account is accessable
                        req.session.subadminLoggedIn = true
                        req.session.subadminId = result[0].subadminid
                        req.session.subadminName = result[0].subadminname
                        req.session.subadminEmail = result[0].subadminemail
                        res.redirect('./subadmin')
                    } else {
                        // res.redirect('./subadminLogin')
                        res.render('./subadmin/login', {
                            'title': 'Sub-Admin Login | PKSuccessTrading',
                            'navRight': subadminBeforeSign,
                            'err': 'Make sure you type correct email or password!'
                        })
                    }
                } else {
                    // res.redirect('./subadminLogin')
                    res.render('./subadmin/login', {
                        'title': 'Sub-Admin Login | PKSuccessTrading',
                        'navRight': subadminBeforeSign,
                        'err': 'Make sure you type correct email or password!'
                    })
                }
            })
        }
    } else {
        res.send('Failed!')
    }
})

app.post('/depositPost', (req, res) => {
    if (req.method === 'POST') {
        const depositAmount = req.body.depositAmount
        const depositTransaction = req.body.depositTransaction
        const depositDay = new Date().getDate()
        const planId = req.body.depositPlan
        const clientId = req.session.clientId
        const depositStatus = 'Pending'
        if ((depositAmount.length <= 0) || (depositTransaction.length <= 0) || (planId.length <= 0)) {
            res.redirect('./depositsuccess')
        } else {
            connection.query("INSERT INTO `deposit`(`depositamount`, `deposittransaction`, `depositday`, `planid`, `clientid`, `depositstatus`) VALUES ('" + depositAmount + "', '" + depositTransaction + "', '" + depositDay + "', '" + planId + "', '" + clientId + "', '" + depositStatus + "')", (err, result) => {
                if (err) {
                    res.redirect('./deposit')
                } else {
                    res.redirect('./depositsuccess')
                }
            })
        }
    } else {
        res.send('Failed!')
    }
})

app.post('/withdrawPost', (req, res) => {
    if (req.method === 'POST') {
        const withdrawBank = req.body.withdrawBank
        const withdrawAmount = req.body.withdrawAmount
        const accountTitle = req.body.accountTitle
        const accountNumber = req.body.accountNumber
        const clientId = req.session.clientId
        const withdrawStatus = 'Pending'
        if ((withdrawAmount.length <= 0) || (accountTitle.length <= 0) || (accountNumber.length < 9)) {
            res.redirect('./withdraw')
        } else {
            connection.query("INSERT INTO `withdraw`(`withdrawbank`, `withdrawamount`, `withdrawtitle`, `withdrawaccount`, `clientid`, `withdrawstatus`) VALUES ('" + withdrawBank + "', '" + withdrawAmount + "', '" + accountTitle + "', '" + accountNumber + "', '" + clientId + "', '" + withdrawStatus + "')", (err, result) => {
                if (err) {
                    res.redirect('./withdraw')
                } else {
                    res.redirect('./withdrawsuccess')
                }
            })
        }
    } else {
        res.send('Failed!')
    }
})

app.post('/feedbackPost', (req, res) => {
    if (req.method === 'POST') {
        const feedbackTitle = req.body.feedbackTitle
        const clientId = req.session.clientId
        if ((feedbackTitle.length <= 0)) {
            res.redirect('./dashboard')
        } else {
            connection.query("INSERT INTO `feedback`(`feedbacktitle`, `clientid`) VALUES ('" + feedbackTitle + "', '" + clientId + "')", (err, result) => {
                if (err) {
                    res.redirect('./dashboard')
                } else {
                    res.redirect('./#feedbacks')
                }
            })
        }
    } else {
        res.send('Failed!')
    }
})

app.post('/referralPost', (req, res) => {
    if (req.method === 'POST') {
        const referralName = req.body.referralName
        const clientId = req.session.clientId
        const referralStatus = 'Pending'
        if ((referralName.length <= 0)) {
            res.redirect('./dashboard')
        } else {
            connection.query("INSERT INTO `referral`(`referralamount`, `clientid`, `referralname`, `referralstatus`) VALUES (0, '" + clientId + "', '" + referralName + "', '" + referralStatus + "')", (err, result) => {
                if (err) {
                    res.redirect('./referral')
                } else {
                    res.redirect('./referralsuccess')
                }
            })
        }
    } else {
        res.send('Failed!')
    }
})

// input process of sign up page
app.post('/signupPost', async (req, res) => {
    // storing input states
    if (req.method === 'POST') {
        const clientName = req.body.clientName
        const clientEmail = req.body.clientEmail
        const clientPhone = req.body.clientPhone
        const clientPassword = req.body.clientPassword
        const clientCPassword = req.body.clientCPassword
        const clientGender = req.body.clientGender
        const activeDate = new Date()
        // check if any input is empty
        if ((clientName.length <= 0) || (clientEmail.length <= 0) || (clientPhone.length <= 9) || (clientPassword.length <= 7) || (clientCPassword.length <= 7) || (clientGender.length <= 0)) {
            // res.redirect('./signup')
            res.render('./client/signup', {
                'title': 'Sign Up | PKSuccessTrading',
                'navRight': beforeSign,
                'err': 'Make sure you type valid inputs according to given requirements!'
            })
        } else {
            // check if password is not same as confirm password
            if (clientPassword !== clientCPassword) {
                // res.redirect('./signup')
                res.render('./client/signup', {
                    'title': 'Sign Up | PKSuccessTrading',
                    'navRight': beforeSign,
                    'err': 'Make sure you type valid inputs according to given requirements!'
                })
            } else {
                const encryptedPassword = await bcrypt.hash(clientPassword, saltRounds);
                // call query
                connection.query("INSERT INTO `client`(`clientname`, `clientemail`, `clientphone`, `clientpassword`, `clientgender`, `activedate`) VALUES ('" + clientName + "', '" + clientEmail + "', '" + clientPhone + "', '" + encryptedPassword + "', '" + clientGender + "', '" + activeDate + "')", (err, result) => {
                    if (err) {
                        // res.redirect('./signup')
                        res.render('./client/signup', {
                            'title': 'Sign Up | PKSuccessTrading',
                            'navRight': beforeSign,
                            'err': 'Make sure you type valid inputs according to given requirements!'
                        })
                    } else {
                        res.redirect('./login')
                    }
                })
            }
        }
    } else {
        res.send('Failed!')
    }
})

// input process of login page
app.post('/loginPost', (req, res) => {
    // set login state false by default
    req.session.isLoggedIn = false
    // storing input states
    if (req.method === 'POST') {
        const clientEmail = req.body.clientEmail
        const clientPassword = req.body.clientPassword
        // check if any input is empty
        if ((clientEmail.length <= 0) || (clientPassword.length <= 7)) {
            // res.redirect('./login')
            res.render('./client/login', {
                'title': 'Login | PKSuccessTrading',
                'navRight': beforeSign,
                'err': 'Make sure you type correct email or password!'
            })
        } else {
            // call query
            connection.query("SELECT * FROM `client` WHERE `clientemail`='" + clientEmail + "'", async (err, result) => {
                if (err) {
                    // res.redirect('./login')
                    res.render('./client/login', {
                        'title': 'Login | PKSuccessTrading',
                        'navRight': beforeSign,
                        'err': 'Make sure you type correct email or password!'
                    })
                }
                // if account is found
                if (result.length > 0) {
                    const comparison = await bcrypt.compare(clientPassword, result[0].clientpassword)
                    // check for password correct or not
                    if (comparison) {
                        // set login state true, so data in account is accessable
                        req.session.isLoggedIn = true
                        req.session.clientId = result[0].clientid
                        req.session.clientName = result[0].clientname
                        req.session.clientEmail = result[0].clientemail
                        req.session.clientPhone = result[0].clientphone
                        req.session.activeDate = result[0].activedate
                        res.redirect('./dashboard')
                    } else {
                        // res.redirect('./login')
                        res.render('./client/login', {
                            'title': 'Login | PKSuccessTrading',
                            'navRight': beforeSign,
                            'err': 'Make sure you type correct email or password!'
                        })
                    }
                } else {
                    // res.redirect('./login')
                    res.render('./client/login', {
                        'title': 'Login | PKSuccessTrading',
                        'navRight': beforeSign,
                        'err': 'Make sure you type correct email or password!'
                    })
                }
            })
        }
    } else {
        res.send('Failed!')
    }
})






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EXPRESS RUNNING PORT SERVER 3000
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// runs after compilation
app.listen(port, () => {
    console.log(`${appName} listening on port http://localhost:${port}`)
})