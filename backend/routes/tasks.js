const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// ✅ Create Task
router.post('/', authMiddleware, async (req, res) => {
    const { title, description, dueDate, priority, status, assignedTo } = req.body;

    try {
        const task = await Task.create({
            title,
            description,
            dueDate,
            priority,
            status: status || 'Pending',
            createdBy: req.userId,
            assignedTo: assignedTo || null
        });

        const populatedTask = await task.populate('assignedTo', 'name email');
        res.status(201).json(populatedTask);
    } catch (err) {
        console.error('Task creation error:', err);
        res.status(500).json({ message: 'Server error while creating task' });
    }
});

// ✅ Get All Tasks (created by or assigned to the user)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({
            $or: [
                { createdBy: req.userId },
                { assignedTo: req.userId }
            ]
        })
        .populate('createdBy', 'name email')
        .populate('assignedTo', 'name email');

        res.json(tasks);
    } catch (err) {
        console.error('Task fetch error:', err);
        res.status(500).json({ message: 'Server error while fetching tasks' });
    }
});

// ✅ Get Single Task by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('createdBy', 'name email')
            .populate('assignedTo', 'name email');

        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Only show if user is related to the task
        if (
            task.createdBy._id.toString() !== req.userId &&
            task.assignedTo?._id.toString() !== req.userId
        ) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(task);
    } catch (err) {
        console.error('Fetch single task error:', err);
        res.status(500).json({ message: 'Server error while fetching task' });
    }
});

// ✅ Update Task
router.put('/:id', authMiddleware, async (req, res) => {
    const updates = req.body;

    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Only allow creator to update
        if (task.createdBy.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to update this task' });
        }

        Object.assign(task, updates, { updatedAt: new Date() });

        await task.save();
        const populatedTask = await task
            .populate('createdBy', 'name email')
            .populate('assignedTo', 'name email');

        res.json(populatedTask);
    } catch (err) {
        console.error('Task update error:', err);
        res.status(500).json({ message: 'Server error while updating task' });
    }
});

// ✅ Delete Task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Only allow deletion if the logged-in user is the creator
        if (task.createdBy.toString() !== req.userId) {
            return res.status(403).json({ message: "You are not authorized to delete this task" });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
