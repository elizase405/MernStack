/*
normally, when using async we put in a try{}catch{}
but if you don't want to, we can use express async handler.
*/
const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
//contains mongoose methods that can be used to create/read/etc on database

// @desc     Get goals
// @route    GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res)=>{
    //get goals from mongoose database
    const goals = await Goal.find() //returns all objects

    res.status(200).json(goals)
    //res.status(200).json({message: 'get goal'})
})

// @desc     Set goals
// @route    POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text')
    }

    //set goal to mongoose database
    const goal = await Goal.create({text: req.body.text})
    res.status(200).json(goal)

    //res.status(200).json({message: "Set Goal"})
})

// @desc     Update goals
// @route    PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res)=>{
    //update goal in mongoose database
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
	throw new Error('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(updatedGoal)

    /*
    res.status(200)
        .json({
        message: `Update Goal ${req.params.id}`,
        body: req.body})*/
})

// @desc     Deleye goals
// @route    DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res)=>{
    //delete goal in mongoose database
    const goal = await Goal.findByIdAndDelete(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    res.status(200).json({message: `Goal removed for ${req.params.id}`})

    //res.status(200).json({message: `Delete Goal ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
