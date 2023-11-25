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

func (mc *MaintenancePersonRouteController) MaintenancePersonRoute(rg *gin.RouterGroup) {
	router := rg.Group("/maintenance_person")
	router.GET("/maintenance_persons/", middleware.DeserializeAdmin(), mc.MaintenancePersonController.GetAllMaintenancePersons)
	router.PUT("/update", middleware.DeserializeMaintenancePerson(), mc.MaintenancePersonController.UpdateProfileInfo)
	router.GET("/maintenance_persons/:maintenancePersonID", middleware.DeserializeAdmin(), mc.MaintenancePersonController.GetProfileInfo)
}
