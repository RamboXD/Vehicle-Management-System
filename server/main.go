package main

import (
	"log"
	"net/http"

	"github.com/RamboXD/SRS/controllers"
	"github.com/RamboXD/SRS/initializers"
	"github.com/RamboXD/SRS/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var (
	server              *gin.Engine
	AuthController      controllers.AuthController
	AuthRouteController routes.AuthRouteController

	UserController      controllers.UserController
	UserRouteController routes.UserRouteController

	VehicleController      controllers.VehicleController
	VehicleRouteController routes.VehicleRouteController

	TaskController controllers.TaskController
	TaskRouteController routes.TaskRouteController
)

func init() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("? Could not load environment variables", err)
	}

	initializers.ConnectDB(&config)

	AuthController = controllers.NewAuthController(initializers.DB)
	AuthRouteController = routes.NewAuthRouteController(AuthController)

	UserController = controllers.NewUserController(initializers.DB)
	UserRouteController = routes.NewRouteUserController(UserController)

	VehicleController = controllers.NewVehicleController(initializers.DB)
	VehicleRouteController = routes.NewRouteVehicleController(VehicleController)

	TaskController = controllers.NewTaskController(initializers.DB)
	TaskRouteController = routes.NewRouteTaskController(TaskController)

	server = gin.Default()
}

func main() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("? Could not load environment variables", err)
	}

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:8000", config.ClientOrigin}
	corsConfig.AllowCredentials = true

	server.Use(cors.New(corsConfig))

	router := server.Group("/api")
	router.GET("/healthchecker", func(ctx *gin.Context) {
		message := "Welcome to Golang with Gorm and Postgres"
		ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": message})
	})

	AuthRouteController.AuthRoute(router)
	UserRouteController.UserRoute(router)
	VehicleRouteController.VehicleRoute(router)
	TaskRouteController.TaskRoute(router)
	log.Fatal(server.Run(":" + config.ServerPort))
}

