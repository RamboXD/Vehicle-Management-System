package controllers

import (
	"net/http"
	"strings"
	"time"

	"github.com/RamboXD/SRS/dto/request"
	"github.com/RamboXD/SRS/dto/response"
	"github.com/RamboXD/SRS/initializers"
	"github.com/RamboXD/SRS/models"
	"github.com/RamboXD/SRS/utils"
	"github.com/gin-gonic/gin"

	"gorm.io/gorm"
)

type AuthController struct {
	DB *gorm.DB
}

func NewAuthController(DB *gorm.DB) AuthController {
	return AuthController{DB}
}

/*
Admin registration
=====================================================================================================================
*/

func (ac *AuthController) SignUpAdmin(ctx *gin.Context) {
	var payload request.AdminSignUpInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	if payload.User == nil || payload.Admin == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "User and Driver information are required"})
		return
	}

	hashedPassword, err := utils.HashPassword(payload.User.Password)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}

	now := time.Now()
	newUser := payload.User
	newUser.Email = strings.ToLower(newUser.Email)
	newUser.Password = hashedPassword
	newUser.CreatedAt = now
	newUser.UpdatedAt = now

	result := ac.DB.Create(&newUser)
	if result.Error != nil {
		handleUserCreationError(ctx, result.Error)
		return
	}

	newAdmin := payload.Admin
	newAdmin.UserID = newUser.ID

	adminResult := ac.DB.Create(&newAdmin)
	if adminResult.Error != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Failed to create admin profile"})
		return
	}
	newUser.AdminID = &newAdmin.AdminID
	ac.DB.Save(&newUser)

	userResponse := response.NewUserResponse(*newUser, nil, nil, nil, newAdmin)
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": gin.H{"user": userResponse}})
}

/*
Driver registration
=====================================================================================================================
*/

func (ac *AuthController) SignUpDriver(ctx *gin.Context) {
	var payload request.DriverSignUpInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	if payload.User == nil || payload.Driver == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "User and Driver information are required"})
		return
	}

	hashedPassword, err := utils.HashPassword(payload.User.Password)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}

	now := time.Now()
	newUser := payload.User
	newUser.Email = strings.ToLower(newUser.Email)
	newUser.Password = hashedPassword
	newUser.CreatedAt = now
	newUser.UpdatedAt = now

	result := ac.DB.Create(&newUser)
	if result.Error != nil {
		handleUserCreationError(ctx, result.Error)
		return
	}

	newDriver := payload.Driver
	newDriver.UserID = newUser.ID
	newDriver.HasVehicle = false
	// log.Printf("New Driver: %+v\n", newDriver)
	driverResult := ac.DB.Create(&newDriver)
	if driverResult.Error != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Failed to create driver profile"})
		return
	}

	newUser.DriverID = &newDriver.DriverID
	ac.DB.Save(&newUser)

	userResponse := response.NewUserResponse(*newUser, newDriver, nil, nil, nil)
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": gin.H{"user": userResponse}})

}

/*
RemontMaster registration
=====================================================================================================================
*/

func (ac *AuthController) SignUpMaintenancePerson(ctx *gin.Context) {
	var payload request.MaintenancePersonSignUpInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}
	if payload.User == nil || payload.MaintenancePerson == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "User and Maintenance Person information are required"})
		return
	}
	hashedPassword, err := utils.HashPassword(payload.User.Password)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}

	now := time.Now()
	newUser := payload.User
	newUser.Email = strings.ToLower(newUser.Email)
	newUser.Password = hashedPassword
	newUser.CreatedAt = now
	newUser.UpdatedAt = now

	result := ac.DB.Create(&newUser)
	if result.Error != nil {
		handleUserCreationError(ctx, result.Error)
		return
	}

	newMaintenancePerson := payload.MaintenancePerson
	newMaintenancePerson.UserID = newUser.ID

	maintenanceResult := ac.DB.Create(&newMaintenancePerson)
	if maintenanceResult.Error != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Failed to create maintenance person profile"})
		return
	}
	newUser.MaintenancePersonID = &newMaintenancePerson.MaintenancePersonID
	ac.DB.Save(&newUser)

	userResponse := response.NewUserResponse(*newUser, nil, newMaintenancePerson, nil, nil)
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": gin.H{"user": userResponse}})
}

/*
Benzinshik registration
=====================================================================================================================
*/

func (ac *AuthController) SignUpFuelingPerson(ctx *gin.Context) {
	var payload request.FuelingPersonSignUpInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}
	if payload.User == nil || payload.FuelingPerson == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "User and Driver information are required"})
		return
	}
	hashedPassword, err := utils.HashPassword(payload.User.Password)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}

	now := time.Now()
	newUser := payload.User
	newUser.Email = strings.ToLower(newUser.Email)
	newUser.Password = hashedPassword
	newUser.CreatedAt = now
	newUser.UpdatedAt = now

	result := ac.DB.Create(&newUser)
	if result.Error != nil {
		handleUserCreationError(ctx, result.Error)
		return
	}

	newFuelingPerson := payload.FuelingPerson
	newFuelingPerson.UserID = newUser.ID

	fuelingResult := ac.DB.Create(&newFuelingPerson)

	if fuelingResult.Error != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Failed to create fueling person profile"})
		return
	}
	newUser.FuelingPersonID = &newFuelingPerson.FuelingPersonID
	ac.DB.Save(&newUser)

	userResponse := response.NewUserResponse(*newUser, nil, nil, newFuelingPerson, nil)
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": gin.H{"user": userResponse}})
}

/*
Defaul Login HUMANITY
=====================================================================================================================
*/

func (ac *AuthController) SignInUser(ctx *gin.Context) {
	var payload *request.SignInInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var user models.User
	result := ac.DB.First(&user, "email = ?", strings.ToLower(payload.Email))
	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "Invalid email or Password"})
		return
	}

	if err := utils.VerifyPassword(user.Password, payload.Password); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "Invalid email or Password"})
		return
	}

	config, _ := initializers.LoadConfig(".")

	access_token, err := utils.CreateToken(config.AccessTokenExpiresIn, user.ID, config.AccessTokenPrivateKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	if user.AdminID != nil {
		ctx.JSON(http.StatusOK, gin.H{"status": "success", "access_token": access_token})
	} else {
		var role string
		if user.DriverID != nil {
			role = "driver"
		} else if user.MaintenancePersonID != nil {
			role = "maintenance_person"
		} else if user.FuelingPersonID != nil {
			role = "fueling_person"
		}
		ctx.JSON(http.StatusOK, gin.H{"status": "success", "access_token": access_token, "role": role})
	}
}

func handleUserCreationError(ctx *gin.Context, err error) {
	if strings.Contains(err.Error(), "duplicate key value violates unique constraint") {
		ctx.JSON(http.StatusConflict, gin.H{"status": "fail", "message": "User with that email already exists"})
	} else {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Something bad happened"})
	}
}
