package routes

import (
	"github.com/RamboXD/SRS/controllers"
	"github.com/RamboXD/SRS/middleware"
	"github.com/gin-gonic/gin"
)

type MaintenancePersonRouteController struct {
	MaintenancePersonController controllers.MaintenancePersonController
}

func NewRouteMaintenancePersonController(maintenancePersonController controllers.MaintenancePersonController) MaintenancePersonRouteController {
	return MaintenancePersonRouteController{maintenancePersonController}
}

func (dc *MaintenancePersonRouteController) MaintenancePersonRoute(rg *gin.RouterGroup) {
	router := rg.Group("/maintenance_person")
	router.GET("/maintenance_persons/", middleware.DeserializeAdmin(), dc.MaintenancePersonController.GetAllMaintenancePersons)
}
