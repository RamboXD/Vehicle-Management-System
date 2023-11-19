package models

import (
	"time"

	"github.com/google/uuid"
)


type FuelingDetail struct {
    FuelingDetailID     uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
    VehicleID           uuid.UUID `gorm:"type:uuid;not null"`
    FuelingPersonID     uuid.UUID `gorm:"type:uuid;not null"`
    FuelingDate         time.Time
    FuelQuantity        float64   `gorm:"type:decimal(10,2)"`
    FuelCost            float64   `gorm:"type:decimal(10,2)"`
    GasStationName      string    `gorm:"type:varchar(255)"`
    FuelType            string    `gorm:"type:varchar(100)"`
    FuelingReceiptImage string    `gorm:"type:text"`
}



