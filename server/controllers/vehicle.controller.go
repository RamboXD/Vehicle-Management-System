package controllers

import (
	"net/http"

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

