package models

import (
	"github.com/google/uuid"
)


type Vehicle struct {
    VehicleID    uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
    Model        string
    Year         int
    LicensePlate string `gorm:"unique"`
    SeatingCapacity int
    AssignedDriverID uuid.UUID `gorm:"type:uuid"`
}
