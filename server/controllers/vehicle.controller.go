package controllers

import (
	"net/http"

	"github.com/RamboXD/SRS/dto/request"
	"github.com/RamboXD/SRS/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type VehicleController struct {
	DB *gorm.DB
}

func NewVehicleController(DB *gorm.DB) VehicleController {
	return VehicleController{DB}
}

/*
Мәшине косу
=====================================================================================================================
*/

func (vc *VehicleController) Add(ctx *gin.Context) {
	var vehicle *models.Vehicle

	if err := ctx.ShouldBindJSON(&vehicle); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	result := vc.DB.Create(&vehicle)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": vehicle})

}

/*
Шәфөрге мәшінә беру
=====================================================================================================================
*/

func (vc *VehicleController) AssignToDriver(ctx *gin.Context) {
	var req request.AssignRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	// Check if a driver already has a vehicle
	var existingVehicle models.Vehicle
	if result := vc.DB.Where("assigned_driver_id = ?", req.DriverID).First(&existingVehicle); result.Error == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "Driver already has a vehicle assigned"})
		return
	}

	// Retrieve the vehicle to be assigned
	var vehicle models.Vehicle
	if result := vc.DB.First(&vehicle, "vehicle_id = ?", req.VehicleID); result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Vehicle not found"})
		return
	}

	// Check if the vehicle is already assigned to another driver
	if vehicle.AssignedDriverID != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "Vehicle is already assigned to a driver"})
		return
	}

	// Retrieve the driver
	var driver models.Driver
	if result := vc.DB.First(&driver, "driver_id = ?", req.DriverID); result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Driver not found"})
		return
	}

	// Assign the driver to the vehicle
	vehicle.AssignedDriverID = &req.DriverID
	vehicle.Status = "Active"

	// Save the updated vehicle record
	if result := vc.DB.Save(&vehicle); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	// Change status of the driver
	driver.HasVehicle = true

	// Save the updated driver record
	if result := vc.DB.Save(&driver); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Vehicle assigned to driver successfully"})
}

/*
Шәфөрден мәшінә тартып алу
=====================================================================================================================
*/
func (vc *VehicleController) UnassignDriver(ctx *gin.Context) {

	var req request.UnassignRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var vehicle models.Vehicle
	if result := vc.DB.First(&vehicle, "vehicle_id = ?", req.VehicleID); result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Vehicle not found"})
		return
	}

	vehicle.AssignedDriverID = nil
	vehicle.Status = "Inactive"

	if result := vc.DB.Save(&vehicle); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Driver unassigned from vehicle successfully"})
}

/*
Get All Vehicles
=====================================================================================================================
*/

func (vc *VehicleController) GetAllVehicles(ctx *gin.Context) {

	var vehicles []models.Vehicle
	if result := vc.DB.Find(&vehicles); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "vehicles": vehicles})
}

/*
Delete the vehicle by id
=====================================================================================================================
*/

func (vc *VehicleController) DeleteVehicle(ctx *gin.Context) {
	vehicleID := ctx.Param("vehicleID")

	var vehicle models.Vehicle
	if result := vc.DB.First(&vehicle, "vehicle_id = ?", vehicleID); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	if result := vc.DB.Delete(vehicle); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success"})

}

/*
Update the vehicle by id
=====================================================================================================================
*/

func (vc *VehicleController) UpdateVehicle(ctx *gin.Context) {
	vehicleID := ctx.Param("vehicleID")

	var payload models.Vehicle
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var vehicle models.Vehicle
	if result := vc.DB.First(&vehicle, "vehicle_id = ?", vehicleID); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	if result := vc.DB.Model(&vehicle).Updates(payload); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "vehicle": vehicle})

}
