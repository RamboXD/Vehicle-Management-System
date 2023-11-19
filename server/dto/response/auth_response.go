package response

import (
	"time"

	"github.com/RamboXD/SRS/models"
	"github.com/google/uuid"
)

type UserResponse struct {
    ID                    uuid.UUID             `json:"id"`
    Name                  string                `json:"name"`
    Email                 string                `json:"email"`
    Photo                 string                `json:"photo"`
    Provider              string                `json:"provider"`
    Verified              bool                  `json:"verified"`
    CreatedAt             time.Time             `json:"created_at"`
    UpdatedAt             time.Time             `json:"updated_at"`
    DriverDetails         *DriverDetails        `json:"driver,omitempty"`
    MaintenancePersonDetails *MaintenancePersonDetails `json:"maintenance_person,omitempty"`
    FuelingPersonDetails  *FuelingPersonDetails `json:"fueling_person,omitempty"`
    AdminDetails          *AdminDetails         `json:"admin,omitempty"`
}

type DriverDetails struct {
    DriverID         uuid.UUID `json:"driver_id"`
    Government       string    `json:"government_id"`
    Name             string    `json:"name"`
    Surname          string    `json:"surname"`
    MiddleName       string    `json:"middleName,omitempty"` // Omitempty for optional fields
    Address          string    `json:"address"`
    Phone            string    `json:"phone"`
    Email            string    `json:"email"`
    DrivingLicenseCode string  `json:"drivingLicenseCode"`
}

type MaintenancePersonDetails struct {
    MaintenancePersonID uuid.UUID `json:"maintenance_person_id"`
    Name             string    `json:"name"`
    Surname          string    `json:"surname"`
    MiddleName       string    `json:"middleName,omitempty"` 
    UserID              uuid.UUID `json:"user_id"`
    Qualifications      string    `json:"qualifications"`
    Experience          string    `json:"experience"`
}

type FuelingPersonDetails struct {
    FuelingPersonID uuid.UUID `json:"fueling_person_id"`
    Name             string    `json:"name"`
    Surname          string    `json:"surname"`
    MiddleName       string    `json:"middleName,omitempty"` 
    UserID          uuid.UUID `json:"user_id"`
    Certification   string    `json:"certification"`
}

type AdminDetails struct {
    AdminID uuid.UUID `json:"admin_id"`
    UserID  uuid.UUID `json:"user_id"`
}

func NewUserResponse(user models.User, driver *models.Driver, maintenancePerson *models.MaintenancePerson, fuelingPerson *models.FuelingPerson, admin *models.Admin) *UserResponse {
    userResp := &UserResponse{
        ID:        user.ID,
        Email:     user.Email,
        CreatedAt: user.CreatedAt,
        UpdatedAt: user.UpdatedAt,
    }

	if driver != nil {
        userResp.DriverDetails = &DriverDetails{
            DriverID:           driver.DriverID,
            Government:         driver.Government,
            Name:               driver.Name,
            Surname:            driver.Surname,
            MiddleName:         driver.MiddleName,
            Address:            driver.Address,
            Phone:              driver.Phone,
            Email:              driver.Email,
            DrivingLicenseCode: driver.DrivingLicenseCode,
        }
    }

    if maintenancePerson != nil {
        userResp.MaintenancePersonDetails = &MaintenancePersonDetails{
            MaintenancePersonID: maintenancePerson.MaintenancePersonID,
            UserID:              maintenancePerson.UserID,
            Qualifications:      maintenancePerson.Qualifications,
            Experience:          maintenancePerson.Experience,
        }
    }

    if fuelingPerson != nil {
        userResp.FuelingPersonDetails = &FuelingPersonDetails{
            FuelingPersonID: fuelingPerson.FuelingPersonID,
            UserID:          fuelingPerson.UserID,
            Certification:   fuelingPerson.Certification,
        }
    }

    if admin != nil {
        userResp.AdminDetails = &AdminDetails{
            AdminID: admin.AdminID,
            UserID:  admin.UserID,
        }
    }

    return userResp
}