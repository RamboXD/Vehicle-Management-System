package routes

import (
	"github.com/RamboXD/SRS/controllers"
	"github.com/RamboXD/SRS/middleware"
	"github.com/gin-gonic/gin"
)

type VehicleRouteController struct {
	vehicleController controllers.VehicleController
}

func NewRouteVehicleController(vehicleController controllers.VehicleController) VehicleRouteController {
	return VehicleRouteController{vehicleController}
}

func (vc *VehicleRouteController) VehicleRoute(rg *gin.RouterGroup) {
	router := rg.Group("/vehicle")
	router.POST("/add", middleware.DeserializeAdmin(), vc.vehicleController.Add)
}

