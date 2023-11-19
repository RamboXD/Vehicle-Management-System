package routes

import (
	"github.com/RamboXD/SRS/controllers"
	"github.com/RamboXD/SRS/middleware"
	"github.com/gin-gonic/gin"
)

type FuelingRouteController struct {
	FuelingController controllers.FuelingController
}

func NewRouteFuelingController(fuelingController controllers.FuelingController) FuelingRouteController {
	return FuelingRouteController{fuelingController}
}

func (tc *FuelingRouteController) FuelingRoute(rg *gin.RouterGroup) {
	router := rg.Group("/fuel")
	router.POST("/do", middleware.DeserializeFueling(), tc.FuelingController.Fuel)
}

