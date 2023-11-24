package controllers

import (
	"net/http"

	"github.com/RamboXD/SRS/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type FuelingPersonController struct {
	DB *gorm.DB
}

func NewFuelingPersonController(DB *gorm.DB) FuelingPersonController {
	return FuelingPersonController{DB}
}

/*
Get All FuelingPersons
=====================================================================================================================
*/

func (fc *FuelingPersonController) GetAllFuelingPersons(ctx *gin.Context) {

	var fuelingPersons []models.FuelingPerson
	if result := fc.DB.Preload("User").Find(&fuelingPersons); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "fuelingPersons": fuelingPersons})
}
