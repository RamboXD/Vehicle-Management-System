package controllers

import (
	"net/http"

	"github.com/RamboXD/SRS/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type UserController struct {
	DB *gorm.DB
}

func NewUserController(DB *gorm.DB) UserController {
	return UserController{DB}
}

func (uc *UserController) GetMe(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)

	if currentUser.DriverID != nil {
		var driver models.Driver
		if result := uc.DB.Preload("User").Preload("Vehicle").Preload("Tasks").First(&driver, "driver_id = ?", currentUser.DriverID); result.Error != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "fail", "message": "User not found"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"status": "success", "driver": driver})
		return
	}

	if currentUser.FuelingPersonID != nil {
		var fuelingPerson models.FuelingPerson
		if result := uc.DB.Preload("User").Preload("FuelingDetails").First(&fuelingPerson, "fueling_person_id = ?", currentUser.FuelingPersonID); result.Error != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "fail", "message": "User not found"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"status": "success", "fueling_person": fuelingPerson})
		return
	}

	if currentUser.MaintenancePersonID != nil {
		var maintenancePerson models.MaintenancePerson
		if result := uc.DB.Preload("User").First(&maintenancePerson, "maintenance_person_id = ?", currentUser.MaintenancePersonID); result.Error != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "fail", "message": "User not found"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"status": "success", "maintenance_person": maintenancePerson})
		return
	}

	ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "This page is not allowed"})
}
