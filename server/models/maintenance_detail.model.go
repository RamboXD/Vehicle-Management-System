package models

import (
	"time"

	"github.com/google/uuid"
)


type MaintenanceDetail struct {
    MaintenanceDetailID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
    VehicleID           uuid.UUID `gorm:"type:uuid;not null"`
    MaintenancePersonID uuid.UUID `gorm:"type:uuid;not null"`
    ServiceDate         time.Time
    ServiceType         string    `gorm:"type:varchar(255)"`
    Description         string    `gorm:"type:text"`
    Cost                float64   `gorm:"type:decimal(10,2)"`
    PartsReplaced       string    `gorm:"type:text"`
    ServiceReportImage  string    `gorm:"type:text"`
    OdometerReading     int       `gorm:"type:int"`
}



