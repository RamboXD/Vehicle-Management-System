package models

import (
	"time"

	"github.com/google/uuid"
)


type Vehicle struct {
    VehicleID    uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
    Model        string
    Year         int
    LicensePlate string `gorm:"unique"`
    SeatingCapacity int
    AssignedDriverID *uuid.UUID `gorm:"type:uuid;null;onDelete:cascade"`
    LastMaintenanceCheck time.Time `gorm:"type:date"`
    TotalDistanceCovered float64    `gorm:"type:decimal(10,2)"`
    FuelCapacity         float64    `gorm:"type:decimal(10,2)"`
    FuelConsumed         float64    `gorm:"type:decimal(10,2)"`
    Photo                string     `gorm:"type:text"`
    Status               string     `gorm:"type:varchar(100)"` 
    Driver                *Driver    `gorm:"foreignKey:AssignedDriverID"`
    FuelingDetails        []FuelingDetail `gorm:"foreignKey:VehicleID"`
}
