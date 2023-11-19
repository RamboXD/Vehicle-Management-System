package routes

import (
	"github.com/RamboXD/SRS/controllers"
	"github.com/RamboXD/SRS/middleware"
	"github.com/gin-gonic/gin"
)

type TaskRouteController struct {
	TaskController controllers.TaskController
}

func NewRouteTaskController(taskController controllers.TaskController) TaskRouteController {
	return TaskRouteController{taskController}
}

func (tc *TaskRouteController) TaskRoute(rg *gin.RouterGroup) {
	router := rg.Group("/task")
	router.POST("/create", middleware.DeserializeAdmin(), tc.TaskController.CreateTask)
}

