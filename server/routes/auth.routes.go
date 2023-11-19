package routes

import (
	"github.com/RamboXD/SRS/controllers"
	"github.com/RamboXD/SRS/middleware"
	"github.com/gin-gonic/gin"
)

type AuthRouteController struct {
	authController controllers.AuthController
}

func NewAuthRouteController(authController controllers.AuthController) AuthRouteController {
	return AuthRouteController{authController}
}

func (rc *AuthRouteController) AuthRoute(rg *gin.RouterGroup) {
    authRouter := rg.Group("/auth")

    authRouter.POST("/login", rc.authController.SignInUser)
    // authRouter.GET("/logout", middleware.DeserializeUser(), rc.authController.LogoutUser)

    registerRouter := authRouter.Group("/register")
    registerRouter.POST("/admin", rc.authController.SignUpAdmin) 
    registerRouter.POST("/driver", middleware.DeserializeAdmin(), rc.authController.SignUpDriver) 
    registerRouter.POST("/maintenance", middleware.DeserializeAdmin(), rc.authController.SignUpMaintenancePerson) 
    registerRouter.POST("/fueling", middleware.DeserializeAdmin(), rc.authController.SignUpFuelingPerson) 
}

