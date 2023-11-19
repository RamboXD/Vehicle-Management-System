package request

import "github.com/RamboXD/SRS/models"

type SignUpInput struct {
	Name            string `json:"name" binding:"required"`
	Email           string `json:"email" binding:"required"`
	Password        string `json:"password" binding:"required,min=8"`
	Photo           string `json:"photo" binding:"required"`
}

type SignInInput struct {
	Email    string `json:"email"  binding:"required"`
	Password string `json:"password"  binding:"required"`
}

type DriverSignUpInput struct {
    User   *models.User   `json:"user"`
    Driver *models.Driver `json:"driver"`
}

type AdminSignUpInput struct {
    User  *models.User  `json:"user"`
    Admin *models.Admin `json:"admin"`
}

type MaintenancePersonSignUpInput struct {
    User              *models.User             `json:"user"`
    MaintenancePerson *models.MaintenancePerson `json:"maintenance_person"`
}

type FuelingPersonSignUpInput struct {
    User          *models.User          `json:"user"`
    FuelingPerson *models.FuelingPerson `json:"fueling_person"`
}