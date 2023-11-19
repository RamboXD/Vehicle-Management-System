package controllers

import (
	"net/http"

	"github.com/RamboXD/SRS/dto/request"
	"github.com/RamboXD/SRS/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type TaskController struct {
	DB *gorm.DB
}

func NewTaskController(DB *gorm.DB) TaskController {
	return TaskController{DB}
}

func (tc *TaskController) CreateTask(ctx *gin.Context) {
	var task *models.Task

	if err := ctx.ShouldBindJSON(&task); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	result := tc.DB.Create(&task)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": task})

}

func (tc *TaskController) AssignToMe(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)

	var req request.AssignToMeRequest
    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
        return
    }

    // Retrieve the task to be assigned
    var task models.Task
    if result := tc.DB.First(&task, "task_id = ?", req.TaskID); result.Error != nil {
        ctx.JSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Task not found"})
        return
    }

    // Check if the task is already assigned to another driver
    if task.AssignedDriverID != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "Task is already assigned to a driver"})
        return
    }

    // Retrieve the driver
    var driver models.Driver
    if result := tc.DB.First(&driver, "driver_id = ?", currentUser.DriverID); result.Error != nil {
        ctx.JSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Driver not found"})
        return
    }

    // Assign the driver to the task
    task.AssignedDriverID = currentUser.DriverID
    task.Status = "in_progress"

    // Save the updated task record
    if result := tc.DB.Save(&task); result.Error != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Task assigned to driver successfully"})

}

func (tc *TaskController) FinishTask(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)

	var req request.FinishTask
	if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
        return
    }

	// Retrieve the task to be finished
	var task models.Task
	if result := tc.DB.First(&task, "task_id = ?", req.TaskID); result.Error != nil {
        ctx.JSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Task not found"})
        return
    }

	// Retrieve the driver
	var driver models.Driver
    if result := tc.DB.First(&driver, "driver_id = ?", currentUser.DriverID); result.Error != nil {
        ctx.JSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Driver not found"})
        return
    }

	// Check if the task is assigned to any driver
	if task.AssignedDriverID == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "Task not assigned"})
		return 
	}
	
	// Check if the task is assigned to current driver
	if *task.AssignedDriverID != driver.DriverID {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "This is not your task"})
		return 
	}

	// Check if the task is already finished 
	if task.Status == "finished" {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "You already finished the task"})
		return
	}

	task.Status = "finished"

	// Save the updated task record
    if result := tc.DB.Save(&task); result.Error != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
        return
    }

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Task finished by driver successfully"})
}

func (tc *TaskController) GetTasks(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)

	// Retrieve the driver
	var driver models.Driver
	if result := tc.DB.Preload("Tasks").First(&driver, "driver_id = ?", currentUser.DriverID); result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Driver not found"})
        return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "tasks": driver.Tasks})
}