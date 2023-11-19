package models

import (
	"github.com/google/uuid"
)


type FuelingPerson struct {
    FuelingPersonID   uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	UserID   uuid.UUID `gorm:"type:uuid;not null;onDelete:cascade"`
    Certification     string
    Name             string
    Surname          string
    MiddleName       string
    User              User `gorm:"foreignkey:UserID"`
    FuelingDetails    []FuelingDetail `gorm:"foreignKey:FuelingPersonID"`
}


