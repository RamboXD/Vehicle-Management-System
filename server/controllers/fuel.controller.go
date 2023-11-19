package controllers

import (
	"net/http"

	"github.com/RamboXD/SRS/dto/request"
	"github.com/RamboXD/SRS/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type FuelingController struct {
	DB *gorm.DB
}

func NewFuelingController(DB *gorm.DB) FuelingController {
	return FuelingController{DB}
}

func (fc *FuelingController) Fuel(ctx *gin.Context) {
    currentUser := ctx.MustGet("currentUser").(models.User)


    var req request.FuelRequest
    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
        return
    }

    newFuelingDetail := models.FuelingDetail{
        VehicleID: req.VehicleID,
        FuelingPersonID: *currentUser.FuelingPersonID, 
        FuelingDate: req.FuelingDate,
        FuelQuantity: req.FuelQuantity,
        FuelCost: req.FuelCost,
        GasStationName: req.GasStationName,
        FuelType: req.FuelType,
        FuelingReceiptImage: req.FuelingReceiptImage,
    }

    if result := fc.DB.Create(&newFuelingDetail); result.Error != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
        return
    }

    ctx.JSON(http.StatusCreated, gin.H{"status": "success", "message": "Fueling detail added successfully", "data": newFuelingDetail})
}
