package models

import (
	"time"

	"github.com/google/uuid"
)


type User struct {
    ID                  uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
    Email               string    `gorm:"uniqueIndex;not null"`
    Password            string    `gorm:"not null"`
    CreatedAt           time.Time
    UpdatedAt           time.Time
    DriverID            *uuid.UUID `gorm:"type:uuid;null"`
    MaintenancePersonID *uuid.UUID `gorm:"type:uuid;null"`
    FuelingPersonID     *uuid.UUID `gorm:"type:uuid;null"`
    AdminID             *uuid.UUID `gorm:"type:uuid;null"`
}
