package controllers

import (
	"net/http"

	"github.com/RamboXD/SRS/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type MaintenancePersonController struct {
	DB *gorm.DB
}

func NewMaintenancePersonController(DB *gorm.DB) MaintenancePersonController {
	return MaintenancePersonController{DB}
}

/*
Get All MaintenancePersons
=====================================================================================================================
*/

func (mc *MaintenancePersonController) GetAllMaintenancePersons(ctx *gin.Context) {

	var maintenancePersons []models.MaintenancePerson
	if result := mc.DB.Preload("User").Find(&maintenancePersons); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "maintenancePersons": maintenancePersons})
}
