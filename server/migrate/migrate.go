package main

import (
	"fmt"
	"log"

	"github.com/RamboXD/SRS/initializers"

	"github.com/RamboXD/SRS/models"
)

func init() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("? Could not load environment variables", err)
	}

	initializers.ConnectDB(&config)
}

func main() {
	initializers.DB.AutoMigrate(&models.User{})
	initializers.DB.AutoMigrate(&models.Admin{})
	initializers.DB.AutoMigrate(&models.Driver{})
	initializers.DB.AutoMigrate(&models.FuelingPerson{})
	initializers.DB.AutoMigrate(&models.MaintenancePerson{})
	initializers.DB.AutoMigrate(&models.Vehicle{})
	initializers.DB.AutoMigrate(&models.Task{})
	fmt.Println("? Migration complete")
}

