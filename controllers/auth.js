const { response } = require('express');

const createUser = (req, res = response)=>{
    res.json({
        ok:true,
        msg:"new"
    })}

const loginUser = (req, res)=>{
    res.json({
        ok:true,
        msg:"login"
    })
}

const renewToken = (req, res)=>{
    res.json({
        ok:true,
        msg:"renew"
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}