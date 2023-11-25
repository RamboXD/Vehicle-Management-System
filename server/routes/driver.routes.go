package routes

import (
	"github.com/RamboXD/SRS/controllers"
	"github.com/RamboXD/SRS/middleware"
	"github.com/gin-gonic/gin"
)

type DriverRouteController struct {
	DriverController controllers.DriverController
}

func NewRouteDriverController(driverController controllers.DriverController) DriverRouteController {
	return DriverRouteController{driverController}
}

func (dc *DriverRouteController) DriverRoute(rg *gin.RouterGroup) {
	router := rg.Group("/driver")
	router.GET("/drivers/", middleware.DeserializeAdmin(), dc.DriverController.GetAllDrivers)
	router.PUT("/update/", middleware.DeserializeDriver(), dc.DriverController.UpdateProfileInfo)
	router.GET("/drivers/no_vehicle", middleware.DeserializeAdmin(), dc.DriverController.GetAllDriversWitnNoVehicle)
	router.GET("/drivers/:driverID", middleware.DeserializeAdmin(), dc.DriverController.GetProfileInfo)
}
