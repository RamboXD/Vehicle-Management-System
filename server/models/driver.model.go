package models

import (
	"github.com/google/uuid"
)

type Driver struct {
	DriverID           uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	UserID             uuid.UUID `gorm:"type:uuid;not null;onDelete:cascade"`
	Government         string
	Name               string
	Surname            string
	MiddleName         string
	Address            string
	Phone              string
	Email              string
	DrivingLicenseCode string
	Vehicle            *Vehicle `gorm:"foreignKey:AssignedDriverID;references:DriverID"`
	User               User     `gorm:"foreignkey:UserID"`
	Tasks              []*Task  `gorm:"foreignkey:AssignedDriverID;"`
}
