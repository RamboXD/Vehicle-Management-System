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

/*
Change maintenance person profile
=====================================================================================================================
*/

func (mc *MaintenancePersonController) UpdateProfileInfo(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)

	var maintenancePerson models.MaintenancePerson
	if result := mc.DB.Preload("User").Find(&maintenancePerson, "maintenance_person_id = ?", currentUser.MaintenancePersonID); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	var payload models.MaintenancePerson
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}

	if result := mc.DB.Model(&maintenancePerson).Updates(payload); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "maintenance_person": maintenancePerson})
}

/*
Get Maintenance Person Info with id
=====================================================================================================================
*/

func (mc *MaintenancePersonController) GetProfileInfo(ctx *gin.Context) {
	maintenancePersonID := ctx.Param("maintenancePersonID")

	var maintenancePerson models.MaintenancePerson
	if result := mc.DB.Preload("User").Find(&maintenancePerson, "maintenance_person_id = ?", maintenancePersonID); result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Maintenance Person not found"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "maintenance_person": maintenancePerson})
}
