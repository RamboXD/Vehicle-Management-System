package controllers

import (
	"net/http"

	"github.com/RamboXD/SRS/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type DriverController struct {
	DB *gorm.DB
}

func NewDriverController(DB *gorm.DB) DriverController {
	return DriverController{DB}
}

/*
Get All Drivers
=====================================================================================================================
*/

func (dc *DriverController) GetAllDrivers(ctx *gin.Context) {

	var drivers []models.Driver
	if result := dc.DB.Preload("User").Preload("Vehicle").Find(&drivers); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "drivers": drivers})
}

/*
Change driver profile
=====================================================================================================================
*/

func (dc *DriverController) UpdateProfileInfo(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)

	var driver models.Driver
	if result := dc.DB.Preload("User").Find(&driver, "driver_id = ?", currentUser.DriverID); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	var payload models.Driver
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}

	if result := dc.DB.Model(&driver).Updates(payload); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "driver": driver})
}

/*
Get All Drivers with no vehicle
=====================================================================================================================
*/

func (dc *DriverController) GetAllDriversWitnNoVehicle(ctx *gin.Context) {

	var drivers []models.Driver
	if result := dc.DB.Preload("Vehicle").Preload("Tasks").Preload("User").Find(&drivers, "has_vehicle = false"); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "drivers": drivers})
}

/*
Get Driver Info with id
=====================================================================================================================
*/

func (dc *DriverController) GetProfileInfo(ctx *gin.Context) {
	driverID := ctx.Param("driverID")

	var driver models.Driver
	if result := dc.DB.Preload("Vehicle").Preload("Tasks").Preload("User").Find(&driver, "driver_id = ?", driverID); result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Driver not found"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "driver": driver})
}
