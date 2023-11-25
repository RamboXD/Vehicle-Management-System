package routes

import (
	"github.com/RamboXD/SRS/controllers"
	"github.com/RamboXD/SRS/middleware"
	"github.com/gin-gonic/gin"
)

type FuelingPersonRouteController struct {
	FuelingPersonController controllers.FuelingPersonController
}

func NewRouteFuelingPersonController(fuelingPersonController controllers.FuelingPersonController) FuelingPersonRouteController {
	return FuelingPersonRouteController{fuelingPersonController}
}

func (fc *FuelingPersonRouteController) FuelingPersonRoute(rg *gin.RouterGroup) {
	router := rg.Group("/fueling_person")
	router.GET("/fueling_persons/", middleware.DeserializeAdmin(), fc.FuelingPersonController.GetAllFuelingPersons)
	router.PUT("/update", middleware.DeserializeFuelingPerson(), fc.FuelingPersonController.UpdateProfileInfo)
	router.GET("/fueling_persons/:fuelingPersonID", middleware.DeserializeAdmin(), fc.FuelingPersonController.GetProfileInfo)
}
