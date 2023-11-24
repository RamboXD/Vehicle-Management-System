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
	router.POST("/assign", middleware.DeserializeDriver(), tc.TaskController.AssignToMe)
	router.POST("/finish", middleware.DeserializeDriver(), tc.TaskController.FinishTask)
	router.GET("/tasks/my", middleware.DeserializeDriver(), tc.TaskController.GetTasks)
	router.DELETE("/tasks/delete/:taskID", middleware.DeserializeAdmin(), tc.TaskController.DeleteTask)
	router.PUT("/tasks/update/:taskID", middleware.DeserializeAdmin(), tc.TaskController.UpdateTask)
	router.GET("/tasks", middleware.DeserializeAdminAndDriver(), tc.TaskController.GetAllTasks)
}
