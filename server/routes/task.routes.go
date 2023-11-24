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

	taskRouter := router.Group("/tasks")
	taskRouter.POST("/assign/:taskID", middleware.DeserializeDriver(), tc.TaskController.AssignToMe)
	taskRouter.POST("/finish/:taskID", middleware.DeserializeDriver(), tc.TaskController.FinishTask)
	taskRouter.GET("/my", middleware.DeserializeDriver(), tc.TaskController.GetMyTasks)
	taskRouter.DELETE("/delete/:taskID", middleware.DeserializeAdmin(), tc.TaskController.DeleteTask)
	taskRouter.PUT("/update/:taskID", middleware.DeserializeAdmin(), tc.TaskController.UpdateTask)
	taskRouter.GET("/", middleware.DeserializeAdminAndDriver(), tc.TaskController.GetAllTasks)
}
