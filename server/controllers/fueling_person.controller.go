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

/*
Change fueling person profile
=====================================================================================================================
*/

func (fc *FuelingPersonController) UpdateProfileInfo(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)

	var fuelingPerson models.FuelingPerson
	if result := fc.DB.Preload("User").Find(&fuelingPerson, "fueling_person_id = ?", currentUser.FuelingPersonID); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	var payload models.FuelingPerson
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}

	if result := fc.DB.Model(&fuelingPerson).Updates(payload); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "fueling_person": fuelingPerson})
}

/*
Get Fueling Person Info with id
=====================================================================================================================
*/

func (fc *FuelingPersonController) GetProfileInfo(ctx *gin.Context) {
	fuelingPersonID := ctx.Param("fuelingPersonID")

	var fuelingPerson models.FuelingPerson
	if result := fc.DB.Preload("FuelingDetails").Preload("User").Find(&fuelingPerson, "fueling_person_id = ?", fuelingPersonID); result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Fueling person not found"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "fueling_person": fuelingPerson})
}
